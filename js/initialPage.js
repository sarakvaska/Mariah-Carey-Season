class InitialPage {
    // constructor method to initialize initial visualization
    constructor(parentElement, christmasSongs, group) {
        this.parentElement = parentElement;
        this.christmasSongs = christmasSongs;
        this.group = group;
        this.displayData = [];
        this.circleColors = ['#00B32C','#D8D8D8','#B3000C','#E40010'];
        //'#00B32C'
        this.clickedWeeks = 'false';
        this.clickedInstance = 'false';
        this.clickedDecade = 'false';
        this.clickedAll = 'true';

        this.initVis()
    }

    initVis() {
        let vis = this;
        console.log(vis.christmasSongs)
        vis.margin = {top: 10, right: 10, bottom: 10, left:10};
        //vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.width = 650;
        //vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;
        vis.height = 600;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .append("g")
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "myTooltip")

        function hideTitles() {
            vis.svg.selectAll('.title').remove();
        }

        function showTitles(byVar, groupNumber) {
            var titles = vis.svg.selectAll('.title')
                .data(vis.christmasSongs)

            titles.enter().append('text')
                .attr('class', 'title')
                .merge(titles)
                .attr('x', function (d, i) {
                    if (i < 4 && byVar == 'weeks_on_chart') {
                        if(i == 0) {
                            return 50;
                        }
                        if(i == 1) {
                            return 390;
                        }
                        if(i == 2) {
                            return 50;
                        }
                        if(i == 3) {
                            return 390;
                        }
                    }
                    else if(i < 6 && byVar == 'instance') {
                        if(i == 0) {
                            return 50;
                        }
                        if(i == 1) {
                            return 345;
                        }
                        if(i == 2) {
                            return 400;
                        }
                        if(i == 3) {
                            return 430;
                        }
                        if(i == 4) {
                            return 425;
                        }
                        if(i == 5) {
                            return 410;
                        }
                    }
                    else if (i < 6 && byVar == 'year') {
                        if(i == 0) {
                            return 40;
                        }
                        if(i == 1) {
                            return 360;
                        }
                        if(i == 2) {
                            return 40;
                        }
                        if(i == 3) {
                            return 350;
                        }
                        if(i == 4) {
                            return 40;
                        }
                        if(i == 5) {
                            return 350;
                        }
                    }
                })
                .attr('y',  function (d, i) {
                    if (i < 4 && byVar == 'weeks_on_chart') {
                        if(i == 0) {
                            return 25;
                        }
                        if(i == 1) {
                            return 25;
                        }
                        if(i == 2) {
                            return 370;
                        }
                        if(i == 3) {
                            return 370;
                        }
                    }
                    else if(byVar == 'instance' && i < 6) {
                        if(i == 0) {
                            return 100;
                        }
                        if(i == 1) {
                            return 50;
                        }
                        if(i == 2) {
                            return 175;
                        }
                        if(i == 3) {
                            return 290;
                        }
                        if(i == 4) {
                            return 415;
                        }
                        if(i == 5) {
                            return 500;
                        }
                    }
                    else if (i < 6 && byVar == 'year') {
                        if(i == 0) {
                            return 50;
                        }
                        if(i == 1) {
                            return 50;
                        }
                        if(i == 2) {
                            return 300;
                        }
                        if(i == 3) {
                            return 300;
                        }
                        if(i == 4) {
                            return 410;
                        }
                        if(i == 5) {
                            return 410;
                        }
                    }
                })
                .style("font-size", "22px")
                .style("fill", "#022F89")
                .style("font-weight", "bold")
                .style("font-family", 'Mountains of Christmas')
                .attr('text-anchor', 'middle')
                .text(function (d, i) {
                    if (i < 4 && byVar == 'weeks_on_chart') {
                        if(i == 0) {
                            return '0-5 Weeks';
                        }
                        if(i == 1) {
                            return '6-10 Weeks';
                        }
                        if(i == 2) {
                            return '11-15 Weeks';
                        }
                        if(i == 3) {
                            return '16-20 Weeks';
                        }
                    }
                    else if(i < 6 && byVar == 'instance') {
                        if(i == 0) {
                            return '1st Instance';
                        }
                        if(i == 1) {
                            return '2nd Instance';
                        }
                        if(i == 2) {
                            return '3rd Instance';
                        }
                        if(i == 3) {
                            return '4th Instance';
                        }
                        if(i == 4) {
                            return '5th Instance';
                        }
                        if(i == 5) {
                            return '6th Instance';
                        }
                    }
                    else if(i < 6 && byVar == 'year') {
                        if(i == 0) {
                            return '1958 - 1968';
                        }
                        if(i == 1) {
                            return '1969 - 1978';
                        }
                        if(i == 2) {
                            return '1979 - 1988';
                        }
                        if(i == 3) {
                            return '1989 - 1998';
                        }
                        if(i == 4) {
                            return '1999 - 2008';
                        }
                        if(i == 5) {
                            return '2008 - 2017';
                        }
                    }
                });

            titles.exit().remove()
        }

        // radius scaled according to peak position
        vis.radiusScale = d3.scaleSqrt().domain([1, 100]).range([1, 15])

        vis.forceXWeeks = d3.forceX(function(d) {
            if(d.weeks_on_chart <= 5) {
                return 220;
            }
            else if(d.weeks_on_chart > 5 && d.weeks_on_chart <= 10) {
                return 390 ;
            }
            else if(d.weeks_on_chart > 10 && d.weeks_on_chart <= 15) {
                return 200;
            }
            else if(d.weeks_on_chart > 15 && d.weeks_on_chart <= 20) {
                return 420;
            }
        }).strength(0.06)

        vis.forceYWeeks = d3.forceY(function(d) {
            if(d.weeks_on_chart <= 5) {
                return 220;
            }
            else if(d.weeks_on_chart > 5 && d.weeks_on_chart <= 10) {
                return 220;
            }
            else if(d.weeks_on_chart > 10 && d.weeks_on_chart <= 15) {
                return 350;
            }
            else if(d.weeks_on_chart > 15 && d.weeks_on_chart <= 20) {
                return 375;
            }
        }).strength(0.06)

        vis.forceXDecade = d3.forceX(function(d) {
            if(d.year <= 1968) {
                return 200;
            }
            if(d.year > 1968 && d.year <= 1978) {
                return 400;
            }
            if(d.year > 1978 && d.year <= 1988) {
                return 200;
            }
            if(d.year > 1988 && d.year <= 1998) {
                return 410;
            }
            else if (d.year > 1988 && d.year <= 2008) {
                return 200;
            }
            else {
                return 410;
            }
        }).strength(0.08)

        vis.forceYDecade = d3.forceY(function(d) {
            if(d.year <= 1968) {
                return 200;
            }
            if(d.year > 1968 && d.year <= 1978) {
                return 185;
            }
            if(d.year > 1978 && d.year <= 1988) {
                return 300;
            }
            if(d.year > 1988 && d.year <= 1998) {
                return 330;
            }
            else if (d.year > 1988 && d.year <= 2008) {
                return 400;
            }
            else {
                return 420;
            }
        }).strength(0.08)

        vis.forceXInstance = d3.forceX(function(d) {
            if(d.instance == 1) {
                return 205;
            }
            else if(d.instance == 2) {
                return 400;
            }
            else if(d.instance == 3) {
                return 400;
            }
            else if(d.instance == 4) {
                return 400;
            }
            else if (d.instance == 5) {
                return 400;
            }
            else if(d.instance == 6){
                return 400;
            }
        }).strength(0.073)

        vis.forceYInstance = d3.forceY(function(d) {
            if(d.instance == 1) {
                return 300;
            }
            else if(d.instance == 2) {
                return 150;
            }
            else if(d.instance == 3) {
                return 225;
            }
            else if(d.instance == 4) {
                return 300;
            }
            else if (d.instance == 5) {
                return 375;
            }
            else if(d.instance == 6) {
                return 425;
            }
        }).strength(0.07)

        vis.forceXAll = d3.forceX(vis.width / 2).strength(0.05)
        vis.forceYAll = d3.forceY(vis.height / 2).strength(0.05)

        // the simulation is a collection of forces about where we want our circles to go
        // and how we want them to interact
        vis.simulation = d3.forceSimulation()
            .force('x', vis.forceXAll)
            .force('y', vis.forceYAll)
            .force("collide",d3.forceCollide(function(d){
                return vis.radiusScale(d.peak_position) + 1})
            )
            .force("charge", d3.forceManyBody().strength(function(d){
                return vis.radiusScale(d.peak_position) *-1})
            );

        vis.circles = vis.svg.selectAll("circle")
            .data(vis.christmasSongs)
            .enter().append("circle")
            .attr("class", "song")
            .attr("r", function(d) {
                return vis.radiusScale(d.peak_position);
            })
            .attr("fill", function(d) {
                if (d.weeks_on_chart <= 5) {
                    return vis.circleColors[0]
                }
                if (d.weeks_on_chart > 5 && d.weeks_on_chart <= 10) {
                    return vis.circleColors[1]
                }
                if (d.weeks_on_chart > 10 && d.weeks_on_chart <= 15) {
                    return vis.circleColors[2]
                }
                if (d.weeks_on_chart > 15 && d.weeks_on_chart <= 20) {
                    return vis.circleColors[3]
                }
            })
        // placeholder variable before anything is clicked

        vis.circles
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                //console.log(vis.clickedAll);
                if (vis.clickedAll == 'true'){
                    vis.tooltip
                        .style("opacity", 0.9)
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + "px")
                        .html(`<div style="border: thin solid grey; border-radius: 5px; background: white; padding: 5px;">
                        <h3>Song: <strong>"${d.song.toLowerCase()}"</strong><h3>
                        <h3>Performer: <strong>${d.performer}</strong><h3>
                        <h3>Peak Position: <strong>#${d.peak_position}</strong><h3>
                        <h3>Date on Chart: <strong>${d.weekid}</strong><h3></div>`);
                }
                else if(vis.clickedWeeks == 'true') {
                    // add placeholder before mouseover
                    d3.select(".weeks-fact-placeholder").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em><b>"${d.song.toLowerCase()}"</b></em> by ${d.performer} spent <u>${d.weeks_on_chart} weeks</u> on the chart and reached a peak position of ${d.peak_position}.<p></div>`)
                        .attr("class", 'weeks-fact')
                }
                else if (vis.clickedDecade == 'true') {
                    // add placeholder before mouseover
                    d3.select(".decade-fact-placeholder").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em><b>"${d.song.toLowerCase()}"</b></em> by ${d.performer} appeared on the Billboard chart on <u>${d.weekid}</u> and reached a peak position of ${d.peak_position}.<p></div>`)
                        .attr("class", 'decade-fact')
                }
                else if(vis.clickedInstance == 'true') {
                    d3.select(".instance-fact-placeholder").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em><b>"${d.song.toLowerCase()}"</b></em> by ${d.performer} appears on the chart in the year ${d.year}, its <u>${d.instance} time</u> since its release.<p></div>`)
                        .attr("class", 'instance-fact')
                }
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')

                d3.select(".weeks-fact").remove();
                d3.select(".decade-fact").remove();
                d3.select(".instance-fact").remove();

                if(vis.clickedAll == 'true') {
                    vis.tooltip
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0)
                        .html(``);
                    }
                    // d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em>"all i want for christmas is you"</em> by Mariah Carey spent <u>20 weeks</u> on the chart and reached a peak position of 11.<p></div>`)
                    //     .attr("class", "fact")
            })
        function showText(byVar) {
            if(byVar == 'all') {
                d3.select(".col-4").append('p').text('First, we look at the top songs on the Billboard chart from 1958 through 2017. Since some songs appeared on the chart multiple times, they have more than one bubble.')
                    .attr('class', 'extraStory0')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#B51541');
                d3.select(".col-4").append('p').text('Now, click on the \'By Weeks on Chart\' button to see how many weeks the top songs spent on the chart.')
                    .attr('class', 'extraStory01')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');
            }
            if(byVar == 'weeks_on_chart') {
                d3.select(".col-4").append('p').text('This grouping represents the number of weeks each song spent on the Billboard chart. As we can see, most songs spent between 0 and 5 weeks on it, and those that reached a better peak position were on the chart for longer.')
                    .attr('class', 'extraStory1')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#B51541');
                d3.select(".col-4").append('p').text('Hover over the bubbles to see exactly how many weeks a song spent on the chart!')
                    .attr('class', 'extraStory02')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#B51541');

                // show interesting insight
                // add placeholder before mouseover
                d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em>"all i want for christmas is you"</em> by Mariah Carey spent <u>20 weeks</u> on the chart and reached a peak position of 11.<p></div>`)
                    .attr("class", "weeks-fact-placeholder")
            }
            if(byVar == 'instance') {
                d3.select(".col-4").append('p').text('This grouping represents the number of instances a song has appeared on the chart. Most songs have only appeared once, but some have been on it up to six times!')
                    .attr('class', 'extraStory2')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#B51541');

                // placeholder: interesting insight
                d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em>"all i want for christmas is you"</em> by Mariah Carey appears on the Billboard chart in the year 2017, its <u>6 time</u> since it was released.<p></div>`)
                    .attr("class", "instance-fact-placeholder")
            }
            if(byVar == 'year') {
                d3.select(".col-4").append('p').text("This grouping represents each decade the top songs were on the Billboard chart. It seems that most Christmas songs appeared on the chart in the 1950s through the 1960s, but recently they're making a comeback.")
                    .attr('class', 'extraStory3')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#B51541');

                // placeholder: interesting insight
                d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em>"all i want for christmas is you"</em> by Mariah Carey appeared on the Billboard chart on <u>1/8/2000</u> and reached a peak position of 11.<p></div>`)
                    .attr("class", "decade-fact-placeholder")
            }
        }
        function removeText(byVar) {
            console.log(byVar)
            if(byVar == 'all') {
                d3.select(".instance-fact-placeholder").remove();
                d3.select(".decade-fact-placeholder").remove();
                d3.select(".weeks-fact-placeholder").remove();
                d3.select(".extraStory3").remove();
                d3.select(".extraStory2").remove();
                d3.select(".extraStory1").remove();
                d3.select(".extraStory02").remove();
            }
            if(byVar == 'weeks_on_chart') {
                console.log("got to this point")
                d3.select(".filler1").remove();
                d3.select(".filler2").remove();
                d3.select(".extraStory0").remove();
                d3.select(".extraStory01").remove();
                d3.select(".instance-fact-placeholder").remove();
                d3.select(".decade-fact-placeholder").remove();
                d3.select(".extraStory3").remove();
                d3.select(".extraStory2").remove();
            }
            if(byVar == 'instance') {
                d3.select(".filler1").remove();
                d3.select(".filler2").remove();
                d3.select(".extraStory0").remove();
                d3.select(".extraStory01").remove();
                d3.select(".extraStory1").remove();
                d3.select(".extraStory02").remove();
                d3.select(".decade-fact-placeholder").remove();
                d3.select(".weeks-fact-placeholder").remove();
                d3.select(".extraStory3").remove();
            }
            if(byVar == 'year') {
                d3.select(".filler1").remove();
                d3.select(".filler2").remove();
                d3.select(".extraStory0").remove();
                d3.select(".extraStory01").remove();
                d3.select(".extraStory2").remove();
                d3.select(".extraStory1").remove();
                d3.select(".extraStory02").remove();
                d3.select(".instance-fact-placeholder").remove();
                d3.select(".weeks-fact-placeholder").remove();
            }
        }

        d3.select("#all").on('click', function() {
            // if this button is clicked, change the clickedAll variable to true
            vis.clickedAll = 'true';
            vis.clickedDecade = 'false';
            vis.clickedInstance = 'false';
            vis.clickedWeeks = 'false';
            // d3.select(".col-4").append('p').text('You clicked the All button!');
            // add html
            removeText('all');
            showText('all')
            vis.simulation
                .force('x', vis.forceXAll)
                .force('y', vis.forceYAll)
                .alphaTarget(1)
                .restart()
            hideTitles();
        })
        d3.select("#weeks_on_chart").on('click', function() {
            vis.clickedWeeks = 'true';
            vis.clickedAll = 'false';
            vis.clickedDecade = 'false';
            vis.clickedInstance = 'false';

            removeText('weeks_on_chart');
            showTitles('weeks_on_chart')
            showText('weeks_on_chart')
            vis.simulation
                .force('x', vis.forceXWeeks)
                .force('y', vis.forceYWeeks)
                .alphaTarget(1)
                .restart()
        })
        d3.select("#year").on('click', function() {
            vis.clickedDecade = 'true';
            vis.clickedAll = 'false';
            vis.clickedInstance = 'false';
            vis.clickedWeeks = 'false';
            removeText('year');
            vis.simulation
                .force('x', vis.forceXDecade)
                .force('y', vis.forceYDecade)
                .alphaTarget(1)
                .restart()
            showTitles('year')
            showText('year')
        })
        d3.select("#instance").on('click', function() {
            vis.clickedInstance = 'true';
            vis.clickedDecade = 'false';
            vis.clickedWeeks = 'false';
            vis.clickedAll = 'false';
            removeText('instance');
            vis.simulation
                .force('x', vis.forceXInstance)
                .force('y', vis.forceYInstance)
                .alphaTarget(1)
                .restart()
            showTitles('instance')
            showText('instance')
        })

        vis.simulation.nodes(vis.christmasSongs)
            .on('tick', ticked)

        function ticked() {
            vis.circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                })
        }
    }
}