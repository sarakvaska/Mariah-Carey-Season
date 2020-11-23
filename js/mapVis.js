class ChristmasMap {

    constructor(parentElement, geoData, christmasSongs, places) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.christmasSongs = christmasSongs
        this.places = places;
        this.displayData = [];

        this.colorScale = ['#fddbc7','#f4a582','#d6604d','#b2182b']

        this.initVis()
    }

    initVis() {
        let vis = this;
        vis.margin = {top: -70, right: 150, bottom: 70, left: 150};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // create a projection
        vis.projection = d3.geoOrthographic() // d3.geoStereographic()
            .translate([vis.width / 2, vis.height / 2])
            .scale(0.8 * vis.height / 2)

        // define a geo generator and pass your projection to it
        vis.path = d3.geoPath()
            .projection(vis.projection);

        // convert your TopoJSON data into GEOJSON data structure
        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')

        vis.svg.append("path")
            .datum({type: "Sphere"})
            .attr("class", "graticule")
            // .attr('fill', '#ADDEFF')
            .attr('fill', '#DC143C')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        var gradient = vis.svg.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);

        gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "#D4AF37")
            .attr("stop-opacity", 1);

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr('fill', 'url(#gradient)')
            .attr("d", vis.path)

        let m0,
            o0;

        vis.svg.call(
            d3.drag()
                .on("start", function (event) {

                    let lastRotationParams = vis.projection.rotate();
                    m0 = [event.x, event.y];
                    o0 = [-lastRotationParams[0], -lastRotationParams[1]];
                })
                .on("drag", function (event) {
                    if (m0) {
                        let m1 = [event.x, event.y],
                            o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                        vis.projection.rotate([-o1[0], -o1[1]]);
                    }

                    // Update the map
                    vis.path = d3.geoPath().projection(vis.projection);
                    d3.selectAll(".country").attr("d", vis.path)

                    d3.selectAll(".airport")
                        .attr('cx', d => vis.projection([d.longitude, d.latitude])[0])
                        .attr('cy', d => vis.projection([d.longitude, d.latitude])[1])
                })
        )
        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        let filteredData = vis.christmasSongs

        // prepare music data by grouping all rows by state
        let musicDataByState = Array.from(d3.group(filteredData, d =>d.state), ([key, value]) => ({key, value}))
        //console.log(musicDataByState);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        vis.airports = vis.svg.selectAll('.airport')
            .data(vis.places)
            .enter().append('circle')
            .attr('class', 'airport')
            // .merge(vis.airports)
            .attr('cx', d => vis.projection([d.longitude, d.latitude])[0])
            .attr('cy', d => vis.projection([d.longitude, d.latitude])[1])
            //.attr('cx', d => vis.projection())
            .attr('r', function (d,i) {
                return 5
            })
            .style('fill', '#b9f2ff')
            .style('stroke', 'black')
            .style('opacity', function(d) {
                const coordinate = [d.longitude, d.latitude];
                let gdistance = d3.geoDistance(coordinate, vis.projection.invert([vis.width/2, vis.height/2]));
                return gdistance > 1.57 ? 'none' : '1';})

        // vis.airports.exit().remove()
        vis.airports
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr("fill", 'rgba(181,0,0,0.48)')
                    .attr("stroke", 'darkred')

                console.log(d)
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`<div style="border: thin solid grey; border-radius: 5px; background: white; padding: 5px;">
                        <h3>Performer: <strong>${d.performer}</strong><h3>
                        <h3>Country: <strong>${d.country}</strong><h3>
                        <h3>State: <strong>${d.state}</strong><h3>
                        <h3>City: <strong>${d.city}</strong><h3></div>`);
            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .attr('fill', 'url(#gradient)')
                    .attr("stroke", 'transparent')

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 +"px")
                    .style("top", 0+ "px")
            })
            .transition()
            .duration(500)
            .attr('fill', 'url(#gradient)')

    }
}