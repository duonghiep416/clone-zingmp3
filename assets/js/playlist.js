const playListItemContainer = $(".playlist-item-container");
const playListSectionContainer = $(".playlist-section-container");

let amountOfPlaylist = 0;
function renderPlaylist(namePlaylist, playlists, size = "small") {
    amountOfPlaylist += 1;
    const titlePlaylist = document.createElement("h2");
    titlePlaylist.classList.add("playlist-section-title");
    titlePlaylist.innerHTML = namePlaylist;

    const playlistContainer = document.createElement("div");
    playlistContainer.classList.add(`playlist-item-container`);
    playlistContainer.classList.add(
        `playlist-item-container-${amountOfPlaylist}`
    );

    let htmls = playlists.map((playlist) => {
        return `
            <div class="playlist-item playlist-item-${
                playlist.id
            } playlist-item-${size}">
                <div class="playlist-thumbnail">
                    <img
                        src="${playlist.playlist_thumbnail}"
                        alt="${playlist.title}"
                    />
                </div>
                <p class="playlist-title">${
                    playlist.title === null ? "" : playlist.title
                }</p>
                <p class="playlist-desc">${
                    playlist.description === null ? "" : playlist.description
                }</p>
            </div>
        `;
    });
    playlistContainer.innerHTML = htmls.join("");
    playListSectionContainer.appendChild(titlePlaylist);
    playListSectionContainer.appendChild(playlistContainer);
}
renderPlaylist("Gần đây", playlists);
renderPlaylist("Tâm trạng hơi suy", playlistSadmusic, "big");

function handleChoosePlaylist(number, playlists) {
    const playlistContainer = document.querySelector(
        `.playlist-item-container-${number}`
    );
    const playlistItems = playlistContainer.querySelectorAll(".playlist-item");
    playlistItems.forEach((playlistItem, index) => {
        playlistItem.addEventListener("click", function (e) {
            playlist = eval(playlists[index].data);
            app.currentIndex = 0;
            app.render(playlist);
            app.getCurrentSong(playlist);
            audio.play();
            document.querySelector(".playlist-status-name").innerHTML =
                playlistItem.querySelector(".playlist-title").innerHTML;
        });
    });
}
handleChoosePlaylist(1, playlists);
handleChoosePlaylist(2, playlistSadmusic);
// handleChoosePlaylist(3);
// handleChoosePlaylist(4);
