const YOUTUBE_IFRAME_PARAMS = "?rel=0"

const tetyanaStaticVideoIds = [
    "6V9zreejkFU",
    "g5i6vgihJZU"
]

const studentVideoIds = [
    "DjK6gP_c-4U"
]

const tetyanaPlaylistId = "PLmhPBkbAFzCMoIuVB-Z5OM0twWVR2jc62"
const studentPlaylistId = "PLmhPBkbAFzCMBzkofa7SnjtZDc-cwetPI"

document.addEventListener('DOMContentLoaded', () => {
    getVideos()

    highlightCurrentSelectedVideoSelector()
    window.addEventListener("mousedown", (ev) => {
        changeSelectedTetyanaVideo(ev)
        changeSelectedStudentVideo(ev)
    })
    window.addEventListener("keydown", (ev) => {
        if (ev.key !== "Enter" && ev.key !== " ") return
        changeSelectedTetyanaVideo(ev)
        changeSelectedStudentVideo(ev)
    })
})

async function getVideos() {
    const apiKey = "AIzaSyC5_4P-1dISsj4xQt6-CJdrPh7Rbuk-C6k"
    const maxVideos = 10

    const tetyanaYoutubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxVideos}&playlistId=${tetyanaPlaylistId}&key=${apiKey}`)
        .then(response => response.json())
    const studentYoutubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxVideos}&playlistId=${studentPlaylistId}&key=${apiKey}`)
        .then(response => response.json())

    const tetyanaVideos = [
        ...(tetyanaYoutubeResponse?.items || []).map(item => item.snippet.resourceId.videoId),
        ...tetyanaStaticVideoIds
    ]
    const studentVideos = (studentYoutubeResponse?.items || []).map(item => item.snippet.resourceId.videoId)

    addVideoButtons(tetyanaVideos, studentVideos)

    changeTetyanaVideo(`https://www.youtube.com/embed/${tetyanaVideos[0]}${YOUTUBE_IFRAME_PARAMS}`)
    highlightCurrentSelectedTetyanaVideoSelector(tetyanaVideos[0])

    changeStudentVideo(`https://www.youtube.com/embed/${studentVideos[0]}${YOUTUBE_IFRAME_PARAMS}`)
    highlightCurrentSelectedStudentVideoSelector(studentVideos[0])
}

function addVideoButtons(tetyanaVideos, studentVideos) {
    const tetyanaVideoContainer = document.querySelector(`.video-selector-container[data-artist="tetyana"]`)

    for (let video of tetyanaVideos) {
        if (!video) continue

        const button = document.createElement("button")
        button.setAttribute('class', "video-selector")
        button.setAttribute('data-videoId', video)
        button.setAttribute('data-artist', "tetyana")

        tetyanaVideoContainer.appendChild(button)
    }

    const studentVideoContainer = document.querySelector(`.video-selector-container[data-artist="student"]`)

    for (let video of studentVideos) {
        if (!video) continue

        const button = document.createElement("button")
        button.setAttribute('class', "video-selector")
        button.setAttribute('data-videoId', video)
        button.setAttribute('data-artist', "student")

        studentVideoContainer.appendChild(button)
    }
}

function highlightCurrentSelectedVideoSelector(tetyanaSelectedId, studentSelectedId) {
    const tetyanaCurrentHighlightedItem = document.querySelector(`.selected-video[data-artist="tetyana"`)
    if (tetyanaCurrentHighlightedItem) {
        tetyanaCurrentHighlightedItem.classList.remove("selected-video")
    }

    const studentCurrentHighlightedItem = document.querySelector(`.selected-video[data-artist="student"`)
    if (studentCurrentHighlightedItem) {
        studentCurrentHighlightedItem.classList.remove("selected-video")
    }

    if (tetyanaSelectedId) {
        const selectedVideoSelector = document.querySelector(`[data-videoId="${tetyanaSelectedId}"][data-artist="tetyana"]`)
        if (!selectedVideoSelector) return

        selectedVideoSelector.classList.add("selected-video")
    }
}

function highlightCurrentSelectedStudentVideoSelector(selectedId) {
    const currentHighlightedItem = document.querySelector(`.selected-video[data-artist="student"`)
    if (currentHighlightedItem) {
        currentHighlightedItem.classList.remove("selected-video")
    }

    const selectedVideoSelector = document.querySelector(`[data-videoId="${selectedId}"][data-artist="student"]`)
    if (!selectedVideoSelector) return

    selectedVideoSelector.classList.add("selected-video")
}
function changeStudentVideo(src) {
    const youtubeIframe = document.querySelector('#youtube-iframe[data-artist="student"]')
    if (!youtubeIframe) return

    youtubeIframe.src = src
}
function changeSelectedStudentVideo(ev) {
    const YOUTUBE_IFRAME_PARAMS = "?rel=0"

    if (!ev?.target || !ev.target.matches(`.video-selector[data-artist="student"]`)) return

    const selectedVideoId = ev.target.dataset.videoid
    if (!selectedVideoId) return

    const videoUrl = `https://www.youtube.com/embed/${selectedVideoId}${YOUTUBE_IFRAME_PARAMS}`
    changeStudentVideo(videoUrl)
    highlightCurrentSelectedStudentVideoSelector(selectedVideoId)
}


function highlightCurrentSelectedTetyanaVideoSelector(selectedId) {
    const currentHighlightedItem = document.querySelector(`.selected-video[data-artist="tetyana"`)
    if (currentHighlightedItem) {
        currentHighlightedItem.classList.remove("selected-video")
    }

    const selectedVideoSelector = document.querySelector(`[data-videoId="${selectedId}"][data-artist="tetyana"]`)
    if (!selectedVideoSelector) return

    selectedVideoSelector.classList.add("selected-video")
}
function changeTetyanaVideo(src) {
    const youtubeIframe = document.querySelector('#youtube-iframe[data-artist="tetyana"]')
    if (!youtubeIframe) return

    youtubeIframe.src = src
}
function changeSelectedTetyanaVideo(ev) {
    const YOUTUBE_IFRAME_PARAMS = "?rel=0"

    if (!ev?.target || !ev.target.matches(`.video-selector[data-artist="tetyana"]`)) return

    const selectedVideoId = ev.target.dataset.videoid
    if (!selectedVideoId) return

    const videoUrl = `https://www.youtube.com/embed/${selectedVideoId}${YOUTUBE_IFRAME_PARAMS}`
    changeTetyanaVideo(videoUrl)
    highlightCurrentSelectedTetyanaVideoSelector(selectedVideoId)
}
