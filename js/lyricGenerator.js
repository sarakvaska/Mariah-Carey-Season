let url = "https://christmas-lyrics-script.nn.r.appspot.com/new";

function generateLyrics(event) {

    console.log(event)
    event.preventDefault();

    console.log("Running generateLyrics()");

    // Unhide lyric elements
    let lyricDiv1 = document.getElementById("lyricDiv1");
    lyricDiv1.style.visibility = "visible";

    let lyricDiv2 = document.getElementById("lyricDiv2");
    lyricDiv2.style.visibility = "visible";

    let lyricDiv3 = document.getElementById("lyricDiv3");
    lyricDiv3.style.visibility = "visible";

    let lyricDiv4 = document.getElementById("lyricDiv4");
    lyricDiv4.style.visibility = "visible";

    fetch(url)
        .then(response => response.text())
        .then(lyric => {
            let formattedLyricArr = lyric
                .replace(/ ill /g, " I'll ")
                .replace(/ i /g, " I ")
                .replace(/ christ /g, " Christ ")
                .replace(/ everythings /g, " everything's ")
                .replace(/ its /g, " it's ")
                .replace(/ christmas /g, " Christmas ")
                .replace(/ ill /g, " I'll ")
                .replace(/ youre /g, " you're ")
                .replace(/ theyre /g, " they're ")
                .replace(/ theres /g, " there's ")
                .replace(/ cant /g, " can't ")
            formattedLyricArr = (formattedLyricArr.charAt(0).toUpperCase() +
                formattedLyricArr.slice(1))
                .split(" ");

            let line1 = formattedLyricArr.slice(0,6).join(" ");
            let line2 = formattedLyricArr.slice(6,15).join(" ");
            let line3 = formattedLyricArr.slice(15,22).join(" ");
            let line4 = formattedLyricArr.slice(22,30).join(" ");

            // console.log("line1 = ", line1);
            // console.log("line2 = ", line2);
            // console.log("line3 = ", line3);
            // console.log("line4 = ", line4);
            // console.log("LYRIC = ", lyric);

            // Fill in lyrics
            lyricDiv1.innerHTML = line1;
            lyricDiv2.innerHTML = line2;
            lyricDiv3.innerHTML = line3;
            lyricDiv4.innerHTML = line4;

        });
}


// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         // Typical action to be performed when the document is ready:
//         // document.getElementById("demo").innerHTML = xhttp.responseText;
//         console.log("RESPONSE = ", xhttp.responseText)
//     }
// };
// xhttp.open("GET", "https://christmas-lyrics-script.nn.r.appspot.com/new", true);
// // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
// xhttp.send();

// fetch("https://christmas-lyrics-script.nn.r.appspot.com/new")
//     .then(response => response.json())
//     .then(response => response.json())
//     .then(lyric => console.log("LYRIC = ",lyric));
//
//
// fetch(url, function(d){
//     console.log(d)
// })
//     .then(response => response.json())
//     .then(data => { gettingStarted(data)});
