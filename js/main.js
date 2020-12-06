// init global variables & switches
let initialPage;
let christmasMap;
let myChartVis;
let myBirthdayVis;
let myGlobalStreamsVis;
let myWeeklyVis;
let wordCloudVis;

let parseDate = d3.timeParse("%m/%d/%Y");
let yearParse = d3.timeParse("%Y");
let bisectDate = d3.bisector(function(d) { return d.day; }).left;
let alternateParseDate = d3.timeParse("%Y-%m-%d");

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
    }),
    d3.csv("data/christmas_songs_noDupes.csv", (row) => {
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
    }),
    d3.csv("data/christmas_songs_with_lyrics.csv", (row) => {
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
        row.year = timeParseYear(row.year);

        row.weeks_on_chart = +row.weeks_on_chart;

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

    // array = [{ id: 0, quantity: 1 }, { id: 1, quantity: 2 }, { id: 0, quantity: 4 }],
    // unique returns only highest instance
    let hash = Object.create(null)
    let unique = data[1].reduce(function (r, o) {
        if (!(o.performer in hash)) {
            hash[o.performer] = r.push(o) - 1;
            return r;
        }
        if (o.instance > r[hash[o.performer]].instance) {
            r[hash[o.song]] = o;
        }
        return r;
        }, []);
    console.log("unique", unique)
    // log data
    initialPage = new InitialPage("initialPage", data[3], group, unique);
    let mapData = data[2]
    for (var i = 0, j = mapData.length; i < j; i++) {
        // Assuming the first is always circle
        mapData[i]['pulse'] = false;
    };
    console.log(mapData)

    christmasMap = new ChristmasMap("mapVis", data[0], data[1], mapData);

    // wordCountBarVis = new WordCountBarVis("wordCountBarDiv", data[5]);
    wordCloudVis = new WordCloudVis("wordCloudDiv", data[5]);
    setArtistSelect(data[5]);

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

// Section: Mariah Carey Global Streams

// load data using promises
let globalStreamPromises = [
    d3.csv("data/mariah_weekly.csv", (row) => {
        row.streams = +row.streams
        row.position = +row.position;
        row.day = parseDate(row.day);
        return row;
    }),
    d3.csv("data/ariana_weekly.csv", (row) => {
        row.streams = +row.streams
        row.day = parseDate(row.day);
        return row;
    }),
    d3.csv("data/brenda_weekly.csv", (row) => {
        row.streams = +row.streams
        row.day = parseDate(row.day);
        return row;
    }),
    d3.csv("data/wham_weekly.csv", (row) => {
        row.streams = +row.streams
        row.day = parseDate(row.day);
        return row;
    }),
    d3.csv("data/michael_weekly.csv", (row) => {
        row.streams = +row.streams
        row.day = parseDate(row.day);
        return row;
    }),
];

Promise.all(globalStreamPromises)
    .then( function(data){ initWeeklyVis(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initWeeklyVis(allDataArray) {
    myGlobalStreamsVis = new GlobalStreamsVis('globalStreamsVis',
        allDataArray[0],
        allDataArray[1],
        allDataArray[2],
        allDataArray[3],
        allDataArray[4],)
}

d3.csv("data/combined_weekly.csv", (row) => {
    row.week = alternateParseDate(row.week);
    return row;
}).then( (data) => {
    myStreamVis = new StreamVis('streamVis', data);
});