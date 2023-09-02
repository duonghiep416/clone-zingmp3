const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlistSong = $(".playlist-songs");
const nameCurrentSong = $(".player-control .song-name");
const singerCurrentSong = $(".player-control .song-singer");
const thumbnailCurrentSong = $(".player-control .song-thumb-control");
const actionPlay = $(".action-play");
const playBtn = $(".player-control #play-song-btn");
const pauseBtn = $(".player-control #pause-song-btn");
const nextBtn = $(".player-control #next-song");
const prevBtn = $(".player-control #prev-song");
const randomBtn = $(".player-control #random-btn");
const currentTime = $(".player-control .current-time");
const endTime = $(".player-control .end-time");
const currentTimeBar = $(".current-time-bar");
const durationTimeBar = $(".duration-bar");
const durationVolumeBar = $(".control-action-volume");
const volumeBarContainer = $(".control-action-volume .duration-bar");
const volumeBar = $(".control-action-volume .current-time-bar");
const dotTimeBar = $(".song-control-actions .current-time-bar .dot-time-bar");
const dotVolumeBar = $(
    ".control-action-volume .current-time-bar .dot-time-bar"
);

const muteBtn = $(".volume-icon .unmuted");
const unmuteBtn = $(".volume-icon .muted");
const audio = $("#song-audio");
const app = {
    currentIndex: 0,

    // Render the playlist
    render: function () {
        let html = songs
            .map((song, index) => {
                return `
                <div class="song-item ${
                    this.currentIndex === index ? "active" : ""
                }" data-index=${index}>
                    <img
                        src="${song.thumbnail}"
                        alt="${song.name}"
                        class="song-thumb"
                    />
                    <div class="song-info">
                        <p class="song-name">${song.name}</p>
                        <a href="" class="song-singer">${song.singer}</a>
                    </div>
                </div>
            `;
            })
            .join("");
        playlistSong.innerHTML = html;
    },

    getCurrentSong: function () {
        let currentSong = songs[this.currentIndex];
        nameCurrentSong.innerHTML = currentSong.name;
        singerCurrentSong.innerHTML = currentSong.singer;
        thumbnailCurrentSong.src = currentSong.thumbnail;
        thumbnailCurrentSong.alt = currentSong.name;
        audio.src = currentSong.path;
    },

    checkIsPlaying: function () {
        if (audio.paused) {
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
        } else {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
        }
    },

    renderTimeSong: function () {
        // Time currently playing
        let isPlaying = false;
        let isDragging = false;

        function updateTimeDisplay(timeInSeconds, element) {
            let minutes = Math.trunc(timeInSeconds / 60);
            let seconds = Math.floor(timeInSeconds - minutes * 60);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            element.innerHTML = `${minutes}:${seconds}`;
        }

        function updateCurrentTimeBar() {
            if (!isDragging) {
                let widthCurrentTimeBar = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                currentTimeBar.style.width = `${widthCurrentTimeBar}%`;
                durationTimeBar.addEventListener("mousedown", function (e) {
                    audio.play();
                    audio.currentTime =
                        (e.offsetX / durationTimeBar.offsetWidth) *
                        audio.duration;
                });
            }
        }

        // Seek

        function dragTimeBar() {
            let pointStart = 0;
            let pointEnd = 0;
            let initialSpace = 0;
            let space;
            dotTimeBar.addEventListener("mousedown", function (e) {
                e.stopPropagation();
                isDragging = true;
                pointStart = e.clientX;
            });

            document.addEventListener("mousemove", function (e) {
                if (isDragging) {
                    pointEnd = e.clientX;
                    space = pointEnd - pointStart;
                    if (space + initialSpace <= durationTimeBar.offsetWidth) {
                        currentTimeBar.style.width = `${
                            ((space + initialSpace) * 100) /
                            durationTimeBar.offsetWidth
                        }%`;
                    }
                }
            });

            document.addEventListener("mouseup", function () {
                if (isDragging) {
                    audio.currentTime = Math.floor(
                        ((pointEnd - pointStart + initialSpace) /
                            durationTimeBar.offsetWidth) *
                            audio.duration
                    );
                    audio.play();
                    initialSpace += space;
                    isDragging = false;
                }
            });
            durationTimeBar.addEventListener("mousedown", function (e) {
                initialSpace += e.offsetX - currentTimeBar.offsetWidth;
            });
        }
        dragTimeBar();

        //Update Volume
        function changeVolume(e) {
            let initialSpace = volumeBarContainer.offsetWidth;
            let pointStart = 0;
            let pointEnd = 0;
            let space = 0;
            let isDraggingVolume = false;
            dotVolumeBar.addEventListener("mousedown", function (e) {
                e.stopPropagation();
                isDraggingVolume = true;
                pointStart = e.clientX;
            });
            volumeBar.style.width = `${audio.volume * 100}%`;
            document.addEventListener("mousemove", function (e) {
                if (isDraggingVolume) {
                    pointEnd = e.clientX;
                    space = pointEnd - pointStart;
                    if (
                        space + initialSpace >= 0 &&
                        space + initialSpace <= volumeBarContainer.offsetWidth
                    ) {
                        audio.volume =
                            (space + initialSpace) /
                            volumeBarContainer.offsetWidth;
                    }
                    if (space + initialSpace < 0) {
                        audio.volume = 0;

                        muteBtn.style.display = "none";
                        unmuteBtn.style.display = "block";
                    }
                    if (audio.volume > 0) {
                        muteBtn.style.display = "block";
                        unmuteBtn.style.display = "none";
                    }
                }
            });

            document.addEventListener("mouseup", function (e) {
                if (isDraggingVolume) {
                    initialSpace += space;
                    isDraggingVolume = false;
                }
            });
            volumeBarContainer.addEventListener("mousedown", (e) => {
                audio.volume = e.offsetX / volumeBarContainer.offsetWidth;
                initialSpace = e.offsetX;
            });
            unmuteBtn.addEventListener("click", () => {
                muteBtn.style.display = "block";
                unmuteBtn.style.display = "none";
                audio.volume = 0.5;
                initialSpace = volumeBarContainer.offsetWidth * 0.5;
            });
            muteBtn.addEventListener("click", () => {
                muteBtn.style.display = "none";
                unmuteBtn.style.display = "block";
                audio.volume = 0;
                initialSpace = 0;
            });
        }

        changeVolume();
        audio.addEventListener("volumechange", () => {
            volumeBar.style.width = `${audio.volume * 100}%`;
        });
        //Update volume ended
        audio.addEventListener("loadedmetadata", function () {
            if (!isPlaying) {
                updateTimeDisplay(audio.duration, endTime);
                updateTimeDisplay(audio.currentTime, currentTime);
                updateCurrentTimeBar();
            }
        });

        audio.addEventListener("timeupdate", function () {
            if (audio.currentTime > 0 || isPlaying) {
                isPlaying = true;
                updateTimeDisplay(audio.currentTime, currentTime);
                updateCurrentTimeBar();
                app.checkIsPlaying();
            }
        });
    },

    handleEvents: function () {
        let randomIsOn = false;
        // Handle Play
        actionPlay.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            app.checkIsPlaying();
            app.renderTimeSong();
        });

        // Random Song
        randomBtn.addEventListener("click", function () {
            randomIsOn = randomIsOn === false ? true : false;
            console.log(randomIsOn);
            if (randomIsOn === true) {
                randomBtn.style.color = "#c273ed";
            } else {
                randomBtn.style.color = "#fff";
            }
        });

        //Choose song to play
        playlistSong.addEventListener("click", function (e) {
            let songItem = e.target.closest(".song-item");
            app.currentIndex = +songItem.getAttribute("data-index");
            app.getCurrentSong();
            app.render();
            audio.play();
            app.checkIsPlaying();
            app.renderTimeSong();
        });

        //Next song
        function nextSong() {
            if (randomIsOn) {
                let randomNumber = Math.floor(Math.random() * songs.length);
                while (app.currentIndex === randomNumber) {
                    randomNumber = Math.floor(Math.random() * songs.length);
                }
                app.currentIndex = randomNumber;
            } else {
                app.currentIndex++;
                if (app.currentIndex > songs.length - 1) {
                    app.currentIndex = 0;
                }
            }

            app.getCurrentSong();
            app.render();
            audio.play();
            app.checkIsPlaying();
            app.renderTimeSong();
        }
        nextBtn.addEventListener("click", nextSong);
        audio.addEventListener("timeupdate", function () {
            if (audio.currentTime === audio.duration) {
                nextSong();
            }
        });

        //Previous Song
        prevBtn.addEventListener("click", function () {
            if (randomIsOn) {
                let randomNumber = Math.floor(Math.random() * songs.length);
                while (app.currentIndex === randomNumber) {
                    randomNumber = Math.floor(Math.random() * songs.length);
                }

                app.currentIndex = randomNumber;
            } else {
                app.currentIndex--;
                if (app.currentIndex < 0) {
                    app.currentIndex = songs.length - 1;
                }
            }

            app.getCurrentSong();
            app.render();
            audio.play();
            app.checkIsPlaying();
            app.renderTimeSong();
        });
    },

    start: function () {
        this.render();
        this.checkIsPlaying();
        this.handleEvents();
        this.getCurrentSong();
        this.renderTimeSong();
    },
};

app.start();
