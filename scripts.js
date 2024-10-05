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
})

const PARALLAX_SENSITIVITY = 0.2
window.addEventListener('scroll', function () {
    const image = document.querySelector('.pricing-pic');
    if (!image) return

    const scrollPosition = window.scrollY;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    const panY = (scrollPercentage - PARALLAX_SENSITIVITY) * 100;

    image.style.transform = `translateY(${Math.max(panY, 0)}%)`;
});

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
