let url = "https://christmas-lyrics-script.nn.r.appspot.com/new";

let wordCountBarVis, orderedlyricWordCountArr;

let loadingSpinner = `<div class="row justify-content-center">
                    <div class="loader">
                        <div class="face">
                            <div class="circle"></div>
                        </div>
                        <div class="face">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>`;

let lyricElements = `                <div class="row justify-content-center lyricLine">
                    <h3><div class="goo" contenteditable="true" id="lyricDiv1">Writing</div></h3>
                </div>

                <div class="row justify-content-center lyricLine">
                    <h3><div class="goo" contenteditable="true" id="lyricDiv2">your</div></h3>
                </div>

                <div class="row justify-content-center lyricLine">
                    <h3><div class="goo" contenteditable="true" id="lyricDiv3">unique</div></h3>
                </div>

                <div class="row justify-content-center lyricLine">
                    <h3><div class="goo" contenteditable="true" id="lyricDiv4">song...</div></h3>
                </div>`;

// let lyricBank = "jingle bell, jingle bell, jingle bell rock Jingle bells swing and jingle bells ring Snowin' and blowin' up bushels of fun Now, the jingle hop has begun Jingle bell, jingle bell, jingle bell rock Jingle bells chime in jingle bell time Dancin' and prancin' in Jingle Bell Square In the frosty air What a bright time, it's the right time To rock the night away Jingle bell time is a swell time To go glidin' in a one-horse sleigh Giddy-up jingle horse, pick up your feet Jingle around the clock Mix and a-mingle in the jinglin' feet That's the jingle bell rock Jingle bell, jingle bell, jingle bell rock Jingle bells chime in jingle bell time Dancin' and prancin' in Jingle Bell Square In the frosty air What a bright time, it's the right time To rock the night away Jingle bell time is a swell time To go glidin' in a one-horse sleigh Giddy-up jingle horse, pick up your feet Jingle around the clock Mix and a-mingle in the jinglin' feet That's the jingle bell That's the jingle bell That's the jingle bell rock Silent night, holy night all is calm, all is bright Round yon virgin, mother and child Holy infant so tender and mild Sleep in heavenly peace, sleep in heavenly peace Silent night, holy night all is calm, all is bright Round yon virgin, mother and child Holy infant so tender and mild Sleep in heavenly peace, sleep in heavenly peace Adeste fideles Laeti triumphantes Venite, venite in ";
// console.log("lyricBank = ", lyricBank);
//
// let lyricBankArr = lyricBank.toLowerCase().match(/\b[\w']+\b/g);
// console.log("lyricBankArr = ", lyricBankArr);
//
// let lyricMap = new Map();
// lyricBankArr.forEach(word => {
//     lyricMap.has(word) ? lyricMap.set(word, (lyricMap.get(word) + 1)) : lyricMap.set(word, 1);
// });
// let lyricWordCountArr = Array.from(lyricMap, ([word, count]) => ({ word, count }));
// console.log("lyricMap = ", lyricMap);
// let orderedlyricWordCountArr = lyricWordCountArr.sort( (a,b) => b.count - a.count);
// console.log("orderedlyricWordCountArr = ", orderedlyricWordCountArr);
//
// wordCountBarVis = new WordCountBarVis("wordCountBarDiv", orderedlyricWordCountArr);

d3.text("data/christmas_lyrics.txt").then(data => {
    console.log("LYRICS TEXT = ", data);
    let lyricBank = data;
    console.log("lyricBank = ", lyricBank);

    let lyricBankArr = lyricBank.toLowerCase().match(/\b[\w']+\b/g);
    console.log("lyricBankArr = ", lyricBankArr);

    let lyricMap = new Map();
    lyricBankArr.forEach(word => {
        lyricMap.has(word) ? lyricMap.set(word, (lyricMap.get(word) + 1)) : lyricMap.set(word, 1);
    });
    let lyricWordCountArr = Array.from(lyricMap, ([word, count]) => ({ word, count }));
    console.log("lyricMap = ", lyricMap);
    orderedlyricWordCountArr = lyricWordCountArr.sort( (a,b) => b.count - a.count);
    console.log("orderedlyricWordCountArr = ", orderedlyricWordCountArr);

    updateTextDiv();

    wordCountBarVis = new WordCountBarVis("wordCountBarDiv", orderedlyricWordCountArr);
});


function generateLyrics(event) {

    let lyricInnerContainerDiv = document.getElementById("lyricInnerContainer");
    lyricInnerContainerDiv.innerHTML = loadingSpinner;

    console.log(event);
    event.preventDefault();

    console.log("Running generateLyrics()");

    // Unhide lyric elements
    // let lyricDiv1 = document.getElementById("lyricDiv1");
    // lyricDiv1.style.visibility = "visible";
    //
    // let lyricDiv2 = document.getElementById("lyricDiv2");
    // lyricDiv2.style.visibility = "visible";
    //
    // let lyricDiv3 = document.getElementById("lyricDiv3");
    // lyricDiv3.style.visibility = "visible";
    //
    // let lyricDiv4 = document.getElementById("lyricDiv4");
    // lyricDiv4.style.visibility = "visible";

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
                .replace(/ wont /g, " won't ")
                .replace(/ santas /g, " santa's ")
                .replace(/ theyll /g, " they'll ")
                .replace(/ dont /g, " don't ")
                .replace(/ youre /g, " you're ")
                .replace(/ theyre /g, " they're ")
                .replace(/ theres /g, " there's ")
                .replace(/ cant /g, " can't ")
            formattedLyricArr = (formattedLyricArr.charAt(0).toUpperCase() +
                formattedLyricArr.slice(1))
                .split(" ");

            lyricInnerContainerDiv.innerHTML = lyricElements;

            let line1 = formattedLyricArr.slice(0,6).join(" ");
            let line2 = formattedLyricArr.slice(6,15).join(" ");
            let line3 = formattedLyricArr.slice(15,22).join(" ");
            let line4 = formattedLyricArr.slice(22,31).join(" ");

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

        })
        .catch( function (err){
            console.log(err);
            lyricInnerContainerDiv.innerHTML = lyricElements;
        });
}


function onTextChanged() {
    // console.log("data = ", event);
    let inputElement = document.getElementById("inputDiv");
    let inputText = inputElement.value
    console.log("input = ", inputText);
    updateTextDiv(inputText);
}

function updateTextDiv(input = '') {
    let allWordsDiv = document.getElementById("scrollDiv");
    // allWordsDiv.innerHTML = orderedlyricWordCountArr.word.toString();
    let allWordsDivList = orderedlyricWordCountArr;
    input.length > 0 ? allWordsDivList = orderedlyricWordCountArr.filter(d => d.word.startsWith(input)) : null;

    allWordsDiv.innerHTML = allWordsDivList.map(d =>
        `<p onclick="onTextClick(this.innerHTML)">${d.word}</p>`).join('');
}

function onTextClick(value) {
    console.log("value = ", value);
    wordCountBarVis.updateVis(value);
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
