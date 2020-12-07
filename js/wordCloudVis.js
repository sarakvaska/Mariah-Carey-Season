class WordCloudVis {

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.fullLyricData = data;
        this.filteredData = [];
        this.displayData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.fillerWords = ["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your","ain't","aren't","can't","could've","couldn't","didn't","doesn't","don't","hasn't","he'd","he'll","he's","how'd","how'll","how's","i'd","i'll","i'm","i've","isn't","it's","might've","mightn't","must've","mustn't","shan't","she'd","she'll","she's","should've","shouldn't","that'll","that's","there's","they'd","they'll","they're","they've","wasn't","we'd","we'll","we're","weren't","what'd","what's","when'd","when'll","when's","where'd","where'll","where's","who'd","who'll","who's","why'd","why'll","why's","won't","would've","wouldn't","you'd","you'll","you're","you've"];

        vis.transitionTime = 2000;
        vis.firstLoad = true;

        vis.wrangleData();

    }

    wrangleData(artist = false) {
        let vis = this;
        // artist = "Bobby Helms";
        console.log("CLOUD WRANGLING");

        // Filter all lyric text by artist
        vis.filteredData = artist ? vis.fullLyricData.filter(d => d.performer === artist) : vis.fullLyricData;

        // Create an array of words from the lyric text
        let lyricText = '';
        console.log("FILTEREDDATA WORDCLOUD = ", vis.filteredData);
        console.log("fullLyricData WORDCLOUD = ", vis.fullLyricData);
        vis.filteredData.forEach(d => {
            lyricText += d.lyrics + " ";
        });
        let lyricCleanedArray = lyricText.toLowerCase().match(/\b[\w']+\b/g);

        // Create word list with count from filtered array of words
        let lyricWordCountMap = new Map();
        lyricCleanedArray.forEach(word => {
            lyricWordCountMap.has(word) ? lyricWordCountMap.set(word, (lyricWordCountMap.get(word) + 1)) : lyricWordCountMap.set(word, 1);
        });
        let lyricWordCountArray = Array.from(lyricWordCountMap, ([word, count]) => ({ word, count }));
        // Sort array
        lyricCountUnfiltered = lyricWordCountArray.sort( (a,b) => b.count - a.count);
        // Remove filler words
        vis.displayData = lyricCountUnfiltered.filter(d => !vis.fillerWords.includes(d.word));

        console.log('js pre-process wordCloud', vis.displayData);

        // Structure data for word cloud
        vis.displayData = vis.displayData.map( d => {
            let object = {};
            object.word = d.word;
            object.value = d.count;
            return object;
        });
        console.log('js final data structure for wordCloud', vis.displayData);

        updateInputDiv(lyricCountUnfiltered, vis.displayData);

        vis.updateVis()
    }


    updateVis() {
        let vis = this;

        // Get top 10 words
        vis.top100Data = vis.displayData.slice(0, 100);

        // Themes begin
        // am4core.useTheme(am4themes_animated);

        // Create chart
        let chart = am4core.create("wordCloudDiv", am4plugins_wordCloud.WordCloud);
        // chart.fontFamily = "Mountains of Christmas";

        // Create series
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.randomness = 0.1;
        series.rotationThreshold = 0.5;

        // Add data
        series.data = vis.top100Data;
        series.dataFields.word = "word";
        series.dataFields.value = "value";

        series.heatRules.push({
            "target": series.labels.template,
            "property": "fill",
            "min": am4core.color("white"),
            "max": am4core.color("#dc0202"),
            "dataField": "value"
        });
        series.minFontSize = am4core.percent(5);
        series.maxFontSize = am4core.percent(40);

        series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";

        let subtitle = chart.titles.create();
        subtitle.text = "(hover over words for frequency, and change the artist using the dropdown below)";

        let title = chart.titles.create();
        title.text = "What are the most popular words used in Billboard Christmas hits?";
        title.fontSize = "2rem";
        title.fontWeight = "bold";
        title.textDecoration = "underline";


        vis.firstLoad = false;
    }

}