# d3-x3dom-axis

[x3dom](http://www.x3dom.org/) version of [d3-axis](https://github.com/d3/d3-axis). Create 3d axes in x3dom along x, y and z directions.

## Installing

If you use NPM, `npm install d3-x3dom-axis`. Otherwise, download the [latest release](https://github.com/d3/d3-x3dom-axis/releases/latest).



## API Reference


Regardless of orientation, axes are always rendered so as to cover the domain of the scale on the axis of concern. To change the position of the axis with respect to the chart, put it the containing element in a [transform node](http://doc.x3dom.org/author/Grouping/Transform.html). 

<a name="axisTop" href="#axisTop">#</a> d3.<b>x3domAxis</b>(<i>direction</i>, <i>tickDirection</i>, <i>scale</i>)

Constructs a new axis generator for the given [scale](https://github.com/d3/d3-scale), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 1 and [padding](#axis_tickPadding) of 1. Tick labelsare drawn as user facing [billboard](http://doc.x3dom.org/author/Navigation/Billboard.html).

<a name="_axis" href="#_axis">#</a> <i>axis</i>(<i>context</i>)

Render the axis to the given *context*, which should be a [selection](https://github.com/d3/d3-selection) of an x3dom container node (either transform or group node).

<a name="axis_scale" href="#axis_scale">#</a> <i>axis</i>.<b>scale</b>([<i>scale</i>])

If *scale* is specified, sets the scale and returns the axis. If *scale* is not specified, returns the current scale.

<a name="axis_ticks" href="#axis_ticks">#</a> <i>axis</i>.<b>ticks</b>(<i>arguments…</i>)

A convenience function for setting the [tick arguments](#axis_tickArguments). For example, this:

```js
axis.ticks(10);
```

Is equivalent to:

```js
axis.tickArguments([10]);
```

<a name="axis_tickArguments" href="#axis_tickArguments">#</a> <i>axis</i>.<b>tickArguments</b>([<i>arguments</i>])

If *arguments* are specified, stores the specified arguments for subsequent use in generating ticks and returns the axis. The arguments will later be passed to [*scale*.ticks](https://github.com/d3/d3-scale#continuous_ticks) to generate tick values (unless tick values are specified explicitly via [*axis*.tickValues](#axis_tickValues)). These arguments are also passed to the scale’s [tickFormat method](https://github.com/d3/d3-scale#continuous_tickFormat) to generate a tick format (unless a tick format is specified explicitly via [*axis*.tickFormat](#axis_tickFormat)). If no arguments are specified, returns the current tick arguments, which defaults to the empty array.

Suitable arguments depends on the associated scale: for a [quantitative scale](https://github.com/d3/d3-scale#continuous-scales), you might specify a suggested tick count such as `[20]` or a tick count and a tick format specifier such as `[10, "$,.2f"]`; for a [time scale](https://github.com/d3/d3-scale#time-scales), a [time interval](https://github.com/d3/d3-time#intervals) such as `[d3.timeMinute, 15]` might be appropriate.

<a name="axis_tickValues" href="#axis_tickValues">#</a> <i>axis</i>.<b>tickValues</b>([<i>values</i>])

If a *values* array is specified, the specified values are used for ticks rather than using the scale’s automatic tick generator. If *values* is null, clears any previously-set explicit tick values and reverts back to the scale’s tick generator. If *values* is not specified, returns the current tick values, which defaults to null. For example, to generate ticks at specific values:

```js
var xAxis = d3.axisBottom(x)
    .tickValues([1, 2, 3, 5, 8, 13, 21]);
```

The explicit tick values take precedent over the tick arguments set by [*axis*.tickArguments](#axis_tickArguments). However, any tick arguments will still be passed to the scale’s [tickFormat](#axis_tickFormat) function if a tick format is not also set.

<a name="axis_tickFormat" href="#axis_tickFormat">#</a> <i>axis</i>.<b>tickFormat</b>([<i>format</i>])

If *format* is specified, sets the tick format function and returns the axis. If *format* is not specified, returns the current format function, which defaults to null. A null format indicates that the scale’s default formatter should be used, which is generated by calling [*scale*.tickFormat](https://github.com/d3/d3-scale#continuous_tickFormat). In this case, the arguments specified by [*axis*.tickArguments](#axis_tickArguments) are likewise passed to *scale*.tickFormat.

See [d3-format](https://github.com/d3/d3-format) and [d3-time-format](https://github.com/d3/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
axis.tickFormat(d3.format(",.0f"));
```

<a name="axis_tickSize" href="#axis_tickSize">#</a> <i>axis</i>.<b>tickSize</b>([<i>size</i>])

If *size* is specified, sets the [inner](#axis_tickSizeInner) and [outer](#axis_tickSizeOuter) tick size to the specified value and returns the axis. If *size* is not specified, returns the current inner tick size, which defaults to 6.

<a name="axis_tickPadding" href="#axis_tickPadding">#</a> <i>axis</i>.<b>tickPadding</b>([<i>padding</i>])

If *padding* is specified, sets the padding to the specified value in pixels and returns the axis. If *padding* is not specified, returns the current padding which defaults to 1 pixels. It corresponds to the distance at which the label is drawm from the axis in the opposite direction of the tickDirection.
