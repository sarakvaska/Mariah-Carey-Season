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
        vis.margin = {top: 20, right: 100, bottom: 20, left: 100};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr("append", "g")
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`)

        // create a projection
        vis.projection = d3.geoOrthographic() // d3.geoStereographic()
            .translate([vis.width / 2, vis.height / 2])
            .scale(0.8 * vis.height / 2)
            .clipAngle(90);


        // define a geo generator and pass your projection to it
        vis.path = d3.geoPath()
            .projection(vis.projection);

        // convert your TopoJSON data into GEOJSON data structure
        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        const tRotation = 20000;

        // pause button
        var rotationOn = false;

        vis.svg.append("text")
            .attr("x", vis.width/2)
            .attr("y", vis.height - 30)
            .text("PLAY")
            .attr("text-anchor", "middle")
            .style("font-size", '20px')
            .style("font-family", "Mountains of Christmas")
            .style('cursor', 'pointer')
            .style('fill', 'white')
            .on("mouseover", function() { d3.select(this).style("text-decoration", "underline") })
            .on("mouseout", function() { d3.select(this).style("text-decoration", "none") })
            .on("click", function() {
                rotationOn = !rotationOn;
                d3.select(this).text(rotationOn ? "PAUSE" : "PLAY")
            })

        // vars for timer
        var tNew, dt, steps, pos, tOld, oldPos;
        tOld = 0;
        oldPos = 0;

        // start timer
        d3.timer(myTimer);

        // function that rotates the earth
        function myTimer(now) {
            if (rotationOn) {
                tNew = now;
                dt = tOld - tNew;
                steps = dt * 360 / tRotation;

                pos = oldPos - steps //the earth rotates towards the east

                if (pos <= -180) {pos = pos+360}

                vis.projection.rotate([pos, 0]);
                vis.svg.selectAll("path").attr("d", vis.path)

                tOld = tNew;
                oldPos = pos;
            }
            else {
                tOld = now;
            }
            drawMarkers();
        }

        function drawMarkers() {
            vis.markers = vis.svg.selectAll('circle')
                .data(vis.places)

            vis.markers
                .enter()
                .append('circle')
                .merge(vis.markers)
                .attr('class', 'allCircles')
                .attr('cx', d => vis.projection([d.longitude, d.latitude])[0])
                .attr('cy', d => vis.projection([d.longitude, d.latitude])[1])
                .attr('fill', d => {
                    const coordinate = [d.longitude, d.latitude];
                    let gdistance = d3.geoDistance(coordinate, vis.projection.invert([vis.width/2, vis.height/2]));
                    return gdistance > 1.57 ? 'transparent' : '#b9f2ff';
                })
                .style('stroke', d => {
                    const coordinate = [d.longitude, d.latitude];
                    let gdistance = d3.geoDistance(coordinate, vis.projection.invert([vis.width/2, vis.height/2]));
                    return gdistance > 1.57 ? 'transparent' : 'black';
                })
                .style('cursor', 'pointer')
                .attr('r', 5)

            vis.markers
                .on('click', function(event, d) {
                    // d3.selectAll('circle').attr('fill', d => {
                    //     const coordinate = [d.longitude, d.latitude];
                    //     let gdistance = d3.geoDistance(coordinate, vis.projection.invert([vis.width/2, vis.height/2]));
                    //     return gdistance > 1.57 ? 'transparent' : '#b9f2ff';
                    // });
                    // d3.select(this).style("fill", 'yellow');
                    // once another one is clicked, change color back to blue
                    // set selected one to yellow
                    //pulse(d3.select(this));

                    d3.select('.imgPlaceholder').remove();
                    d3.select(".newDivInfo").remove();
                    // fix for willis the guard
                    vis.imagePath = d.performer.split(" ").join("").toUpperCase() + '.jpg'
                    console.log(vis.imagePath)
                    if(vis.imagePath == 'WILLIS"THEGUARD"&VIGORISH.jpg') {
                        vis.imagePath = 'WILLISTHEGUARD.jpg';
                    }
                    if(vis.imagePath == 'THEDRIFTERSFEATURINGCLYDEMCPHATTERANDBILLPINKNEY.jpg') {
                        vis.imagePath = 'THEDRIFTERS.jpg';
                    }
                    if(vis.imagePath == 'THEBROWNSFEATURINGJIMEDWARDBROWN.jpg') {
                        vis.imagePath = 'THEBROWNS.jpg';
                    }
                    if(vis.imagePath == 'THEKILLERSFEATURINGTONIHALLIDAY.jpg') {
                        vis.imagePath = 'THEKILLERS.jpg';
                    }
                    vis.from = '';
                    if(d.state == 'N/A') {
                        vis.from = d.country;
                    }
                    else {
                        vis.from = d.state;
                    }
                    vis.filler = d.performer;
                    if(d.performer == 'The Killers Featuring Toni Halliday') {
                        vis.filler = 'The Killers';
                    }
                    if(d.performer == 'The Browns Featuring Jim Edward Brown') {
                        vis.filler = 'The Browns';
                    }
                    if(d.performer == 'The Drifters Featuring Clyde McPhatter And Bill Pinkney') {
                        vis.filler = 'The Drifters';
                    }
                    if(d.performer == 'Engelbert Humperdinck') {
                        vis.filler = 'Engelbert Humperdinck_(singer)';
                    }
                    if(d.performer == 'Willis "The Guard" & Vigorish') {
                        vis.filler = 'Buckner_%26_Garcia';
                    }
                    d3.select(".newDiv").append('div')
                        .html(`<div><p style="font-size: 22px; color: #B3000C; text-align: center;">
                                <img style="margin-top: -60px; display: block; margin-left: auto; margin-right: auto; width: 50%; border:thin solid black; border-radius: 5px;" src="img/${vis.imagePath}"/>
                                ${d.performer}</p>
                                <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">From: <strong>${d.city}, ${vis.from}</strong><h3>
                                <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">Song: <strong style="color: #B3000C">${d.song.toLowerCase()}</strong><h3>
                                <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">Read more here: <a href="https://en.wikipedia.org/wiki/${vis.filler}" target="_blank">wikipedia</a><h3></div>`)
                        .attr("class", 'newDivInfo')
                })
                .on('mouseover', function (event, d) {
                    if(rotationOn == false) {
                        d3.select(this)
                            .attr("fill", 'rgba(181,0,0,0.48)')
                            .attr("stroke", 'darkred')
                        vis.tooltip
                            .style("opacity", 1)
                            .style("left", event.pageX + 20 + "px")
                            .style("top", event.pageY + "px")
                            .html(`<div style="border: thin solid grey; border-radius: 5px; background: white; padding: 5px;">
                            <h3>Performer: <strong>${d.performer}</strong><h3>
                            <h3>Country: <strong>${d.country}</strong><h3>
                            <h3>State: <strong>${d.state}</strong><h3>
                            <h3>City: <strong>${d.city}</strong><h3></div>`);
                    }
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
            // markerGroup.each(function () {
            //     this.parentNode.appendChild(this);
            // })
        }
        // want to change back to blue when another circle is clicked
        // function pulse(circle) {
        //     (function repeat() {
        //         circle
        //             .style("fill", d => {
        //                 const coordinate = [d.longitude, d.latitude];
        //                 let gdistance = d3.geoDistance(coordinate, vis.projection.invert([vis.width/2, vis.height/2]));
        //                 return gdistance > 1.57 ? 'transparent' : 'yellow';
        //             })
        //             .transition()
        //             .duration(500)
        //             .attr("stroke-width", 0)
        //             .attr('stroke-opacity', 0)
        //             .transition()
        //             .duration(500)
        //             .attr("stroke-width", 0)
        //             .attr('stroke-opacity', 0.5)
        //             .transition()
        //             .duration(1000)
        //             .attr("stroke-width", 65)
        //             .attr('stroke-opacity', 0)
        //             .ease(d3.easeSin)
        //             .on("end", repeat);
        //     })();
        // }

        d3.select(".newDiv").append('div')
            .html(`<div><p style="font-size: 22px; color: #B3000C; text-align: center;">
                    <img style="margin-top: -70px; display: block; margin-left: auto; margin-right: auto; width: 50%; border:thin solid black; border-radius: 5px;" src="img/MARIAHCAREY.jpg"/>
                    Mariah Carey</p>
                    <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">From: <strong>Huntington, NY</strong><h3>
                    <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">Song: <strong style="color: #B3000C">"all i want for christmas is you"</strong><h3>
                    <h3 style="font-size: 22px; text-align: left; margin-left: 20px;">Read more here: <a href="https://en.wikipedia.org/wiki/Mariah_Carey" target="_blank">wikipedia</a><h3></div>`)
            .attr("class", 'imgPlaceholder')
            // d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><b style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/ALLIWANTFORCHRISTMASISYOU.jpg"/>"all i want for christmas is you"</b> by Mariah Carey spent <u>20 weeks</u> on the chart and reached a peak position of 11.<p></div>`)
            //     .attr("class", "weeks-fact-placeholder")

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

    }
}