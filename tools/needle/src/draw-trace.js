

function MetricsChart(g, metrics) {

var x = d3.scaleLinear()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);


var line = d3.line()
    .x(function(d) { return x(d.ts); })
    .y(function(d) { return y(d.v); });

  var data = metrics.samples

  x.domain(metrics.timeDomain);
  y.domain(metrics.valueDomain());


  var tx = x(data[7].ts);

  var ty = y(data[8].v);

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
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
 
}
