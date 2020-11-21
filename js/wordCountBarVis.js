/* * * * * * * * * * * * * *
*      class WordCountBarVis        *
* * * * * * * * * * * * * */


class WordCountBarVis {

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.displayData = data;
        this.filteredData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.transitionTime = 2000;
        vis.firstLoad = true;

        vis.margin = {top: 20, right: 10, bottom: 20, left: 40};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text("Test title")
            .attr('transform', `translate(${vis.width / 2}, 10)`)
            .attr('text-anchor', 'middle');

        // Scales and axes
        vis.x = d3.scaleBand()
            .range([0, vis.width])
            .round(true)
            .paddingInner(0.05);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .tickSize(1);

        vis.yAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis");

        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        // Add tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip');

        this.wrangleData();
    }

    wrangleData(){
        let vis = this;

        // // if there is a region selected
        // if (selectedTimeRange.length !== 0){
        //     // console.log('region selected', vis.selectedTimeRange, vis.selectedTimeRange[0].getTime() )
        //
        //     // iterate over all rows the csv (dataFill)
        //     vis.covidData.forEach( row => {
        //         // and push rows with proper dates into filteredData
        //         if (selectedTimeRange[0].getTime() <= vis.parseDate(row.submission_date).getTime() && vis.parseDate(row.submission_date).getTime() <= selectedTimeRange[1].getTime() ){
        //             filteredData.push(row);
        //         }
        //     });
        // } else {
        //     filteredData = vis.covidData;
        // }

        vis.filteredData = vis.displayData;

        console.log('js final data structure', vis.filteredData);

        vis.updateVis()

    }

    updateVis(word = '') {
        let vis = this;
        // vis.selectedCategory = selectedCategory;

        // if (vis.descending){
        //     vis.stateInfo.sort((a,b) => {return b[vis.selectedCategory] - a[vis.selectedCategory]})
        // } else {
        //     vis.stateInfo.sort((a,b) => {return a[vis.selectedCategory] - b[vis.selectedCategory]})
        // }
        vis.topTenData = vis.filteredData.slice(0, 10);
        word.length > 0 ? vis.topTenData.push(vis.filteredData.find(d => d.word === word)) : null;
        console.log("vis.topTenData = ", vis.topTenData);

        // Update axes
        vis.y.domain([0, d3.max(vis.topTenData, d => d.count)]);
        vis.x.domain(vis.topTenData.map( d => d.word));

        // vis.yAxis
        //     .tickFormat(d => {
        //         if(selectedCategory === "relCases" || selectedCategory === "relDeaths") {
        //             return d + "%";
        //         } else {
        //             if(d >= 1000000) return ((d/1000000) + "M");
        //             if(d >= 1000) return ((d/1000) + "K");
        //             return d;
        //         };
        //     });


        // Draw bars
        // Data-join
        vis.bars = vis.svg.selectAll(".bars")
            .data(vis.topTenData);

        // Enter (initialize the newly added elements)
        vis.bars.enter().append("rect")
            .attr("class", "bars")
            .on('mouseover', function(event, d){
                // console.log("d = ", d);
                // Selects the current bar, recolors it, and draws an outline around it
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'white')
                    .style("fill", "lightblue");

                // Modify the tooltip (move to mouse position and display info)
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                             <h4>${d.word}<h3>
                             <h6># of times used: ${d.count.toLocaleString("en")}</h6>
                         </div>`);
            })
            .on('mouseout', function(event, d){
                // Updates the current bar (removes outline, resets color)
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .style("fill", "#093252");

                // Updates the tooltip (disappears and removes the element))
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })


            // Update all bars
            .merge(vis.bars)
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .attr("x", d => vis.x(d.word))
            .attr("y", d => (vis.y(d.count)))
            .attr("width", vis.x.bandwidth())
            .attr("height", d => (vis.height - vis.y(d.count)))
            .attr("fill", "#093252");

        vis.svg.selectAll(".bars").on("click", (event, data) => console.log(data));

        vis.bars.exit().remove();

        // Call axis
        vis.yAxisGroup
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .call(vis.yAxis);


        vis.xAxisGroup
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .style("font", "9px times")
            .call(vis.xAxis);

        vis.firstLoad = false;
    }

}