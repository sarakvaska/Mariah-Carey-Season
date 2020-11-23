// init global variables & switches
let initialPage;
let christmasMap;
let myChartVis;
let myBirthdayVis;
let myGlobalStreamsVis;
let myWeeklyVis;

let parseDate = d3.timeParse("%m/%d/%Y");
let yearParse = d3.timeParse("%Y");
let bisectDate = d3.bisector(function(d) { return d.day; }).left;

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
    .add({
        targets: '.ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
    }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});

let promises = [
   // d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"), // already projected -> you can just scale it to ft your browser window
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"),
    d3.csv("data/christmas_songs.csv", (row) => {
        // convert all numeric values to numbers
        row.day = +row.day;
        row.instance = +row.instance;
        row.month = +row.month;
        row.peak_position = +row.peak_position;
        row.previous_peak_position = +row.previous_peak_position;
        row.week_position = +row.week_position;

        let timeParse = d3.timeParse("%m/%d/%Y");
        //row.weekid = timeParse(row.weekid);
        let timeParseYear = d3.timeParse("%Y");
        row.year = +row.year;

        row.weeks_on_chart = +row.weeks_on_chart;
        return row;
    }),
    d3.csv("data/birthplace_of_christmas.csv", (row) => {
        row.latitude = +row.latitude;
        row.longitude = +row.longitude;
        return row;
    })
]
Promise.all(promises)
    .then( function(data){ initMapPage(data) })
    .catch( function (err){console.log(err)} );

function initMapPage(data) {
    //console.log(data[1]);
    let newList = data[1].filter((elem, index, self) => self.findIndex(
        (t) => {return (t.song === elem.song)}) === index)
    //console.log(newList)

    // New list: group by song name
    let group = data[1].reduce((r, a) => {
        r[a.song] = [...r[a.song] || [], a];
        return r;
    }, {});
    console.log("group", group);
    var size = Object.keys(group).length;
    console.log(size);

    let result = {};
    for(const {url,weekid,week_position,song,performer,songid,instance,previous_week_position,peak_position,weeks_on_chart,year,month,day} of data) {
        if(!result[song]) result[song] = [];
        result[song].push({ url,weekid,week_position, performer,instance,previous_week_position,peak_position,weeks_on_chart,year,month,day });
    }
    //console.log(result, Object.keys(result).length);
    // log data
    initialPage = new InitialPage("initialPage", data[1], group);

    christmasMap = new ChristmasMap("mapVis", data[0], data[1], data[2]);

}

// Section: Interactive Birthday
d3.csv("data/christmas_songs_birthday.csv", (row) => {
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

let birthdayDate = 2019;

function birthdayChange() {
    birthdayDate = $('#birthdayInput').val();
    myBirthdayVis.updateVis();
}