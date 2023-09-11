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
    currentSong.timeByWords.forEach(function (timeByWord) {
        let textSentence = "";
        timeByWord.words.forEach(function (word) {
            textSentence += word.data.trim() + " ";
        });
        textSentence = textSentence.trim();
        sentenceLyric += '<p class="lyric-sentence">' + textSentence + "</p>";
        sentenceKaraoke += '<p class="lyric-sentence">' + textSentence + "</p>";

        lyricTextContainer.innerHTML = sentenceLyric;
        karaokeTextContainer.innerHTML = sentenceKaraoke;
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
            pLyric[index].classList.add("is-over");
            pKaraoke[index].classList.remove("is-active");
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
audio.addEventListener("timeupdate", function () {
    activeSentenceLyric(playlist, app.currentIndex);
});

function selectLyricTabs() {
    const lyricTabs = $$(".lyric-choose-tab-container .tab-item");
    const tabItemLyric = $(".tab-item-lyric");
    const tabItemKaraoke = $(".tab-item-karaoke");
    const lyricBody = $(".lyric-body");
    const karaokeBody = $(".karaoke-body");
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
