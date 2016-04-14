var slice = Array.prototype.slice;

var identity = function(x) {
  return x;
};

var makeSolid =  function(selection, color) {
  selection.append("appearance").append("material").attr("diffuseColor", color || "black");
  return selection;
}

export function x3domAxis(dir, tickDir, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSize = 1,
      tickPadding = 1;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
        range = scale.range(),
        range0 = range[0],
        range1 = range[range.length - 1],
        selection = context.selection ? context.selection() : context;
    var dirVec, rotVec, tickDirVec, tickRotVec;
    function  getAxisDirectionVector(axisDir) {
      var result;
      switch (axisDir) {
      case "x": {
        result = [1, 0, 0];
        break;
      }
      case "y": {
        result = [0, 1, 0];
        break;
      }
      case "z": {
        result = [0, 0, 1];
        break;
      }
      }
      return  result;
    }
    function  getAxisRotationVector(axisDir) {
      var result;
      switch (axisDir) {
      case "x": {
        result = [1, 1, 0, Math.PI];
        break;
      }
      case "y": {
        result = [0, 0, 0, 0];
        break;
      }
      case "z": {
        result = [0, 1, 1, Math.PI];
        break;
      }
      }
      return result;
    }
    
    dirVec = getAxisDirectionVector(dir);
    tickDirVec = getAxisDirectionVector(tickDir);
    rotVec = getAxisRotationVector(dir);
    tickRotVec = getAxisRotationVector(tickDir);

    var path = selection.selectAll("transform").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter()
          .append("transform")
          .attr("translation", function(t) {
            return dirVec.map(function(a) {
              return scale(t) * a;
            }).join(" ");
          })
          .attr("class", "tick"),
        line = tick.select(".tickLine"),
        text = tick.select("billboard");

    path = path.merge(path.enter()
        .append("transform")
        .attr("rotation", rotVec.join(" "))
        .attr("translation", dirVec.map(function(d){return d * (range0 + range1)/2; }).join(" "))
        .append("shape")
        .call(makeSolid)
        .attr("class", "domain"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("transform"));
    var newText = tickEnter.append("transform");
    newText
      .attr("translation", tickDirVec.map(function(d) { return - d * tickPadding; }))
      .append("billboard")
      .attr("axisOfRotation", "0 0 0")
      .append("shape")
      .call(makeSolid)
      .append("text")
      .attr("string", format)
      .append("fontstyle")
      .attr("size", 1)
      .attr("family", "SANS")
      .attr("style", "BOLD")
      .attr("justify", "MIDDLE ");
    text = text.merge(newText);

    tickExit.remove();
    path
      .append("cylinder")
      .attr("radius", 0.1)
      .attr("height", range1 - range0 );
    line
      .attr("translation", tickDirVec.map(function(d){
          return d * tickSize / 2;
        }).join(" "))
      .attr("rotation", tickRotVec.join(" "))
      .attr("class", "tickLine")
      .append("shape")
      .call(makeSolid)
      .append("cylinder")
      .attr("radius", 0.05)
      .attr("height", tickSize);

  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = slice.call(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSize = +_, axis) : tickSize;
  };
  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  return axis;
}
