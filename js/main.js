// TODO: first read in data
let initialPage;
let christmasMap;

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
        row.year = timeParseYear(row.year);

        row.weeks_on_chart = +row.weeks_on_chart;

        return row;
    })
]

Promise.all(promises)
    .then( function(data){ initMapPage(data) })
    .catch( function (err){console.log(err)} );

function initMapPage(data) {
    console.log(data[1]);
    let newList = data[1].filter((elem, index, self) => self.findIndex(
        (t) => {return (t.song === elem.song)}) === index)
    //console.log(newList)
    let result = {};
    for(const {url,weekid,week_position,song,performer,songid,instance,previous_week_position,peak_position,weeks_on_chart,year,month,day} of data) {
        if(!result[song]) result[song] = [];
        result[song].push({ url,weekid,week_position, performer,instance,previous_week_position,peak_position,weeks_on_chart,year,month,day });
    }
    //console.log(result, Object.keys(result).length);

    initialPage = new InitialPage("initialPage", data[1]);

    // log data
    console.log('check out the data', data);

    christmasMap = new ChristmasMap("mapVis", data[0], data[1]);
}