// =============== MENU ===============
(function activeMenuOnCurrentPage(){
    const page = `./${document.body.classList}.html`
    const headerListOption = document.querySelector(`.header-content_menu a[href="${page}"]`)
    
    headerListOption.classList.add('menu-management-active')
})()

const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header-content')

burger.addEventListener('click', () => openMobileMenu(burger))

function openMobileMenu(burger){
    burger.classList.toggle('open')
    headerContent.classList.toggle('side-menu--management-active')
}
