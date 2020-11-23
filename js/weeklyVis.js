/* * * * * * * * * * * * * *
*    class WeeklyVis       *
* * * * * * * * * * * * * */


class WeeklyVis {

    constructor(parentElement, arianaWeekly, brendaWeekly, whamWeekly, michaelWeekly, mariahWeekly, combinedWeekly) {
        this.parentElement = parentElement;
        this.arianaWeekly = arianaWeekly;
        this.brendaWeekly = brendaWeekly;
        this.whamWeekly = whamWeekly;
        this.michaelWeekly = michaelWeekly;
        this.mariahWeekly = mariahWeekly;
        this.combinedWeekly = combinedWeekly;
        this.displayData = [];

        this.initVis()
    }
    initVis() {
        let vis = this;

        vis.weeklyParseDate = d3.timeParse("%Y-%m-%d");
        vis.formatWeek = d3.timeFormat("%b %d");

        var artists = ['Mariah Carey', 'Wham', 'Brenda Lee', 'Michael Bublé', 'Ariana Grande']

        vis.color = d3.scaleOrdinal()
            .domain(artists)
            .range(["#FF0000", '#0000ff', "#228B22", "#800080", "#ffc0cb"])

        vis.margin = {top: 50, right: 200, bottom: 200, left: 200};
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


        vis.focusMariah = vis.svg.append("g")
            .style("display", "none");

        vis.focusBrenda = vis.svg.append("g")
            .style("display", "none");

        vis.wrangleData();
    }
    wrangleData() {
        let vis = this;

        // iterate over all rows the csv (dataFill)
        vis.whamWeekly.forEach( row => {
            row.week = vis.weeklyParseDate(row.week);
        });
        vis.mariahWeekly.forEach( row => {
            row.week = vis.weeklyParseDate(row.week);
        });
        vis.brendaWeekly.forEach( row => {
            row.week = vis.weeklyParseDate(row.week);
        });
        vis.arianaWeekly.forEach( row => {
            row.week = vis.weeklyParseDate(row.week);
        });
        vis.michaelWeekly.forEach( row => {
            row.week = vis.weeklyParseDate(row.week);
        });

        vis.updateVis();
    }
    updateVis() {
        let vis = this;

            // Update domains
        vis.x.domain([
            d3.min(vis.brendaWeekly, function(d) { return d.week }),
            d3.max(vis.mariahWeekly, function(d) { return d.week })]);
        vis.y.domain([
            0,
            d3.max(vis.mariahWeekly, function(d) { return d.streams })]);

        // Define line function
        let line = d3.line()
            .curve(d3.curveLinear)
            .x(function(d) { return vis.x(d.week) })
            .y(function(d) { return vis.y(d.streams) });

        let mariahLine = vis.svg.selectAll(".mariahLine")
            .data(vis.mariahWeekly);
        mariahLine.exit().remove();
        mariahLine.enter()
            .append("path")
            .attr("class", "mariahLine")
            .merge(mariahLine)
            .transition()
            .duration(800)
            .attr('d', line(vis.mariahWeekly))
            .attr('fill', 'none');

        //Line  mouse over
        let mariahLineGroup = vis.svg.append("g")
            .attr("class", "mariahLineGroup");

        let whamLine = vis.svg.selectAll(".whamLine")
            .data(vis.whamWeekly);
        whamLine.exit().remove();
        whamLine.enter()
            .append("path")
            .attr("class", "whamLine")
            .merge(whamLine)
            .transition()
            .duration(800)
            .attr('d', line(vis.whamWeekly))
            .attr('fill', 'none');

        //Line  mouse over
        let whamLineGroup = vis.svg.append("g")
            .attr("class", "whamLineGroup");

        let brendaLine = vis.svg.selectAll(".brendaLine")
            .data(vis.brendaWeekly);
        brendaLine.exit().remove();
        brendaLine.enter()
            .append("path")
            .attr("class", "brendaLine")
            .merge(brendaLine)
            .transition()
            .duration(800)
            .attr('d', line(vis.brendaWeekly))
            .attr('fill', 'none');

        //Line  mouse over
        let brendaLineGroup = vis.svg.append("g")
            .attr("class", "brendaLineGroup");

        let arianaLine = vis.svg.selectAll(".arianaLine")
            .data(vis.arianaWeekly);
        arianaLine.exit().remove();
        arianaLine.enter()
            .append("path")
            .attr("class", "arianaLine")
            .merge(arianaLine)
            .transition()
            .duration(800)
            .attr('d', line(vis.arianaWeekly))
            .attr('fill', 'none');

        //Line  mouse over
        let arianaLineGroup = vis.svg.append("g")
            .attr("class", "arianaLineGroup");

        let michaelLine = vis.svg.selectAll(".michaelLine")
            .data(vis.michaelWeekly);
        michaelLine.exit().remove();
        michaelLine.enter()
            .append("path")
            .attr("class", "michaelLine")
            .merge(michaelLine)
            .transition()
            .duration(800)
            .attr('d', line(vis.michaelWeekly))
            .attr('fill', 'none');

        //Line  mouse over
        let michaelLineGroup = vis.svg.append("g")
            .attr("class", "michaelLineGroup");


        // Update the xy-axis
        vis.svg.select(".y-axis").call(vis.yAxis);
        vis.svg.select(".x-axis").call(vis.xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");
    }
}