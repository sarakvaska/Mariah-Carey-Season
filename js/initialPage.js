class InitialPage {
    // constructor method to initialize initial visualization
    constructor(parentElement, christmasSongs, group, unique) {
        this.parentElement = parentElement;
        this.christmasSongs = christmasSongs;
        this.group = group;
        this.highestInstances = unique;
        //this.circleColors = ['#D8D8D8','#237249','#E40010', '#B3000C'];
        //this.circleColors = ['#f0f9e8','#bae4bc','#7bccc4', '#2b8cbe'];
        //this.circleColors = ['#f1eef6', '#d7b5d8', '#df65b0', '#ce1256'];
        // this.circleColors = ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'];
        this.circleColors = ['#fee5d9', '#fcae91', '#ec746a', '#cb181d'];
        //this.circleColors = ['#edf8e9', '#bae4b3', '#74c476', '#238b45'];
        this.clickedWeeks = 'false';
        this.clickedDecade = 'false';
        this.clickedAll = 'true';
        this.clickedInstance = 'false';

        this.initVis()
    }

    initVis() {
        let vis = this;
        //console.log(vis.christmasSongs)
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

        function showTitles(byVar, groupNumber) {
            vis.titles = vis.svg.selectAll('.title')
                .data(vis.christmasSongs)

            vis.titles.enter().append('text')
                .attr('class', 'title')
                .merge(vis.titles)
                .attr('x', function (d, i) {
                    if (i < 4 && byVar == 'weeks_on_chart') {
                        if(i == 0) {
                            return 140;
                        }
                        if(i == 1) {
                            return 410;
                        }
                        if(i == 2) {
                            return 140;
                        }
                        if(i == 3) {
                            return 410;
                        }
                    }
                    else if(i < 6 && byVar == 'instance') {
                        if(i == 0) {
                            return 120;
                        }
                        if(i == 1) {
                            return 340;
                        }
                        if(i == 2) {
                            return 400;
                        }
                        if(i == 3) {
                            return 420;
                        }
                        if(i == 4) {
                            return 415;
                        }
                        if(i == 5) {
                            return 380;
                        }
                    }
                    else if (i < 6 && byVar == 'year') {
                        if(i == 0) {
                            return 130;
                        }
                        if(i == 1) {
                            return 400;
                        }
                        if(i == 2) {
                            return 130;
                        }
                        if(i == 3) {
                            return 400;
                        }
                        if(i == 4) {
                            return 130;
                        }
                        if(i == 5) {
                            return 400;
                        }
                    }
                })
                .attr('y',  function (d, i) {
                    if (i < 4 && byVar == 'weeks_on_chart') {
                        if(i == 0) {
                            return 170;
                        }
                        if(i == 1) {
                            return 170;
                        }
                        if(i == 2) {
                            return 430;
                        }
                        if(i == 3) {
                            return 430;
                        }
                    }
                    else if(byVar == 'instance' && i < 6) {
                        if(i == 0) {
                            return 310;
                        }
                        if(i == 1) {
                            return 70;
                        }
                        if(i == 2) {
                            return 175;
                        }
                        if(i == 3) {
                            return 310;
                        }
                        if(i == 4) {
                            return 440;
                        }
                        if(i == 5) {
                            return 540;
                        }
                    }
                    else if (i < 6 && byVar == 'year') {
                        if(i == 0) {
                            return 160;
                        }
                        if(i == 1) {
                            return 160;
                        }
                        if(i == 2) {
                            return 330;
                        }
                        if(i == 3) {
                            return 330;
                        }
                        if(i == 4) {
                            return 470;
                        }
                        if(i == 5) {
                            return 470;
                        }
                    }
                })
                .style("font-size", "25px")
                .style("fill", "white")
                .style("font-family", 'Mountains of Christmas')
                .style('text-shadow', ' -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black')
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
                })
                .on('mouseover', function(event, d) {
                    d3.select(this).style('visibility', 'hidden')
                })
                .on('mouseout', function(event, d) {
                    d3.select(this).transition().delay(2000).style('visibility', 'visible')
                })

            vis.titles.exit().remove()
        }

        function hideTitles() {
            vis.svg.selectAll('.title').remove();
        }

        vis.radiusScale = d3.scaleSqrt().domain([0, 1/7]).range([1, 30])

        vis.forceXWeeks = d3.forceX(function(d) {
            if(d.weeks_on_chart <= 5) {
                return 220;
            }
            else if(d.weeks_on_chart > 5 && d.weeks_on_chart <= 10) {
                return 390 ;
            }
            else if(d.weeks_on_chart > 10 && d.weeks_on_chart <= 15) {
                return 220;
            }
            else if(d.weeks_on_chart > 15 && d.weeks_on_chart <= 20) {
                return 400;
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
                return 210;
            }
            if(d.year > 1988 && d.year <= 1998) {
                return 400;
            }
            else if (d.year > 1988 && d.year <= 2008) {
                return 210;
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
                return 200;
            }
            if(d.year > 1978 && d.year <= 1988) {
                return 300;
            }
            if(d.year > 1988 && d.year <= 1998) {
                return 350;
            }
            else if (d.year > 1988 && d.year <= 2008) {
                return 420;
            }
            else {
                return 430;
            }
        }).strength(0.08)

        vis.forceXInstance = d3.forceX(function(d) {
            if(d.instance == 1) {
                return 190;
            }
            else if(d.instance == 2) {
                return 300;
            }
            else if(d.instance == 3) {
                return 320;
            }
            else if(d.instance == 4) {
                return 330;
            }
            else if (d.instance == 5) {
                return 340;
            }
            else if(d.instance == 6){
                return 335;
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
                return 215;
            }
            else if(d.instance == 4) {
                return 300;
            }
            else if (d.instance == 5) {
                return 375;
            }
            else if(d.instance == 6) {
                return 440;
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
                return vis.radiusScale(1/d.peak_position)})
            )
            .force("charge", d3.forceManyBody().strength(function(d){
                return vis.radiusScale(1/d.peak_position) * -1.50})
            );

        vis.circles = vis.svg.selectAll("circle")
            .data(vis.christmasSongs)
            .enter().append("circle")
            .attr("class", "song")
            .attr("r", function(d) {
                return vis.radiusScale(1/d.peak_position);
            })
            .attr("fill", function(d) {
                if (d.weeks_on_chart <= 5) {
                    return vis.circleColors[0]
                    //return "url(#img/exampleOrnament.png)"
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

        vis.circles
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                if (d.instance == 1) {
                    vis.keyWord = 'first'
                }
                else if (d.instance == 2) {
                    vis.keyWord = 'second'
                }
                else if (d.instance == 3) {
                    vis.keyWord = 'third'
                }
                else if (d.instance == 4) {
                    vis.keyWord = 'fourth'
                }
                else if (d.instance == 5) {
                    vis.keyWord = 'fifth'
                }
                else if (d.instance == 6) {
                    vis.keyWord = 'sixth'
                }
                if(d.performer == 'Ariana Grande') {
                    vis.newText = 'LASTCHRISTMASARIANA.jpg'
                }
                else if(d.performer == 'Wham!') {
                    vis.newText = 'LASTCHRISTMASWHAM!.jpg'
                }
                else if(d.performer == 'Michael Buble' && d.song == 'ALL I WANT FOR CHRISTMAS IS YOU') {
                    vis.newText = 'ALLIWANTFORCHRISTMASISYOUMICHAELBUBLE.jpg'
                }
                else if(d.performer == 'The Drifters Featuring Clyde McPhatter And Bill Pinkney') {
                    vis.newText = 'WHITECHRISTMASDRIFTERS.jpg'
                }
                else if(d.performer == 'Colbie Caillat') {
                    vis.newText = 'MISTLETOECOLBIE.jpg'
                }
                else {
                    vis.newText = d.song.split(" ").join("") + '.jpg'
                    vis.newText = vis.newText.replace(/\?/g, '');
                }
                vis.yourImagePath = vis.newText
                if (vis.clickedAll == 'true'){
                    d3.select(".col-4").append('p').html(`<div><p style="font-size: 25px; color:black; margin-right: 70px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding:5px;"><b style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/${vis.yourImagePath}" /> "${d.song.toLowerCase()}"</b> by ${d.performer} reached a peak position of <b>${d.peak_position}</b> in <b>${d.year}</b>, its ${vis.keyWord} time on the chart.<p>`)
                        .attr("class", 'weeks-all')
                }
                else if(vis.clickedWeeks == 'true') {
                    if(d.weeks_on_chart > 1) {
                        vis.weeksWord = 'weeks';
                    }
                    else {
                        vis.weeksWord = 'week'
                    }
                    // add placeholder before mouseover
                    d3.select(".extraStory6").remove();
                    d3.selectAll('bounce arrow').remove();
                    d3.select(".weeks-fact-placeholder").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><em><b  style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/${vis.yourImagePath}" /> "${d.song.toLowerCase()}"</b></em> by ${d.performer} spent <u>${d.weeks_on_chart} ${vis.weeksWord}</u> on the chart in ${d.year} and reached a peak position of ${d.peak_position}.<p>`)
                        .attr("class", 'weeks-fact')
                }
                else if (vis.clickedDecade == 'true') {
                    // add placeholder before mouseover
                    d3.select(".decade-fact-placeholder").remove();
                    d3.select(".extraStory4").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><em><b  style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/${vis.yourImagePath}" /> "${d.song.toLowerCase()}"</b></em> by ${d.performer} appeared on the Billboard chart <u>${d.weekid}</u> and reached a peak position of ${d.peak_position}.<p>`)
                        .attr("class", 'decade-fact')
                }
                else if(vis.clickedInstance == 'true') {
                    d3.selectAll('.bounce arrow').remove();
                    d3.select(".extraStory5").remove();
                    d3.select(".instance-fact-placeholder").remove();
                    d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><em><b  style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/${vis.yourImagePath}" /> "${d.song.toLowerCase()}"</b></em> by ${d.performer} appeared on the chart in ${d.year}, its <u>${vis.keyWord} time</u> since it was released.<p>`)
                        .attr("class", 'instance-fact')
                }
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')

                d3.select(".weeks-all").remove();
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
                if(vis.clickedDecade == 'true') {
                    d3.select(".col-4").append('p').text("Now that we've thoroughly explored the top Christmas music of the late 1950s through the 2000s, lets take a look at the specific years where they were most successful!")
                        .attr('class', 'extraStory4')
                        .style('margin-top', '10px')
                        .style('margin-right', '75px')
                        .style('width', '700px')
                        .style('text-align', 'center')
                        .style('color', '#237249');
                }
                if(vis.clickedInstance == 'true') {
                    d3.select(".col-4").append('p').text("Next, click on 'By Decade' to explore the songs through the decades.")
                        .attr('class', 'extraStory5')
                        .style('margin-top', '10px')
                        .style('margin-right', '75px')
                        .style('width', '700px')
                        .style('text-align', 'center')
                        .style('color', '#237249');
                }
                if(vis.clickedWeeks == 'true') {
                    d3.select(".col-4").append('p').text("Next, click on 'By Instance' to see how many times each song topped the charts.")
                        .attr('class', 'extraStory6')
                        .style('margin-top', '10px')
                        .style('margin-right', '75px')
                        .style('width', '700px')
                        .style('text-align', 'center')
                        .style('color', '#237249');

                }
                    // d3.select(".col-4").append('p').html(`<p style="font-size: 24px; color:#237249; margin-right: 75px; width: 700px; text-align: center;"><em>"all i want for christmas is you"</em> by Mariah Carey spent <u>20 weeks</u> on the chart and reached a peak position of 11.<p></div>`)
                    //     .attr("class", "fact")
            })

        function showText(byVar) {
            if(byVar == 'all') {
                d3.select(".col-4").append('p').text('First, we look at the top songs on the Billboard chart from 1958 through 2017.')
                    .attr('class', 'extraStory0')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');
                d3.select(".col-4").append('p').text('Click through each button to see how many weeks the top songs spent on the chart, the number of times they appeared, and the decades they topped.')
                    .attr('class', 'extraStory01')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');
            }
            if(byVar == 'weeks_on_chart') {
                d3.select(".col-4").append('p').text('Most songs spent fewer weeks on the chart, but those that reached a higher peak position were on the chart for longer.')
                    .attr('class', 'extraStory1')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');

                // show interesting insight
                // add placeholder before mouseover
                d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><b style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/ALLIWANTFORCHRISTMASISYOU.jpg"/>"all i want for christmas is you"</b> by Mariah Carey spent <u>20 weeks</u> on the chart and reached a peak position of 11.<p></div>`)
                    .attr("class", "weeks-fact-placeholder")
            }
            if(byVar == 'instance') {
                d3.select(".col-4").append('p').text('Most songs have only appeared on the Billboard chart one time, but the most popular have been on it up to six times!')
                    .attr('class', 'extraStory2')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');

                // placeholder: interesting insight
                d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><b style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/ALLIWANTFORCHRISTMASISYOU.jpg" />"all i want for christmas is you"</b> by Mariah Carey appeared on the Billboard chart in 2016, its <u>sixth time</u> since it was released.<p></div>`)
                    .attr("class", "instance-fact-placeholder")
            }
            if(byVar == 'year') {
                d3.select(".col-4").append('p').text("Most Christmas songs appeared on the chart in the fifties and sixties, but recently they're making a comeback.")
                    .attr('class', 'extraStory3')
                    .style('margin-top', '120px')
                    .style('margin-right', '75px')
                    .style('width', '700px')
                    .style('text-align', 'center')
                    .style('color', '#237249');

                // placeholder: interesting insight
                d3.select(".col-4").append('p').html(`<p style="font-size: 22px; color:black; margin-right: 75px; width: 700px; text-align: center; border:thin solid black; border-radius: 5px; background:rgba(255, 255, 255, 0.9); padding: 5px;"><b style="color: #B3000C"><img style="width:100px; height:100px; border:thin solid black; border-radius: 5px; float: left" src="img/ALLIWANTFORCHRISTMASISYOU.jpg"/> "all i want for christmas is you"</b> by Mariah Carey appeared on the Billboard chart on <u>1/8/00</u> and reached a peak position of 11.<p></div>`)
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
                d3.select(".extraStory4").remove();
                d3.select(".extraStory5").remove();
                d3.select(".extraStory6").remove();
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
                d3.select(".extraStory4").remove();
                d3.select(".extraStory5").remove();
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
                d3.select(".extraStory4").remove();
                d3.select(".extraStory6").remove();
            }
            if(byVar == 'year') {
                d3.select(".filler1").remove();
                d3.select(".filler2").remove();
                d3.select(".extraStory0").remove();
                d3.select(".extraStory01").remove();
                d3.select(".extraStory5").remove();
                d3.select(".extraStory2").remove();
                d3.select(".extraStory1").remove();
                d3.select(".extraStory02").remove();
                d3.select(".extraStory6").remove();
                d3.select(".instance-fact-placeholder").remove();
                d3.select(".weeks-fact-placeholder").remove();
            }
        }

        d3.select("#all").on('click', function() {
            if(vis.clickedAll != 'true') {
                // if this button is clicked, change the clickedAll variable to true
                vis.clickedAll = 'true';
                vis.clickedDecade = 'false';
                vis.clickedWeeks = 'false';
                vis.clickedInstance = 'false';
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
            }
        })
        d3.select("#weeks_on_chart").on('click', function() {
            if(vis.clickedWeeks != 'true') {
                vis.clickedWeeks = 'true';
                vis.clickedAll = 'false';
                vis.clickedInstance = 'false';
                vis.clickedDecade = 'false';

                removeText('weeks_on_chart');
                showTitles('weeks_on_chart')
                showText('weeks_on_chart')
                vis.simulation
                    .force('x', vis.forceXWeeks)
                    .force('y', vis.forceYWeeks)
                    .alphaTarget(1)
                    .restart()
            }
        })
        d3.select("#year").on('click', function() {
            if(vis.clickedDecade != 'true') {
                vis.clickedDecade = 'true';
                vis.clickedAll = 'false';
                vis.clickedWeeks = 'false';
                vis.clickedInstance = 'false';
                removeText('year');
                vis.simulation
                    .force('x', vis.forceXDecade)
                    .force('y', vis.forceYDecade)
                    .alphaTarget(1)
                    .restart()
                showTitles('year')
                showText('year')
            }
        })
        d3.select("#instance").on('click', function() {
            if (vis.clickedInstance != 'true') {
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
            }
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