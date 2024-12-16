// =============== PRE LOADING SETTINGS ===============
const spinnerLoading = document.querySelector('.spinner_loading')
const vlibrasWidget = document.querySelector('.vlibras-widget')

window.addEventListener('load', () => {
    vlibrasWidget.classList.remove('active-loading')
    spinnerLoading.classList.remove('active-loading')
    spinnerLoading.classList.remove('preloading')
})

// =============== INITIAL SETTINGS ===============
function onScroll() {

    const menu = document.querySelector('#header')
    const AlreadyHaveClass = menu.classList.contains('fixed-menu')

    const accessibilityBar = document.querySelector('.accessibility.content')

    if ((scrollY >= 0) && (!AlreadyHaveClass)) {
        changeColorMenuOnScroll(menu, accessibilityBar)
    }

    if ((scrollY <= 0) && (AlreadyHaveClass)) {
        menu.classList.remove('fixed-menu')
        accessibilityBar.classList.remove('to-hide')
    }
}
window.addEventListener('scroll', onScroll)

// =============== MENU ===============
const bodyElement = document.body

function activeMenuOnCurrentPage() {
    let page = `/${bodyElement.classList}`
    page = page.replace('contrast', '')

    const headerListOption = document.querySelector(`.header-list_option[href="${page}"]`)

    if (!headerListOption) return

    if (headerListOption.textContent === 'Cadastre-se') {
        headerListOption.classList.add('menu-active-btn')
    }
    headerListOption.classList.add('menu-active')
}
activeMenuOnCurrentPage()

function changeColorMenuOnScroll(menu, accessibilityBar) {
    menu.classList.add('fixed-menu')
    accessibilityBar.classList.add('to-hide')
}

// =============== MENU MOBILE ===============
// Elementos para manipular durante a ação do menu mobile
const burger = document.querySelector('.burger')
const menuMobile = document.querySelector('.menu-mobile')
const containerMain = document.querySelector('.container-main_content')
const form = document.querySelector('.form')

// Aparecem na home
const containerWelcome = document.querySelector('.presentation-container_welcome')
const containerChoose = document.querySelector('.identify-container_choose')

burger.addEventListener('click', () => openMobileMenu(burger))

function openMobileMenu(burger) {

    // Remove conjunto de estilos que o scroll reveal insere
    if (containerWelcome) {
        containerWelcome.setAttribute('style', '')
    }

    if (containerMain) {
        containerMain.setAttribute('style', '')
    }

    if (form) {
        form.classList.toggle('layerdown')
    }

    // Coloca o conteúdo uma camada abaixo do menu
    if (containerChoose) {
        const burgerIsOpen = burger.classList.contains('open')
        if (burgerIsOpen) {
            setTimeout(() => containerChoose.classList.remove('layerdown'), 400)
        } else {
            containerChoose.classList.add('layerdown')
        }
    }

    vlibrasWidget.classList.toggle('to-hide')

    burger.classList.toggle('open')
    menuMobile.classList.toggle('active-menu-mobile')
    bodyElement.classList.toggle('active-menu-mobile')
}

// =============== SCROLL REVEAL SETTINGS ===============
const scrollReveal = ScrollReveal({
    origin: 'left',
    distance: '40px',
    duration: '800',
    delay: 150
})

scrollReveal.reveal(`
    .container-main_content,
    .footer-container
`, { origin: 'top' })