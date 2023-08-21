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

        audio.addEventListener("loadedmetadata", function () {
            function handleTimePlaying() {
                let duration = audio.duration;
                let currentTimeSecond = audio.currentTime;
                let minutesDuration = Math.trunc(duration / 60);
                let secondsDuration = Math.floor(
                    duration - minutesDuration * 60
                );
                let minutesCurrentTime = Math.trunc(currentTimeSecond / 60);
                let secondsCurrentTime = Math.floor(
                    currentTimeSecond - minutesCurrentTime * 60
                );
                minutesDuration =
                    minutesDuration < 10
                        ? "0" + minutesDuration
                        : minutesDuration;
                secondsDuration =
                    secondsDuration < 10
                        ? "0" + secondsDuration
                        : secondsDuration;
                endTime.innerHTML = `${minutesDuration}:${secondsDuration}`;

                minutesCurrentTime =
                    minutesCurrentTime < 10
                        ? "0" + minutesCurrentTime
                        : minutesCurrentTime;
                secondsCurrentTime =
                    secondsCurrentTime < 10
                        ? "0" + secondsCurrentTime
                        : secondsCurrentTime;

                currentTime.innerHTML = `${minutesCurrentTime}:${secondsCurrentTime}`;
                setInterval(handleTimePlaying, 1000);
            }
            handleTimePlaying();
            if (!audio.paused) {
                handleTimePlaying();
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
        nextBtn.addEventListener("click", function () {
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
