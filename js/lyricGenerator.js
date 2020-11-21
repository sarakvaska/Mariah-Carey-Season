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
                .replace(/ hed /g, " he'd ")
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

function updateInputDiv(wordList, wordListFiltered, artist = false) {
    // Add full list of words to input-dropdown
    let wordOptions = '';
    let wordInputDiv = document.getElementById("words");
    wordList.forEach(d => {
        wordOptions += `<option value="${d.word}"/>`
    });
    wordInputDiv.innerHTML = wordOptions;

    // Add filtered top word and word count for the current artist
    let topWordSpan = document.getElementById("topWordSpan");
    let topWordCountSpan = document.getElementById("topWordCountSpan");
    topWordSpan.innerHTML = "&nbsp;" + wordListFiltered[0].word;
    topWordCountSpan.innerHTML = "&nbsp;" + wordListFiltered[0].count + "&nbsp;";
}

function setArtistSelect(fullLyricData) {
    // Add list of artists to dropdown
    console.log("setArtistSelect");
    // Gets all unique artists by keeping only the first occurrence of each value
    let allArtists = fullLyricData.map(d => d.artist);
    let uniqueArtists = allArtists.filter((value, index, self) => self.indexOf(value) == index);
    console.log("allArtists = ", allArtists);
    console.log("uniqueArtists = ", uniqueArtists);
    let artistOptions = '';
    artistOptions += `<option selected value>All artists</option>`;
    let artistSelectEl = document.getElementById("artistSelectEl");
    uniqueArtists.forEach(artist => {
        artistOptions += `<option value="${artist}">${artist}</option>`
    });
    artistSelectEl.innerHTML = artistOptions;
}


function onWordInput(value = false) {
    console.log("Changed, value = ", value);
    // let topCountResultSpan = document.getElementById("topCountResultSpan");
    // topCountResultSpan.innerHTML = value;
    let wordInputResultEl = document.getElementById("wordInputResultEl");
    let inputWordInLyric = orderedlyricWordCountArr.find(d => d.word === value);
    wordInputResultEl.innerHTML =
        value && inputWordInLyric ? inputWordInLyric.count : 0;

    wordCountBarVis.updateVis(value);
}

function onArtistSelect(artist = false) {
    console.log("onArtistSelect, artist = ", artist);
    wordCountBarVis.wrangleData(artist);
    // onWordInput(document.getElementById("wordInputResultEl").value);
    let currentInputValue = document.getElementById("wordInputEl").value;
    console.log(currentInputValue);
    onWordInput(currentInputValue);
}