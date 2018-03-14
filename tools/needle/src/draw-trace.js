

function MetricsChart(g, metrics, min, color) {

var x = d3.scaleLinear()
    .rangeRound([0, width]).domain(metrics.timeDomain);

var y = d3.scaleLinear()
    .rangeRound([height, 0]).domain(metrics.valueDomain(min));


var line = d3.line()
    .x(function(d) { return x(d.ts); })
    .y(function(d) { return y(d.v); });

  var data = metrics.samples

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text(metrics.name + " " + metrics.samples.length + " samples");

  g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", "1.5px")
      .attr("d", line(data));

  g.append("line")
      .attr("stroke", color)
      .attr("stroke-width", "1.5px")
      .attr("x1", 0)
      .attr("y1", y(metrics.getAverage()))
      .attr("x2", width)
      .attr("y2", y(metrics.getAverage()))
 
}
