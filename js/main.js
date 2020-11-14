// TODO: first read in data
let initialPage;

// convert some christmas song variable strings to numerical data
let convertedChristmasSongs = d3.csv("data/christmas_songs.csv", (row) => {
    // convert all numeric values to numbers
    row.day = +row.day;
    row.instance = +row.instance;
    row.month = +row.month;
    row.peak_position = +row.peak_position;
    row.previous_peak_position = +row.previous_peak_position;
    row.week_position = +row.week_position;

    let timeParse = d3.timeParse("%m/%d/%Y");
    row.weekid = timeParse(row.weekid);
    let timeParseYear = d3.timeParse("%Y");
    row.year = timeParseYear(row.year);

    row.weeks_on_chart = +row.weeks_on_chart;

    return row;
}).then(data => {
    console.log(data);

    // console.log(christmasSongs, christmasLyrics)
    initialPage = new InitialPage("initialPage", data);
})