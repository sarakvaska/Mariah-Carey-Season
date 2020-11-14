/* * * * * * * * * * * * * *
*      class ChartVis        *
* * * * * * * * * * * * * */


class ChartVis {

    constructor(parentElement, chartData) {
        this.parentElement = parentElement;
        this.chartData = chartData;
        this.displayData = [];

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // Scales and axes
        vis.x = d3.scaleTime()
            .range([0, vis.width]);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(9," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis")
            .attr("transform", "translate(9,0)");

        vis.wrangleData();

    }

    wrangleData() {
       let vis = this;

       let initialDate, finalDate;

       // create initial and final dates for each decade (60s, 70s, 80s)
       if (selectedCategory == "01/01/1960") {
           initialDate = parseDate(selectedCategory);
           finalDate = parseDate("12/31/1969");
       } else if (selectedCategory == "01/01/1970") {
            initialDate = parseDate(selectedCategory);
            finalDate = parseDate("12/31/1979");
        } else if (selectedCategory == "01/01/1980") {
            initialDate = parseDate(selectedCategory);
            finalDate = parseDate("12/31/1989");
        } else if (selectedCategory == "01/01/1990") {
           initialDate = parseDate(selectedCategory);
           finalDate = parseDate("12/31/1999");
       } else if (selectedCategory == "01/01/2000") {
           initialDate = parseDate(selectedCategory);
           finalDate = parseDate("12/31/2009");
       } else if (selectedCategory == "01/01/2010") {
           initialDate = parseDate(selectedCategory);
           finalDate = parseDate("12/31/2019");
       }

       let birthdayRangeInitial= yearParse(birthdayDate);
       let birthdayRangeFinal= yearParse(+birthdayDate + 1);

       let newFilteredBirthdayData = [];

        newFilteredBirthdayData = vis.chartData.filter(function(d) { return d.weekid >= birthdayRangeInitial && d.weekid <= birthdayRangeFinal});
        console.log(newFilteredBirthdayData);

        newFilteredBirthdayData = (newFilteredBirthdayData.sort((a,b) => a.weekid - b.weekid));

        if (newFilteredBirthdayData.length > 0) {
            newFilteredBirthdayData = newFilteredBirthdayData[0]['song'];
        }

        console.log(newFilteredBirthdayData);


        let filteredData = [];
        let groupedData = [];

       // filter according to the selected decade & sort it by highest peak
       filteredData = vis.chartData.filter(function(d) { return d.weekid >= initialDate && d.weekid <= finalDate});
       filteredData = filteredData.sort((a,b) => a.weekid - b.weekid);

       // console.log(filteredData);


       // helper function to only add items to the array if it's a unique entry in regards to songid && year
       function addItem(item) {
           let index = groupedData.findIndex(x => x.songid == item.songid && x.year == item.year)
           if (index === -1) {
                groupedData.push(item);
            } else { console.log("object already exists") }
        }

       filteredData.forEach(function (d, i) {
           addItem(d);
       });

       // group decade data by songid
       vis.displayData = Array.from(d3.group(groupedData, d =>d.songid), ([key, value]) => ({key, value}));

       vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // console.log(vis.displayData);

    }

}