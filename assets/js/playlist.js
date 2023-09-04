const playListItemContainer = $(".playlist-item-container");
const playlists = [
    {
        id: 1,
        title: "MÂY Podcast",
        data: "podcast",
        playlist_thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/avatars/c/c/d/e/ccde39236b3e515ffb9bd0926f9599d9.jpg",
    },
    {
        id: 2,
        title: "Playlist này chill phết",
        data: "songs",
        playlist_thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/c/5/3/e/c53e20e9ecf03b0bb4315deb90fe9063.jpg",
    },
];
function renderPlaylist(playlists) {
    let htmls = playlists.map((playlist) => {
        return `
        <div class="playlist-item playlist-item-${playlist.id}">
            <div class="playlist-thumbnail">
                <img
                    src="${playlist.playlist_thumbnail}"
                    alt="${playlist.title}"
                />
            </div>
            <p class="playlist-title">${playlist.title}</p>
        </div>
        `;
    });
    playListItemContainer.innerHTML = htmls.join("");
}
renderPlaylist(playlists);

function handleChoosePlaylist() {
    const playlistItems = $$(".playlist-item");
    playlistItems.forEach((playlistItem, index) => {
        playlistItem.addEventListener("click", function (e) {
            playlist = eval(playlists[index].data);
            app.currentIndex = 0;
            app.render(playlist);
            app.getCurrentSong(playlist);
            audio.play();
        });
    });
}
handleChoosePlaylist();
