const sadMusic = songs.filter((song) => song.playlist.includes("Sad Music"));
const sadMusic2 = [
    {
        id: 1,
        type: "music",
        name: "Chuyện đôi ta",
        singer: ["Emcee L", "Muộii"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/0/0/a/8/00a8eb97e7f7e6cd0e3e6a2e5d86cdbd.jpg",
        thumbnail_big:
            "//photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/0/0/a/8/00a8eb97e7f7e6cd0e3e6a2e5d86cdbd.jpg",
        album: ["Chuyện đôi ta (Single)"],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/chuyen-doi-ta.mp3",
        haveLyric: true,
    },
    {
        id: 2,
        type: "music",
        name: "Ngỏ Lời",
        singer: ["Suni Hạ Linh"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/6/4/9/e6496aca6e85a9db5bcb045966ef168d.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/e/6/4/9/e6496aca6e85a9db5bcb045966ef168d.jpg",
        album: ["Ngỏ Lời (Single)"],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/ngo-loi.mp3",
        haveLyric: true,
    },
    {
        id: 3,
        type: "music",
        name: "Không sao mà em đây rồi",
        singer: ["Suni Hạ Linh", "Lou Hoàng"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/8/f/f/48ffdb72c21e5865fa0f2f1f269f0e16.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/4/8/f/f/48ffdb72c21e5865fa0f2f1f269f0e16.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/khong-sao-ma-em-day-roi.mp3",
        haveLyric: true,
    },
    {
        id: 4,
        type: "music",
        name: "CÓ AI THƯƠNG EM NHƯ ANH",
        singer: ["Tóc Tiên", "Touliver"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/0/3/6/90368c6fa9dfb60ecd2a3ce1fd474696.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/9/0/3/6/90368c6fa9dfb60ecd2a3ce1fd474696.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/co-ai-thuong-em-nhu-anh.mp3",
        haveLyric: true,
    },
];

const sadMusic3 = [
    {
        id: 1,
        type: "music",
        name: "Đếm cừu",
        singer: ["Han Sara", "Kayy Trần"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/6/d/7/96d7b4cb72085cfdebf5d1d3e33f2682.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/9/6/d/7/96d7b4cb72085cfdebf5d1d3e33f2682.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/dem-cuu.mp3",
        haveLyric: true,
    },
    {
        id: 2,
        type: "music",
        name: "Tận cùng nỗi nhớ",
        singer: ["Will", "Han Sara"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/a/1/f/1a1f5688569dfc52005abf304676ea63.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/1/a/1/f/1a1f5688569dfc52005abf304676ea63.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/tan-cung-noi-nho.mp3",
        haveLyric: true,
    },
    {
        id: 3,
        type: "music",
        name: "Anh Đã Từ Bỏ Rồi Đấy",
        singer: ["Nguyenn", "Aric"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/7/0/6/b/706b2e3d7175a9adfba716ece162ddbe.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/7/0/6/b/706b2e3d7175a9adfba716ece162ddbe.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/anh-da-tu-bo-roi-day.mp3",
        haveLyric: true,
    },
    {
        id: 4,
        type: "music",
        name: "có ai ở đây không?",
        singer: ["14 Casper", "Bon"],
        thumbnail:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/4/4/e/c44e1e8b4901e3c4cdbe1d28816ad028.jpg",
        thumbnail_big:
            "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/c/4/4/e/c44e1e8b4901e3c4cdbe1d28816ad028.jpg",
        album: [null],
        playlist: ["Sad Music"],
        genre: "Modern Music",
        path: "./assets/music/sadMusic/co-ai-o-day-khong.mp3",
        haveLyric: true,
    },
];
