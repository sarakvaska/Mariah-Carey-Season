# Mariah-Carey-Season
CS171 Final Project

Visualizing the elements of Christmas Music over time, and of course Christmas Music's most legendary artist: Mariah Carey!

To see our (in progress) project visit: https://sarakvaska.github.io/Mariah-Carey-Season/


The structure of our project:

/css: 
  - jquery.pagepiling.css: the plugin we used to create a stacked layout
  - style.css: general css for the entire website
  
/data: 
  - birthplace_of_christmas.csv: includes geographic information about where the top musicians are from
  - birthyearSongs.csv, christmas_songs_birthday.csv: contains song information specific to year
  - brenda_weekly.csv, 
  - christmas_lyrics.tsv: christmas lyrics pertaining to the christmas songs
  - christmas_songs.csv, christmas_songs_with_lyrics.csv: lists of all the top christmas songs
  - christmas_songs_noDupes.csv: contains a list of the top christmas music without repeats
  - combined_weekly.csv: data of the top songs on the chart by week
  - locations.json: location data
  - mariah_weekly.csv: data specific to mariah's rankings 
  - michael_weekly.csv: data specific to michael buble's rankings
  - wham_weekly.csv: data specific to Wham's rankings
  - world.json: json data to create a world map

/img: 
  - all the images we used in our project, including album covers and artist images
  
/js:
  - globalStreamsVis.js: line chart visualization of the global mariah streams
  - streamVis.js: area chart visualization for mariah streams
  - initialPage.js: the bubble chart visualization
  - jquery.pagepiling.js: the javascript for our pagepiling plugin
  - lyricGenerator.js: our lyric generator code
  - main.js: main javascript file
  - mapVis.js: the globe visualization
  - wordCloudVis.js: wordcloud code
  - wordCountBarVis.js: bar chart code
  
  /index.html: all of the html for our website
