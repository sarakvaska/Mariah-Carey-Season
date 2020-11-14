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
        vis.margin = {top: -105, right: 310, bottom: 0, left: 380};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

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
            .sum(function(d) { return d.weeks_on_chart; })
        console.log(vis.nodes)

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
            });

        vis.node.append("circle")
            .transition()
            .duration(2000)
            .attr("r", function(d) {
                return d.r - 1;
            })
            .style("fill", function(d,i) {
                if(d.r > 25) {
                    return "#226f61"
                }
                else {
                    i = Math.floor(Math.random() * 5)
                    return vis.circleColors[i];
                }
            })
            .style("opacity", 0.95)

        // //
        // vis.node.append("text")
        //     .attr("dy", ".2em")
        //     .style("text-anchor", "middle")
        //     .text(function(d) {
        //         return d.data.songid;
        //     })
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", function(d){
        //         return d.r/5;
        //     })
        //     .attr("fill", "white");
        //
        // vis.node.append("text")
        //     .attr("dy", "1.3em")
        //     .style("text-anchor", "middle")
        //     .text(function(d) {
        //         return d.data.weeks_on_chart;
        //     })
        //     .attr("font-family",  "Gill Sans", "Gill Sans MT")
        //     .attr("font-size", function(d){
        //         return d.r/5;
        //     })
        //     .attr("fill", "white");

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