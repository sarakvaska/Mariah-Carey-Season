/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */


// init global variables & switches
let myChartVis;
let myBirthdayVis;
let myGlobalStreamsVis;
let myWeeklyVis;

let parseDate = d3.timeParse("%m/%d/%Y");
let yearParse = d3.timeParse("%Y");
let bisectDate = d3.bisector(function(d) { return d.day; }).left;


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
    // myChartVis = new ChartVis('chart-map', data);
    myBirthdayVis = new BirthdayVis('birthdayVis', data);
});

d3.csv("data/mariah.csv", (row) => {
    row.streams = +row.streams
    row.position = +row.position;
    row.day = parseDate(row.day);
    return row;
}).then( (data) => {
    myGlobalStreamsVis = new GlobalStreamsVis('globalStreamsVis', data);
});

// load data using promises
let promises = [
    d3.csv("data/ariana_weekly.csv"),
    d3.csv("data/brenda_weekly.csv"),
    d3.csv("data/wham_weekly.csv"),
    d3.csv("data/michael_weekly.csv"),
    d3.csv("data/mariah_weekly.csv"),
    d3.csv("data/combined_weekly.csv"),
];

Promise.all(promises)
    .then( function(data){ initWeeklyVis(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initWeeklyVis(allDataArray) {
    myWeeklyVis = new WeeklyVis('weeklyTopVis',
        allDataArray[0],
        allDataArray[1],
        allDataArray[2],
        allDataArray[3],
        allDataArray[4],
        allDataArray[5])
}


let selectedCategory = $('#ranking-type').val();
let birthdayDate = $('#birthdayInput').val();

function categoryChange() {
    selectedCategory = $('#ranking-type').val();
    myChartVis.wrangleData();
}

function birthdayChange() {
    birthdayDate = $('#birthdayInput').val();
    console.log(birthdayDate);
    myBirthdayVis.updateVis();
}
