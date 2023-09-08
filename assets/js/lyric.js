const viewLyricBtn = $(".view-lyric-btn");
const lyricContainer = $(".lyric-container");
const lyricTextContainer = $(".lyric-text-container");
const songThumbnailLyric = $(".song-thumbnail-lyric");

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
    const htmlLyric = currentSong.timeBySentences
        .map((lyric) => `<p class="lyric-sentence">${lyric.text.trim()}</p>`)
        .join("");
    lyricTextContainer.innerHTML = htmlLyric;
    songThumbnailLyric.innerHTML = `<img
    src="${playlist[app.currentIndex].thumbnail_big}"
    alt="${playlist[app.currentIndex].name}"
/>`;
}
renderLyricSong(playlist, app.currentIndex);
let sentence = document.querySelector(".lyric-sentence");
let scrollTop = sentence.offsetHeight;
let isNewSentenceActive = false;
function millisecondsToSeconds(milliseconds) {
    return milliseconds / 1000;
}
function activeSentenceLyric(playlist, currentIndex) {
    let p = $$(".lyric-sentence");
    let currentSong = getLyricCurrentSong(playlist, currentIndex);
    currentSong.timeBySentences.forEach((timeBySentence, index) => {
        let secondStart = millisecondsToSeconds(timeBySentence.start);
        let secondEnd = millisecondsToSeconds(timeBySentence.end);
        //Active Sentence
        if (
            secondStart <= audio.currentTime &&
            audio.currentTime <= secondEnd
        ) {
            p[index].classList.add("is-active");
        } else if (secondStart >= audio.currentTime) {
            p[index].classList.remove("is-over");
            p[index].classList.remove("is-active");
            isNewSentenceActive = true;
        } else {
            p[index].classList.remove("is-active");
            p[index].classList.add("is-over");
        }
        // Scroll
        if (isNewSentenceActive) {
            isNewSentenceActive = false;
            const activeSentenceIndex = [...$$(".lyric-sentence")].findIndex(
                (p) => p.classList.contains("is-active")
            );
            const sentence = $$(".lyric-sentence")[activeSentenceIndex];
            sentence.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    });
}
audio.addEventListener("timeupdate", function () {
    activeSentenceLyric(playlist, app.currentIndex);
});
