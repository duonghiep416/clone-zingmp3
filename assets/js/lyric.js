const textWait = $(".text-wait");
const lyricTabs = $$(".lyric-choose-tab-container .tab-item");
const tabItemLyric = $(".tab-item-lyric");
const tabItemKaraoke = $(".tab-item-karaoke");
const lyricBody = $(".lyric-body");
const karaokeBody = $(".karaoke-body");
function showLyric() {
    isShowLyric = false;
    viewLyricBtn.addEventListener("click", function () {
        if (isShowLyric) {
            lyricContainer.style.animation =
                "hideLyric 0.5s ease-in-out forwards";
            isShowLyric = false;
            viewLyricBtn.style.color = "#fff";
        } else {
            lyricContainer.style.animation =
                "showLyric 0.5s ease-in-out forwards";
            isShowLyric = true;
            viewLyricBtn.style.color = "rgb(194, 115, 237)";
        }
    });
}
showLyric();

function getLyricCurrentSong(playlist, currentIndex) {
    let currentSong = dataLyric.find((song) => {
        return (
            JSON.stringify(eval(song.playlist)) === JSON.stringify(playlist) &&
            currentIndex === song.song_id - 1
        );
    });
    return currentSong;
}

function renderLyricSong(playlist, currentIndex) {
    let currentSong = getLyricCurrentSong(playlist, currentIndex);
    let sentenceLyric = "";
    let sentenceKaraoke = "";
    currentSong.timeByWords.forEach(function (timeByWord, index) {
        let textSentence = "";
        timeByWord.words.forEach(function (word) {
            textSentence += word.data.trim() + " ";
        });
        textSentence = textSentence.trim();
        sentenceLyric += '<p class="lyric-sentence">' + textSentence + "</p>";
        sentenceKaraoke += '<p class="lyric-sentence">' + textSentence + "</p>";
        lyricTextContainer.innerHTML = sentenceLyric;
        karaokeTextContainer.innerHTML = sentenceKaraoke;
        textWait.innerHTML = `
        <p class="lyric-sentence">Tên bài hát: ${
            playlist[currentIndex].name
        }</p>
        <p class="lyric-sentence">Ca sĩ: ${playlist[currentIndex].singer
            .map(
                (singer) => `<span class="song-singer-karaoke">${singer}</span>`
            )
            .join(", ")}</p>
        `;
    });
    songThumbnailLyric.forEach((songThumbnail) => {
        songThumbnail.innerHTML = `<img
        src="${playlist[app.currentIndex].thumbnail_big}"
        alt="${playlist[app.currentIndex].name}"
    />`;
    });
}
renderLyricSong(playlist, app.currentIndex);
let sentence = document.querySelector(".lyric-sentence");
let scrollTop = sentence.offsetHeight;
let isNewSentenceActive = false;
function millisecondsToSeconds(milliseconds) {
    return milliseconds / 1000;
}
function activeSentenceLyric(playlist, currentIndex) {
    let pLyric = $$(".lyric-text-container .lyric-sentence");
    let pKaraoke = $$(".karaoke-text-container .lyric-sentence");
    const currentSong = getLyricCurrentSong(playlist, currentIndex);

    currentSong.timeByWords.forEach((timeByWord, index) => {
        let secondStart = millisecondsToSeconds(timeByWord.words[0].startTime);
        let secondEnd = millisecondsToSeconds(
            timeByWord.words[timeByWord.words.length - 1].endTime
        );
        //Active Sentence
        if (
            secondStart <= audio.currentTime &&
            audio.currentTime <= secondEnd
        ) {
            pLyric[index].classList.add("is-active");
            pKaraoke[index].classList.add("is-active");
        } else if (secondStart >= audio.currentTime) {
            pLyric[index].classList.remove("is-over");
            pLyric[index].classList.remove("is-active");
            pKaraoke[index].classList.remove("is-over");
            pKaraoke[index].classList.remove("is-active");
            isNewSentenceActive = true;
        } else {
            pLyric[index].classList.remove("is-active");
            pKaraoke[index].classList.remove("is-active");
            pLyric[index].classList.add("is-over");
            pKaraoke[index].classList.add("is-over");
        }

        // Scroll
        if (isNewSentenceActive) {
            isNewSentenceActive = false;
            const activeSentenceIndexLyric = [...pLyric].findIndex((pLyric) =>
                pLyric.classList.contains("is-active")
            );
            const activeSentenceIndexKaraoke = [...pKaraoke].findIndex(
                (pKaraoke) => pKaraoke.classList.contains("is-active")
            );
            const sentenceLyric = pLyric[activeSentenceIndexLyric];
            const sentenceKaraoke = pKaraoke[activeSentenceIndexKaraoke];
            sentenceLyric.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            sentenceKaraoke.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    });
}

function selectLyricTabs() {
    lyricTabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            lyricTabs.forEach((tab) => {
                tab.classList.remove("is-active");
            });
            tab.classList.add("is-active");
            if (tabItemLyric.classList.contains("is-active")) {
                lyricBody.style.display = "flex";
                karaokeBody.style.display = "none";
            } else if (tabItemKaraoke.classList.contains("is-active")) {
                lyricBody.style.display = "none";
                karaokeBody.style.display = "flex";
            }
        });
    });
}
selectLyricTabs();

