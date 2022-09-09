// =============== INITIAL SETTINGS ===============
window.addEventListener('scroll', onScroll)
const bodyElement = document.body

function onScroll() {

    const menu = document.querySelector('#header')
    const AlreadyHaveClass = menu.classList.contains('fixed-menu')

    if((scrollY >= 0) && (!AlreadyHaveClass)) {
        changeColorMenuOnScroll(menu)
    }

    if((scrollY <= 0) && (AlreadyHaveClass)){
        menu.classList.remove('fixed-menu')
    }
}

// =============== MENU ===============
(function activeMenuOnCurrentPage(){
    const page = `./${bodyElement.classList}.html`
    
    const headerListOption = document.querySelector(`.header-list_option[href="${page}"]`)
    if(headerListOption.textContent == 'Cadastre-se') {
        headerListOption.classList.add('menu-active-btn')
    }
    headerListOption.classList.add('menu-active')
})()

function changeColorMenuOnScroll(menu) {
    menu.classList.add('fixed-menu')
}

// Elementos para manipular durante a ação do menu
const burger = document.querySelector('.burger')
const menuMobile = document.querySelector('.menu-mobile')
const containerWelcome = document.querySelector('.presentation-container_welcome')
const containerMain = document.querySelector('.container-main_content')
const containerChoose = document.querySelector('.identify-container_choose')
const form = document.querySelector('.form')

burger.addEventListener('click', () => openMobileMenu(burger))

function openMobileMenu(burger){

    // Remove conjunto de estilos que o scroll reveal insere
    if(containerWelcome) {
        containerWelcome.setAttribute('style', '')
    }

    if(containerMain) {
        containerMain.setAttribute('style', '')
    }

    if(form) {
        form.classList.toggle('layerdown')
    }

    // Coloca o conteúdo uma camada abaixo do menu
    if(containerChoose) {
        const burgerIsOpen = burger.classList.contains('open')
        if(burgerIsOpen){
            setTimeout(() => containerChoose.classList.remove('layerdown'), 400)
        }else{
            containerChoose.classList.add('layerdown')
        }
    }

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
    .presentation-container_welcome,
    .optionshelp-container_title,
    .optionshelp-group_card,
    .about-container,
    .difference-container_description,
    .difference-highlights_item,
    .start-container,
    .contact-container
`)

scrollReveal.reveal(`
    .container-main_content,
    .footer-container
`, {origin: 'top'})