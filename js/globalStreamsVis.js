/* * * * * * * * * * * * * *
*  class GlobalStreamsVis  *
* * * * * * * * * * * * * */


class GlobalStreamsVis {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 200, bottom: 350, left: 200};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.focus = vis.svg.append("g")
            .style("display", "none");

        // Scales
        vis.x = d3.scaleTime()
            .range([0, vis.width]);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0])
            .nice();

        // create Axis (drawn later)
        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .ticks(29)

        vis.yAxis = d3.axisLeft()
            .scale(vis.y)

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(0,0)");

        vis.wrangleData();
    }
    wrangleData() {
        let vis = this;

        vis.updateVis();

    }
    updateVis() {
        let vis = this;

        // Update domains
        vis.x.domain([
            d3.min(vis.data, function(d) { return d.day }),
            d3.max(vis.data, function(d) { return d.day })]);
        vis.y.domain([
            0,
            d3.max(vis.data, function(d) { return d.streams })]);

        // Define line function
        let line = d3.line()
            .curve(d3.curveLinear)
            .x(function(d) { return vis.x(d.day) })
            .y(function(d) { return vis.y(d.streams) });

        console.log(vis.data);

        let lines = vis.svg.selectAll(".line")
            .data(vis.data);
        lines.exit().remove();
        lines.enter()
            .append("path")
            .attr("class", "line")
            .merge(lines)
            .transition()
            .duration(800)
            .attr('d', line(vis.data))
            .attr('fill', 'none');

        //Line  mouse over
        let lineGroup = vis.svg.append("g")
            .attr("class", "hover-line");

        lineGroup.append("line")
            .attr("stroke", "green")
            .attr("stroke-width", 1.5)
            .attr("x1", 830)
            .attr("x2", 830)
            .attr("y1", vis.height)
            .attr("y2", 0);

        lineGroup.append("text")
            .attr("class", "dateLabel")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", ".35em")
            .attr("transform", "translate (820,310), rotate(-90)")
            .text("Christmas Eve");

        // Update the xy-axis
        vis.svg.select(".y-axis").call(vis.yAxis)
        vis.svg.select(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        // append the x line
        vis.focus.append("line")
            .attr("class", "x")
            .style("stroke", "green")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", vis.height);

        // append the y line
        vis.focus.append("line")
            .attr("class", "y")
            .style("stroke", "green")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", vis.width)
            .attr("x2", vis.width);

        // append the circle at the intersection
        vis.focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "green")
            .attr("r", 4);

        // place the value at the intersection
        vis.focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        vis.focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        vis.focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        vis.focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");

        // append the rectangle to capture mouse
        vis.svg.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { vis.focus.style("display", null); })
            .on("mouseout", function() { vis.focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove(event) {
            let formatDate = d3.timeFormat("%b %d");

            var x0 = vis.x.invert(d3.pointer(event)[0]),
                i = bisectDate(vis.data, x0, 1),
                d0 = vis.data[i - 1],
                d1 = vis.data[i],
                d = x0 - d0.day > d1.day - x0 ? d1 : d0;

            vis.focus.select("circle.y")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")");

            vis.focus.select("text.y1")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text('Streams: ' + d.streams);

            vis.focus.select("text.y2")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text('Streams: ' + d.streams);

            vis.focus.select("text.y3")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text("Charts position: " + d.position);

            vis.focus.select("text.y4")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text("Charts position: " + d.position);

            vis.focus.select(".x")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .attr("y2", vis.height - vis.y(d.streams));

            vis.focus.select(".y")
                .attr("transform",
                    "translate(" + vis.width * -1 + "," +
                    vis.y(d.streams) + ")")
                .attr("x2", vis.width + vis.width);
        }
    }
}