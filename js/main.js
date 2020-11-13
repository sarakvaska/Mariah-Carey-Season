/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */


// init global variables & switches
let myChartVis;

let parseDate = d3.timeParse("%m/%d/%Y");

d3.csv("data/christmas_songs.csv", (row) => {
    row.day = +row.day
    row.instance = +row.instance;
    row.month = +row.month;
    row.peak_position = +row.peak_position;
    row.week_position = +row.week_position;
    row.previous_week_position = +row.previous_week_position;
    row.weeks_on_chart = +row.weeks_on_chart;
    row.year = +row.year;
    row.weekid = parseDate(row.weekid);
    return row;
}).then( (data) => {
    myChartVis = new ChartVis('chart-map', data);
});

let selectedCategory = $('#ranking-type').val();

function categoryChange() {
    selectedCategory = $('#ranking-type').val();
    myChartVis.wrangleData();
}
