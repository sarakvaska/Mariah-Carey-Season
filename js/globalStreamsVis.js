/* * * * * * * * * * * * * *
*  class GlobalStreamsVis  *
* * * * * * * * * * * * * */


class GlobalStreamsVis {

    constructor(parentElement, mariahData, arianaData, brendaData, whamData, michaelData) {
        this.parentElement = parentElement;
        this.mariahData = mariahData;
        this.arianaData = arianaData;
        this.brendaData = brendaData;
        this.whamData = whamData;
        this.michaelData = michaelData;
        this.drawn = false;
        this.displayData = [];

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 50, right: 100, bottom: 50, left: 95};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() + vis.margin.top + vis.margin.bottom;

        console.log($("#" + vis.parentElement).height());

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom + 120)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.focus = vis.svg.append("g")
            .style("display", "none");

        let millionFormat = d3.format(".1s");

        // Scales
        vis.x = d3.scaleTime()
            .range([0, vis.width]);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0])
            .nice();

        // create Axis (drawn later)
        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .ticks(29);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y)
            .tickFormat(function(d) { return millionFormat(d); })

        vis.wrangleData();
    }
    wrangleData() {
        let vis = this;

        //vis.updateVis();

    }
    updateVis() {
        let vis = this;

        // Update domains
        vis.x.domain([
            d3.min(vis.mariahData, function(d) { return d.day }),
            d3.max(vis.mariahData, function(d) { return d.day })]);
        vis.y.domain([
            0,
            d3.max(vis.mariahData, function(d) { return d.streams })]);

        // Define line function
        let line = d3.line()
            .curve(d3.curveLinear)
            .x(function(d) { return vis.x(d.day) })
            .y(function(d) { return vis.y(d.streams) });

        vis.svg.append('vis.svg:path')
            .attr('d', line(vis.mariahData))
            .attr('stroke', '#82CFFD')
            .attr('stroke-width', 4)
            .attr('fill', 'none');

        vis.svg.append('vis.svg:path')
            .attr('d', line(vis.whamData))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 0.6)
            .attr('fill', 'none');

        vis.svg.append('vis.svg:path')
            .attr('d', line(vis.arianaData))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 0.6)
            .attr('fill', 'none');

        vis.svg.append('vis.svg:path')
            .attr('d', line(vis.brendaData))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 0.6)
            .attr('fill', 'none');

        vis.svg.append('vis.svg:path')
            .attr('d', line(vis.michaelData))
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 0.6)
            .attr('fill', 'none');

        //Line  mouse over
        let lineGroup = vis.svg.append("g")
            .attr("class", "hover-line");

        lineGroup.append("line")
            .attr("stroke", "white")
            .attr("stroke-width", 1.5)
            .attr("x1", 841)
            .attr("x2", 841)
            .attr("y1", vis.height)
            .attr("y2", 0);

        lineGroup.append("text")
            .attr("class", "dateLabel")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", ".35em")
            .attr("transform", "translate (820,310), rotate(-90)")
            .text("Christmas Eve");

        // code help from: https://www.d3-graph-gallery.com/graph/custom_legend.html

        var legend = vis.svg.append("g").attr("class","legend")
            .attr("transform","translate(0,15)");
        legend.append("circle").attr("cx",50).attr("cy",20).attr("r", 6).style("fill", "#82CFFD")
        legend.append("text").attr("x", 60).attr("y", 20).text("All I Want For Christmas is You").attr("id", "legendGlobalStreams")
            .style("font-size", "28px").style("fill", "#82CFFD").attr("alignment-baseline","middle")

        var footnote = vis.svg.append("g").attr("class","footnote")
            .attr("transform","translate(80,200)");
        footnote.append("text").attr("x", 0).attr("y", 20)
            .text("*Songs are Last Christmas, It's Beginning to Look a Lot Like Christmas, Santa Tell Me, Rockin' Around the Christmas Tree")
            .style("font-size", "9px").style("fill", "lightgray").attr("alignment-baseline","middle")

        // drawing line chart effect help from: http://bl.ocks.org/markmarkoh/8700606
        // Add 'curtain' rectangle to hide entire graph
        var curtain = vis.svg.append('rect')
            .attr('x', -1 * (vis.width+5))
            .attr('y', -1 * (vis.height+5))
            .attr('height', vis.height+10)
            .attr('width', vis.width+10)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', '#000')

        // shared transition
        var t = vis.svg.transition()
            .delay(500)
            .duration(4500)

        t.select('rect.curtain')
            .attr('width', 0);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .style("color", "white");

        vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(0,0)")
            .style("color", "white");

        // Update the xy-axis
        vis.svg.select(".y-axis").call(vis.yAxis).style("color", "white");

        vis.svg.select(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start")
            .style("color", "white");

        // append the x line
        vis.focus.append("line")
            .attr("class", "x")
            .style("stroke", "white")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", vis.height);

        // append the y line
        vis.focus.append("line")
            .attr("class", "y")
            .style("stroke", "white")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", vis.width)
            .attr("x2", vis.width);

        // append the circle at the intersection
        vis.focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "white")
            .attr("r", 5.5);

        // place the value at the intersection
        vis.focus.append("text")
            .attr("class", "y1")
            .style("stroke", "#82CFFD")
            .style("stroke-width", "4px")
            .style("opacity", 1)
            .attr("dx", 8)
            .attr("dy", "3em");
        vis.focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "3em");

        // place the date at the intersection
        vis.focus.append("text")
            .attr("class", "y3")
            .style("stroke", "#82CFFD")
            .style("stroke-width", "4px")
            .style("opacity", 1)
            .attr("dx", 8)
            .attr("dy", "2em");
        vis.focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "2em");

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
            let millionFormat = d3.format(".2s");

            var x0 = vis.x.invert(d3.pointer(event)[0]),
                i = bisectDate(vis.mariahData, x0, 1),
                d0 = vis.mariahData[i - 1],
                d1 = vis.mariahData[i],
                d = x0 - d0.day > d1.day - x0 ? d1 : d0;

            vis.focus.select("circle.y")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")");

            vis.focus.select("text.y1")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text('Streams: ' + millionFormat(d.streams))

            vis.focus.select("text.y2")
                .attr("transform",
                    "translate(" + vis.x(d.day) + "," +
                    vis.y(d.streams) + ")")
                .text('Streams: ' + millionFormat(d.streams));

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
        vis.drawn = true;
    }
}