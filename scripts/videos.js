const YOUTUBE_IFRAME_PARAMS = "?rel=0"

document.addEventListener('DOMContentLoaded', () => {
    getVideos()

    highlightCurrentSelectedVideoSelector()
    window.addEventListener("mousedown", changeSelectedVideo)
    window.addEventListener("keydown", (ev) => {
        if (ev.key !== "Enter" && ev.key !== " ") return
        changeSelectedVideo(ev)
    })
})

async function getVideos() {
    const apiKey = "AIzaSyC5_4P-1dISsj4xQt6-CJdrPh7Rbuk-C6k"
    const channelId = "UC2zHdOkpUlg3DmO_O7tMkwg"
    const maxVideos = 5

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxVideos}`

    const youtubeResponse = await fetch(url)
        .then(response => response.json())

    const videos = youtubeResponse.items.map(item => item.id.videoId)
    if (videos.length === 0) return

    changeVideo(`https://www.youtube.com/embed/${videos[0]}${YOUTUBE_IFRAME_PARAMS}`)
    addVideoButtons(videos)
}

function addVideoButtons(videos) {
    const videoContainer = document.querySelector(".video-selector-container")

    for (let video of videos) {
        const button = document.createElement("button")
        button.setAttribute('class', "video-selector")
        button.setAttribute('data-videoId', video)

        videoContainer.appendChild(button)
    }
}

function highlightCurrentSelectedVideoSelector(selectedId) {
    const currentHighlightedItem = document.querySelector(".selected-video")
    if (currentHighlightedItem) {
        currentHighlightedItem.classList.remove("selected-video")
    }

    const selectedVideoSelector = document.querySelector(`[data-videoId="${selectedId}"]`)
    if (!selectedVideoSelector) return

    selectedVideoSelector.classList.add("selected-video")
}
function changeVideo(src) {
    const youtubeIframe = document.querySelector('#youtube-iframe')
    if (!youtubeIframe) return

    youtubeIframe.src = src

}
function changeSelectedVideo(ev) {
    const YOUTUBE_IFRAME_PARAMS = "?rel=0"

    if (!ev?.target || !ev.target.matches(".video-selector")) return

    const selectedVideoId = ev.target.dataset.videoid
    if (!selectedVideoId) return

    const videoUrl = `https://www.youtube.com/embed/${selectedVideoId}${YOUTUBE_IFRAME_PARAMS}`
    highlightCurrentSelectedVideoSelector()
    changeVideo(videoUrl)

    highlightCurrentSelectedVideoSelector(selectedVideoId)
}
