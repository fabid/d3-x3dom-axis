var tape = require("tape"),
    scale = require("d3-scale"),
    x3domAxis = require("../");

tape("x3domAxis('x', 'y', scale) has the expected defaults.", function(test) {
  var s = scale.scaleLinear(),
      a = x3domAxis.x3domAxis('x', 'y', s);
  test.equal(a.scale(), s);
  test.equal(a.tickFormat(), null);
  test.equal(a.tickSize(), 1);
  test.equal(a.tickPadding(), 1);
  test.end();
});

