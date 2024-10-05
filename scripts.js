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
