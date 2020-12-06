/* * * * * * * * * * * * * *
*      class BirthdayVis        *
* * * * * * * * * * * * * */


class BirthdayVis {

    constructor(parentElement, chartData) {
        this.parentElement = parentElement;
        this.chartData = chartData;
        this.displayData = [];

        this.initVis()
    }
    initVis() {
        let vis = this;

        vis.margin = {top: 10, right: 10, bottom: 10, left: 10};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = 500;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        console.log(birthdayDate);

        let birthdayRangeInitial= yearParse(birthdayDate);
        let birthdayRangeFinal= yearParse(+birthdayDate + 1);

        vis.newFilteredBirthdayData = [];

        vis.newFilteredBirthdayData = vis.chartData.filter(function(d) { return d.weekid >= birthdayRangeInitial && d.weekid <= birthdayRangeFinal});
        console.log(vis.newFilteredBirthdayData);


        vis.newFilteredBirthdayData = (vis.newFilteredBirthdayData.sort((a,b) => a.week_position - b.week_position));


        if (vis.newFilteredBirthdayData.length > 0) {
            vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

            vis.svg.select("#performer-image").remove()
            vis.svg.select("#song-name").remove()
            vis.svg.select("#performer-name").remove()
            vis.svg.select("#peak-position").remove()

            showBirthdayInformation()
        } else {
            insertDataManually()
        }

        function showBirthdayInformation() {
            vis.svg.append("image")
                .attr("id", "performer-image")
                .attr("xlink:href", function() {
                    console.log(vis.newFilteredBirthdayData['song']);
                    let songName = vis.newFilteredBirthdayData['song'].split(' ').join('');

                    // solve corner issue with "?" char
                    if (vis.newFilteredBirthdayData['performer'] == 'Band-Aid') {
                        return "img/DOTHEYKNOWIT'SCHRISTMAS.jpg"
                    } else {
                        return "img/" + songName + '.jpg';
                    }

                })
                .attr('x', 150)
                .attr('y', -80)
                .attr("height", 550)
                .attr("width", 420);

            // Song name
            vis.svg.append("text")
                .attr("y", 440)
                .attr("x", 150)
                .attr("id", "song-name")
                .attr("class", "birthdayText")
                .text(function() {
                    let songName = vis.newFilteredBirthdayData['song']
                    return  songName})

            // Artist
            vis.svg.append("text")
                .attr("y", 470)
                .attr("x", 150)
                .attr("id", "performer-name")
                .attr("class", "birthdayTextSmaller")
                .text(function() { return  "Artist: " + vis.newFilteredBirthdayData['performer']})


            // Peak billboard position
            vis.svg.append("text")
                .attr("y", 500)
                .attr("x", 150)
                .attr("id", "peak-position")
                .attr("class", "birthdayTextSmaller")
                .text(function() { return  "Peak Billboard Position: #" + vis.newFilteredBirthdayData['peak_position']})
        }

        function insertDataManually () {
            if (birthdayDate == null) {
                console.log("fuck my myass");
            }
            if (birthdayDate == 1967) {
                console.log("196777777");
                let song1967 = {
                    "song": 'MY FAVORITE THINGS',
                    "performer": "Herb Alpert & The Tijuana Brass",
                    "weekid": parseDate('01/01/1967'),
                    "year": 1967,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1967);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1971) {
                console.log("19688888");
                let song1971 = {
                    "song": 'WINTER WORLD OF LOVE',
                    "performer": "Engelbert Humperdinck",
                    "weekid": parseDate('01/01/1971'),
                    "year": 1971,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1971);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1972) {
                console.log("19688888");
                let song1972 = {
                    "song": 'WINTER WORLD OF LOVE',
                    "performer": "Engelbert Humperdinck",
                    "weekid": parseDate('01/01/1972'),
                    "year": 1972,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1972);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1977) {
                let song1977 = {
                    "song": "CHRISTMAS FOR COWBOYS",
                    "performer": "John Denver",
                    "weekid": parseDate('01/01/1977'),
                    "year": 1977,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1977);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1982) {
                let song1982 = {
                    "song": "SAME OLD LANG SYNE",
                    "performer": "Dan Fogelberg",
                    "weekid": parseDate('01/01/1982'),
                    "year": 1982,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1982);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1983) {
                let song1983 = {
                    "song": "SAME OLD LANG SYNE",
                    "performer": "Dan Fogelberg",
                    "weekid": parseDate('01/01/1983'),
                    "year": 1983,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1983);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1985) {
                let song1985 = {
                    "song": "DO THEY KNOW IT'S CHRISTMAS?",
                    "performer": "Band-Aid",
                    "weekid": parseDate('01/01/1985'),
                    "year": 1985,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1985);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1986) {
                let song1986 = {
                    "song": "DO THEY KNOW IT'S CHRISTMAS?",
                    "performer": "Band-Aid",
                    "weekid": parseDate('01/01/1986'),
                    "year": 1986,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1986);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1987) {
                let song1987 = {
                    "song": "DO THEY KNOW IT'S CHRISTMAS?",
                    "performer": "Band-Aid",
                    "weekid": parseDate('01/01/1987'),
                    "year": 1987,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1987);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1988) {
                let song1988 = {
                    "song": "DO THEY KNOW IT'S CHRISTMAS?",
                    "performer": "Band-Aid",
                    "weekid": parseDate('01/01/1988'),
                    "year": 1988,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song1988);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1991) {
                let song = {
                    "song": "THIS ONE'S FOR THE CHILDREN",
                    "performer": "New Kids On The Block",
                    "weekid": parseDate('01/01/1991'),
                    "year": 1991,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 1992) {
                let song = {
                    "song": "THIS ONE'S FOR THE CHILDREN",
                    "performer": "New Kids On The Block",
                    "weekid": parseDate('01/01/1992'),
                    "year": 1992,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 2002) {
                let song = {
                    "song": "THE CHRISTMAS SHOES",
                    "performer": "NewSong",
                    "weekid": parseDate('01/01/2002'),
                    "year": 2002,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 2003) {
                let song = {
                    "song": "ALL I WANT FOR CHRISTMAS IS A REAL GOOD TAN",
                    "performer": "Kenny Chesney",
                    "weekid": parseDate('01/01/2003'),
                    "year": 2003,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 2004) {
                let song = {
                    "song": "BELIEVE",
                    "performer": "Josh Groban",
                    "weekid": parseDate('01/01/2004'),
                    "year": 2004,
                    "peak_position": 100,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 2018) {
                let song = {
                    "song": "ALL I WANT FOR CHRISTMAS IS YOU",
                    "performer": "Mariah Carey",
                    "weekid": parseDate('01/01/2018'),
                    "year": 2018,
                    "peak_position": 1,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
            if (birthdayDate == 2019) {
                let song = {
                    "song": "ALL I WANT FOR CHRISTMAS IS YOU",
                    "performer": "Mariah Carey",
                    "weekid": parseDate('01/01/2019'),
                    "year": 2019,
                    "peak_position": 1,
                }
                vis.newFilteredBirthdayData.push(song);
                vis.newFilteredBirthdayData = vis.newFilteredBirthdayData[0];

                vis.svg.select("#performer-image").remove()
                vis.svg.select("#song-name").remove()
                vis.svg.select("#performer-name").remove()
                vis.svg.select("#peak-position").remove()
                showBirthdayInformation()
            }
        }
    }
}