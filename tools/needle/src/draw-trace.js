// Draws the x and y axes
// yMax is passed as a parameter to enable correct scaling of multiple graphs
function DrawAxes(g, metrics, yMax) {
    var x = d3.scaleLinear()
        .rangeRound([0, width]).domain(metrics.timeDomain);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]).domain([0, yMax]);

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
        .style("text-anchor", "end");
}

// yMax           - maximum domain value
// color          - color to draw the graphs
// displayAverage - flag, set to display average line
function MetricsChart(g, metrics, min, yMax, color, displayAverage) {
    var x = d3.scaleLinear()
        .rangeRound([0, width]).domain(metrics.timeDomain);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]).domain([0, yMax]);
        
    var line = d3.line()
        .x(function(d) { return x(d.ts); })
        .y(function(d) { return y(d.v); });

    var data = metrics.samples

    g.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", "1.5px")
        .attr("d", line(data));

    if (displayAverage) {
        g.append("line")
            .attr("stroke", "yellow")
            .attr("stroke-width", "1.5px")
            .attr("x1", 0)
            .attr("y1", y(metrics.getAverage()))
            .attr("x2", width)
            .attr("y2", y(metrics.getAverage()))
    }
}