let sentenceIndex = 0;
function showSongInfoWhileWaiting(playlist, currentIndex) {
    const currentSong = getLyricCurrentSong(playlist, currentIndex);
    const sentence = currentSong.timeByWords[sentenceIndex];
    if (
        !currentSong.timeByWords[sentenceIndex + 1] &&
        sentence.words[sentence.words.length - 1].endTime <=
            audio.currentTime * 1000
    ) {
        textWait.classList.add("showInfoSong");
        karaokeTextContainer.classList.add("hideInfoSong");
        sentenceIndex = 0;
    } else if (
        currentSong.timeByWords[sentenceIndex + 1].words[0].startTime -
            sentence.words[sentence.words.length - 1].endTime >
            2000 &&
        sentence.words[sentence.words.length - 1].endTime <=
            audio.currentTime * 1000
    ) {
        textWait.classList.add("showInfoSong");
        karaokeTextContainer.classList.add("hideInfoSong");
        karaokeTextContainer.classList.remove("showInfoSong");
    } else if (
        currentSong.timeByWords[0].words[0].startTime >=
        audio.currentTime * 1000
    ) {
        textWait.classList.add("showInfoSong");
        karaokeTextContainer.classList.add("hideInfoSong");
        karaokeTextContainer.classList.remove("showInfoSong");
    } else if (
        sentence.words[0].startTime <= audio.currentTime * 1000 &&
        audio.currentTime * 1000 <=
            sentence.words[sentence.words.length - 1].endTime
    ) {
        textWait.classList.remove("showInfoSong");
        karaokeTextContainer.classList.remove("hideInfoSong");
        karaokeTextContainer.classList.add("showInfoSong");
    }
}
audio.addEventListener("timeupdate", function () {
    updateCurrentSentencce(playlist, app.currentIndex);
    showSongInfoWhileWaiting(playlist, app.currentIndex);
    activeSentenceLyric(playlist, app.currentIndex);
});
function updateCurrentSentencce(playlist, currentIndex) {
    const currentSong = getLyricCurrentSong(playlist, currentIndex);
    currentSong.timeByWords.forEach((timeByWord, index) => {
        if (
            timeByWord.words[0].startTime <= audio.currentTime * 1000 &&
            audio.currentTime * 1000 <=
                timeByWord.words[timeByWord.words.length - 1].endTime
        ) {
            sentenceIndex = index;
        }
    });
}

// function checkSongHaveLyric(playlist, currentIndex) {
//     if (!playlist[currentIndex].haveLyric) {
//         window.alert("Chưa có lời cho bài hát này!");
//     }
// }
// checkSongHaveLyric(playlist, app.currentIndex);
