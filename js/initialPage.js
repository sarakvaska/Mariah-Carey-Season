class InitialPage {
    // constructor method to initialize initial visualization
    constructor(parentElement, christmasSongs) {
        this.parentElement = parentElement;
        this.christmasSongs = christmasSongs;
        this.displayData = [];
        this.circleColors = ['#B3000C','#E40010','#D8D8D8','#1FD537', '#00B32C'];

        this.initVis()
    }

    initVis() {
        let vis = this;
        vis.margin = {top: -28, right: 0, bottom: 0, left: 410};
        //vis.margin = {top: 10, right: 10, bottom: 10, left: 10};
        //vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.width = 960;
        //vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;
        vis.height = 600;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr("class", "bubble")
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.bubble = d3.pack(vis.christmasSongs)
            .size([vis.height,vis.height])
            .padding(1.5);

        vis.nodes = d3.hierarchy({children: vis.christmasSongs})
            .sum(function(d) { return d.weeks_on_chart; });

        //console.log(vis.nodes)

        vis.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "myTooltip")

        vis.node = vis.svg.selectAll(".node")
            .data(vis.bubble(vis.nodes).descendants())
            .enter()
            // .filter(function(d){
            //     return !d.children
            // })
            .append("g")
            .attr("class", "node")
            .attr("fill", "pink")
            .attr("transform", function(d) {
                return "translate(" + d.x+ "," + d.y+ ")";
            })

        vis.node.append("circle")
            .transition()
            .duration(2000)
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                if(d.r > 200) {
                    return "#226f61"
                }
                else {
                    i = Math.floor(Math.random() * 5)
                    return vis.circleColors[i];
                }
            })
            .style("opacity", function(d) {
                if (!d.children) {
                    return 0.90
                }
            })

        vis.node
            .on('mouseover', function(event, d){
                if (!d.children) {
                    d3.select(this)
                        .attr('stroke-width', '2px')
                        .attr('stroke', 'black')
                        .attr('fill', 'rgba(173,222,255,0.62)')

                    vis.tooltip
                        .style("opacity", 0.9)
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + "px")
                        .html(`<div style="border: thin solid grey; border-radius: 5px; background: white; padding: 5px;">
                         <h3>Song: <strong>"${d.data.song.toLowerCase()}"</strong><h3>
                         <h3>Performer: <strong>${d.data.performer}</strong><h3>
                         <h3>Weeks on Chart: <strong>${d.data.weeks_on_chart}</strong><h3>
                         <h3>Peak Position: <strong>${d.data.peak_position}</strong><h3>
                         <h3>Date on Chart: <strong>${d.data.weekid}</strong><h3></div>`);
                }
            })
            .on('mouseout', function(event, d){
                if (!d.children) {
                    d3.select(this)
                        .attr('stroke-width', '0px')

                    vis.tooltip
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0)
                        .html(``);
                }
            })

        //vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        //vis.displayData = vis.christmasSongs;

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // draw the circles to represent Christmas songs
    }
}