class ChristmasMap {

    constructor(parentElement, geoData, christmasSongs) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.christmasSongs = christmasSongs
        this.displayData = [];

        this.colorScale = ['#fddbc7','#f4a582','#d6604d','#b2182b']

        this.initVis()
    }

    initVis() {
        let vis = this;
        vis.margin = {top: 10, right: 150, bottom: 0, left: 150};
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

        console.log("world", vis.world)

        vis.svg.append("path")
            .datum({type: "Sphere"})
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        // graticule
        vis.svg.append("path")
            .datum(d3.geoGraticule())
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'worldTooltip')

        // create a legend group
        // vis.legend = vis.svg.append("g")
        //     .attr('class', 'legend')
        //     .attr('transform', `translate(${vis.width * 2.8 / 4.2}, ${vis.height - 20})`)
        //
        // // create a legendScale
        // vis.x1 = d3.scaleLinear()
        //     .domain([0, 100])
        //     // legend width is expressed in terms of the bounding box width
        //     .range([0, 100]);
        //
        // vis.legendAxis = d3.axisBottom()
        //     .ticks(3)
        //     .scale(vis.x1)
        //
        // vis.legend.selectAll("rect")
        //     .data(vis.colorScale)
        //     .enter()
        //     .append("rect")
        //     .attr("height", 20)
        //     .attr("x", function(d, i) { return i*25 })
        //     .attr("y", -20)
        //     .attr("width", function(d) { return 25 })
        //     .style("fill", function(d, i) { return d });
        //
        // // call the legend axis inside the legend axis group
        // vis.svg.append("g")
        //     .attr("class", "x-axis axis")
        //     .attr('transform', `translate(${vis.width * 2.8 / 4.2}, ${vis.height - 20})`)
        //
        // vis.svg.select(".x-axis").call(vis.legendAxis)

        //legend.call(vis.legendAxis)

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
                    d3.selectAll(".graticule").attr("d", vis.path)
                })
        )
        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        let filteredData = vis.christmasSongs

        // prepare music data by grouping all rows by state
        let musicDataByState = Array.from(d3.group(filteredData, d =>d.state), ([key, value]) => ({key, value}))
        console.log(musicDataByState);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

    }
}