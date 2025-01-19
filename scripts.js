document.addEventListener('DOMContentLoaded', () => {
    changeNavSig()
    const navExpand = document.getElementById('nav-expand')
    navExpand.addEventListener('click', () => {
        const nav = document.querySelector('nav')

        nav.classList.toggle('show')
    })
    window.addEventListener('resize', (e) => {
        changeNavSig()
    })

    highlightCurrentSelectedVideoSelector()
    window.addEventListener("mousedown", ev => {
        if (!ev?.target || !ev.target.matches(".video-selector")) return

        const selectedVideoIndex = ev.target.dataset.videoid
        currentVideoId = selectedVideoIndex

        highlightCurrentSelectedVideoSelector()
        changeVideo(VIDEOS[selectedVideoIndex])
    })
})

function changeNavSig() {
    const signature = document.querySelector('.nav-sig')

    const urlPrefix = signature.classList.contains('index')
        ? '.'
        : '..'

    if (window.innerWidth < 1024) {
        signature.src = urlPrefix + '/assets/VerticleSignatures.png'
    } else {
        signature.src = urlPrefix + '/assets/signature.png'
    }
}

const YOUTUBE_IFRAME_PARAMS = "?rel=0"
const VIDEOS = [
    `https://www.youtube.com/embed/_y0UMyyuOS0${YOUTUBE_IFRAME_PARAMS}`,
    `https://www.youtube.com/embed/6V9zreejkFU${YOUTUBE_IFRAME_PARAMS}`,
    `https://www.youtube.com/embed/g5i6vgihJZU${YOUTUBE_IFRAME_PARAMS}`,
    `https://www.youtube.com/embed/wNzd5q0FLuA${YOUTUBE_IFRAME_PARAMS}`,
    `https://www.youtube.com/embed/XVfn5mpka8I${YOUTUBE_IFRAME_PARAMS}`
]
let currentVideoId = 0
function highlightCurrentSelectedVideoSelector() {
    const currentHighlightedItem = document.querySelector(".selected-video")
    if (currentHighlightedItem) {
        currentHighlightedItem.classList.remove("selected-video")
    }

    const selectedVideoSelector = document.querySelector(`[data-videoId="${currentVideoId}"]`)
    if (!selectedVideoSelector) return

    selectedVideoSelector.classList.add("selected-video")
}
function changeVideo(src) {
    const youtubeIframe = document.querySelector('#youtube-iframe')
    if (!youtubeIframe) return

    youtubeIframe.src = src

}
