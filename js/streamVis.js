/* * * * * * * * * * * * * *
*  class StreamVis        *
* * * * * * * * * * * * * */


class StreamVis {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis()
    }
    initVis() {
        let vis = this;

        // vis.margin = {top: 50, right: 50, bottom: 20, left: 50};
        vis.margin = {top: 90, right: 20, bottom: 300, left: 80};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // List of groups = header of the csv files
        vis.keys = vis.data.columns.slice(1)

        // Scales
        vis.x = d3.scaleTime()
            .domain(d3.extent(vis.data, function(d) { return d.week; }))
            .range([0, vis.width]);


        // Customization
        vis.svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

        // Add Y axis
        vis.y = d3.scaleLinear()
            .domain([0, 8069105])
            .range([vis.height, 0 ]);

        vis.wrangleData();
    }
    wrangleData() {
        let vis = this;

        vis.updateVis();
    }
    updateVis() {
        let vis = this;

        // color palette
        let color = d3.scaleOrdinal()
            .domain(vis.keys)
            .range(['#d9990b', '#82CFFD', '#fedfb0', '#f04554', "#01bf2b"]);

                //stack the data?
        let stackedData = d3.stack()
            .offset(d3.stackOffsetSilhouette)
            .keys(vis.keys)
            (vis.data)

        vis.svg.append("g")
            .attr("transform", "translate(0," + vis.height*2 + ")")
            .call(d3.axisBottom(vis.x).tickSize(-vis.height*.7).tickValues([alternateParseDate('2017-12-01'), alternateParseDate('2017-12-05'), alternateParseDate('2017-12-10'), alternateParseDate('2017-12-15'), alternateParseDate('2017-12-22')]))
            .style("color", "white")
            .select(".domain").remove();

        // create a tooltip
        vis.toolTip = vis.svg
            .append("text")
            .attr("id", "streamTooltip")
            .attr("x", 0)
            .attr("y", -20)
            .style("opacity", 0)
            .style("font-size", 17)

        // Three function that change the tooltip when user hover / move / leave a cell
        let mouseover = function(d) {
            vis.toolTip.style("opacity", 1)
            d3.selectAll(".myArea").style("opacity", .2)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        let mousemove = function(d,i) {
            let song = i.key;

            if (song == 'Last Christmas') {
                var name = 'Wham';
            } else if (song == 'Santa Tell Me') {
                var name = 'Ariana Grande';
            } else if (song == "It's Beginning to Look a Lot Like Christmas") {
                var name = 'Michael Bublé';
            } else if (song == "All I Want For Christmas is You") {
                var name = 'Mariah Carey';
            } else if (song == "Rockin' Around the Christmas Tree") {
                var name = 'Brenda Lee';
            }
            
            vis.toolTip.text(song + " by " + name)
        }

        let mouseleave = function(d) {
            vis.toolTip.style("opacity", 0)
            d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
        }

        // Area generator
      let area = d3.area()
        .x(function(d) { return vis.x(d.data.week); })
        .y0(function(d) { return vis.y(d[0]); })
        .y1(function(d) { return vis.y(d[1]); })

      // Show the areas
      vis.svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
          .attr("class", "myArea")
          .style("fill", function(d) { return color(d.key); })
          .attr("d", area)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
    }
}