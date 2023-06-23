const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAY__STORAGE__KEY = 'MY__MUSIC__PLAYER'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const cd = $('.cd')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
   config: JSON.parse(localStorage.getItem(PLAY__STORAGE__KEY)) || {},
   setConfig: function(key, value) {
    this.config[key] = value
    localStorage.setItem(PLAY__STORAGE__KEY, JSON.stringify(this.config))
   },
    songs: [
        {
            name: "Yoru ni Kakeru",
            singer: "Yoasobi",
            path:
                "./assets/music/YoruNiKakeru-YOASOBI-9214703.mp3",
            image:
                'data:image/jpeg;base64,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'
        },
        {
            name: "Chuyển kênh",
            singer: "Ngọt",
            path: "assets/music/CHUYENKENHsanphamnaykhongphailathuoc-Ngot-6102881.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Lần cuối",
            singer: "Ngọt",
            path:
                "assets/music/LANCUOIdibenemxotxanguoioi-Ngot-6089954.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Thấy chưa",
            singer: "Ngọt",
            path: "assets/music/ThayChua-Ngot-7963751.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Em dạo này",
            singer: "Ngọt",
            path: "assets/music/EmDaoNay-Ngot-5218802.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                'data:image/jpeg;base64,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'
        },

    ],

    // Tạo danh sách bài hát
    render: function () {
        const playlist = $('.playlist')
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
        <div
          class="thumb"
          style="
            background-image: url('${song.image}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`
        });
        playlist.innerHTML = htmls.join("")

    },

    // Xử lí các sự kiện
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Quay/dừng đĩa CD
        const cdRotate = [{ transform: 'rotate(360deg)' }]
        const cdRotateDuration = {
            duration: 5000,
            iterations: Infinity
        }
        const cdAnimate = cdThumb.animate(cdRotate, cdRotateDuration)
        cdAnimate.pause()


        // Nút play/pause
        playBtn.onclick = function () {

            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Khi bài hát được play
        audio.onplay = function () {
            player.classList.add('playing')
            _this.isPlaying = true
            cdAnimate.play()
        }

        // Khi bài hát được pause
        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
            cdAnimate.pause()
        }

        // Khi tiến độ bài hát thay đỏi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent

            }

        }

        // Khi nhấn nút next 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {

                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActivatedSong()


        }

        // Khi nhấn nút prev 
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {

                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActivatedSong()
        }

        // Khi nhấn nút random
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

        }

        // Khi nhấn nút repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)

            repeatBtn.classList.toggle('active', _this.isRepeat)

        }

        // Khi hết bài, phát tiếp bài khác hoặc nếu bật repeat thì phát lại bài cũ
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {

                nextBtn.click()
            }
        }


        // Khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                // Xử lí khi click vào bài hát
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if (e.target.closest('.option')) {

                }




            }


        }



    },

    // Định nghĩa ra thuộc tính bài hát hiện tại (ở đây chính là bài đầu tiên trong mảng songs)
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    // Load bài hát hiện tại
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    // Load cấu hình
loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
},
 

    // Scroll để thấy bài hát đang phát
    scrollToActivatedSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300);
    },
    // Bài hát tiếp theo
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    // Bài hát trước đó
    prevSong: function () {
        this.currentIndex--
        console.log(this.currentIndex)
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },



    // Bài hát ngẫu nhiên 
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)

        }
        while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },


    // chạy các hàm
    start: function () {
        this.loadConfig()
        this.defineProperties()
        this.loadCurrentSong()
        this.handleEvents()
        this.render()

        // Hiển thị trạng thái ban đầu của nút repeat và randoms
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }

}
app.start()