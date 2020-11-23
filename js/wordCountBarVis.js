/* * * * * * * * * * * * * *
*      class WordCountBarVis        *
* * * * * * * * * * * * * */


class WordCountBarVis {

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.fullLyricData = data;
        this.filteredData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.fillerWords = ["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your","ain't","aren't","can't","could've","couldn't","didn't","doesn't","don't","hasn't","he'd","he'll","he's","how'd","how'll","how's","i'd","i'll","i'm","i've","isn't","it's","might've","mightn't","must've","mustn't","shan't","she'd","she'll","she's","should've","shouldn't","that'll","that's","there's","they'd","they'll","they're","they've","wasn't","we'd","we'll","we're","weren't","what'd","what's","when'd","when'll","when's","where'd","where'll","where's","who'd","who'll","who's","why'd","why'll","why's","won't","would've","wouldn't","you'd","you'll","you're","you've"];

        vis.transitionTime = 2000;
        vis.firstLoad = true;

        vis.margin = {top: 20, right: 10, bottom: 20, left: 40};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text("Test title")
            .attr('transform', `translate(${vis.width / 2}, 10)`)
            .attr('text-anchor', 'middle');

        // Scales and axes
        vis.x = d3.scaleBand()
            .range([0, vis.width])
            .round(true)
            .paddingInner(0.05);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x)
            .tickSize(1);

        vis.yAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis");

        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        // Add tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip');

        this.wrangleData();
    }

    wrangleData(artist = false){
        let vis = this;
        // artist = "Bobby Helms";

        // Filter all lyric text by artist
        vis.filteredData = artist ? vis.fullLyricData.filter(d => d.performer === artist) : vis.fullLyricData;
        // vis.filteredData = artist ? vis.fullLyricData.filter(d => d.artist === artist) : vis.fullLyricData;
        console.log("fullLyricData = ", vis.fullLyricData);
        console.log("filteredData = ", vis.filteredData);

        // Create an array of words from the lyric text
        let lyricText = '';
        vis.filteredData.forEach(d => {
            lyricText += d.lyrics + " ";
            // lyricText += d.track_n.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "") + " ";
        });
        let lyricCleanedArray = lyricText.toLowerCase().match(/\b[\w']+\b/g);
        // console.log("lyricCleanedArray = ", lyricCleanedArray);

        // Create word list with count from filtered array of words
        let lyricWordCountMap = new Map();
        lyricCleanedArray.forEach(word => {
            lyricWordCountMap.has(word) ? lyricWordCountMap.set(word, (lyricWordCountMap.get(word) + 1)) : lyricWordCountMap.set(word, 1);
        });
        let lyricWordCountArray = Array.from(lyricWordCountMap, ([word, count]) => ({ word, count }));
        orderedlyricWordCountArr = lyricWordCountArray.sort( (a,b) => b.count - a.count);
        vis.displayData = orderedlyricWordCountArr.filter(d => !vis.fillerWords.includes(d.word));

        console.log('js final data structure', vis.displayData);

        updateInputDiv(orderedlyricWordCountArr, vis.displayData);

        vis.updateVis()

    }

    updateVis(word = false) {
        let vis = this;

        // Get top 10 words
        vis.topTenData = vis.displayData.slice(0, 10);

        // Add the user input word as #11
        let inputWordInLyricData = orderedlyricWordCountArr.find(d => d.word === word);
        word && inputWordInLyricData ? vis.topTenData.push(inputWordInLyricData) : null;
        console.log("vis.topTenData = ", vis.topTenData);

        // Update axes
        vis.y.domain([0, d3.max(vis.topTenData, d => d.count)]);
        vis.x.domain(vis.topTenData.map( d => d.word));


        // Draw bars
        // Data-join
        vis.bars = vis.svg.selectAll(".bars")
            .data(vis.topTenData);

        // Enter (initialize the newly added elements)
        vis.bars.enter().append("rect")
            .attr("class", "bars")
            .on('mouseover', function(event, d){
                // Selects the current bar, recolors it, and draws an outline around it
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'white')
                    .style("fill", "lightblue");

                // Modify the tooltip (move to mouse position and display info)
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                             <h4>${d.word}<h3>
                             <h6># of times used: ${d.count.toLocaleString("en")}</h6>
                         </div>`);
            })
            .on('mouseout', function(event, d){
                // Updates the current bar (removes outline, resets color)
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .style("fill", "#093252");

                // Updates the tooltip (disappears and removes the element))
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })

            // Update all bars
            .merge(vis.bars)
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .attr("x", d => vis.x(d.word))
            .attr("y", d => (vis.y(d.count)))
            .attr("width", vis.x.bandwidth())
            .attr("height", d => (vis.height - vis.y(d.count)))
            .attr("fill", "#093252");

        vis.svg.selectAll(".bars").on("click", (event, data) => console.log(data));

        vis.bars.exit().remove();

        // Call axis
        vis.yAxisGroup
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .call(vis.yAxis);


        vis.xAxisGroup
            .transition()
            .duration(vis.firstLoad ? 0 : vis.transitionTime)
            .style("font", "9px times")
            .call(vis.xAxis);

        vis.firstLoad = false;
    }

}

