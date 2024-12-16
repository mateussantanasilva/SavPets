const bodyElement = document.body

// =============== MENU ===============
function setCurrentPage() {
    const page = `/${bodyElement.classList}`
    if (document.querySelector("body:not([class])")) {
		return
	}
    return document.querySelector(`.header-content_menu a[href="${page}"]`)
}

(function activeMenuOnCurrentPage() {
    const headerListOption = setCurrentPage()

    if (document.querySelector("body:not([class])")) {
		return
	}
    headerListOption.classList.add('menu-management-active')
})()

const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header-content')

burger.addEventListener('click', () => openMobileMenu(burger))

function openMobileMenu(burger) {
    burger.classList.toggle('open')
    headerContent.classList.toggle('side-menu--management-active')
}

// =============== TOP BAR ===============
(function createBreadCrumb() {
	if (document.querySelector("body:not([class])")) {
		return
	}
	
    const topBarPath = document.querySelector('.top-bar_path:first-child')
    const currentPage = setCurrentPage().textContent.trim()
    let newPath

    switch (currentPage) {
        case 'Cargos':
            newPath = '<a class="top-bar_path" href="/cargos">Cargos</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Departamentos':
            newPath = '<a class="top-bar_path" href="/departamentos">Departamentos</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Funcionários':
            newPath = '<a class="top-bar_path" href="/funcionarios">Funcionários</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Clientes':
            newPath = '<a class="top-bar_path" href="/clientes">Clientes</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Adoções':
            newPath = '<a class="top-bar_path" href="/adocoes">Adoções</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Campanhas de adoção':
            newPath = '<a class="top-bar_path" href="/campanhas-adocao">Campanhas de adoção</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Relatórios de animais':
            newPath = '<a class="top-bar_path" href="/relatorios-animais">Relatórios de animais</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Categorias de animais':
            newPath = '<a class="top-bar_path" href="/categorias-animais">Categorias de animais</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Medicamentos':
            newPath = '<a class="top-bar_path" href="/medicamentos">Medicamentos</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Alimentos':
            newPath = '<a class="top-bar_path" href="/alimentos">Alimentos</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Equipamentos':
            newPath = '<a class="top-bar_path" href="/equipamentos">Equipamentos</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
        case 'Fornecedores':
            newPath = '<a class="top-bar_path" href="/fornecedores">Fornecedores</a>'
            topBarPath.insertAdjacentHTML('afterend', newPath)
            break
    }
})()

// =============== SHOW USER SETTINGS =============== 
username.innerText = localStorage.getItem("username")
occupation.innerText = ""
userId.innerText = ""

// =============== QUIT OPTIONS SETTINGS ===============
const quitOption = document.querySelectorAll('.option-quit')

quitOption.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Atenção',
            text: "Você deseja sair da sessão?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a4cbe0',
            cancelButtonColor: '#ff7575',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, sair!'
        }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'warning',
                    title: 'Saindo da sessão'
                })
				
                setTimeout(() => window.location.href = "/login", 3100)
                localStorage.removeItem("username")
				localStorage.removeItem("occupation")
				localStorage.removeItem("userId")
            }
        })
    })
})

// =============== STATUS PAGE SETTINGS ===============
function showPageStatusModal(icon, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: '#a4cbe0'
    })
}

(function identifyPageStatus() {
    const urlParams = new URLSearchParams(window.location.search)
    const pageStatus = urlParams.get('status')
    let textStatus

    // Texto opcional passado pelo controller
    if (urlParams.has('text'))
        textStatus = urlParams.get('text').replace(/_/g, ' ')

    switch (pageStatus) {
        case 'Cadastrado':
            showPageStatusModal('success', pageStatus, 'Registro cadastrado com sucesso!')
            break
        case 'Atualizado':
            showPageStatusModal('success', pageStatus, 'Registro atualizado com sucesso!')
            break
        case 'Erro':
            showPageStatusModal('error', pageStatus, textStatus)
            break
    }  

    urlParams.delete('status')
    const newUrl = window.location.pathname
    history.replaceState(null, null, newUrl)
})();

// =============== ROUTE ACCESS CONTROLLER ===============
(function routeAccessControl() {
	if (localStorage.getItem("username") == null) {
		window.location.href = "/login?status=Erro&text=Realize_o_login!"
	}
})()

// =============== ATUALIZAR O CADASTRO DO FUNCIONARIO LOGADO ===============
function updateRegister() {
	const userId = localStorage.getItem("userId")
	
	window.location.href="/atualizar-cadastro/" + userId
}

// =============== PERMISSIONS CONTROLLER ===============
(function verifyEmployeePermissions() {
	const route = window.location.pathname
	const routeUpdate = route.split('/')[1]
	const userOccupation = localStorage.getItem("occupation")
	let accessLevel
	switch(userOccupation) {
		case "Administrador":
			accessLevel = 0
			break
		case "Gerente":
			accessLevel = 1
			break
		case "Veterinário":
			accessLevel = 2
			break
		case "Auxiliar":
			accessLevel = 3
			break
		case "Almoxarife":
			accessLevel = 4
			break
		default:
			accessLevel = 100
			break
	}

	// funções administrativas
	if ((route ==="/cargos" || route ==="/criar-cargo" || routeUpdate ==="atualizar-cargo") && accessLevel > 1) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/departamentos" || route ==="/criar-departamento" || routeUpdate ==="atualizar-departamento") && accessLevel > 1) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/funcionarios" || route ==="/criar-funcionario" || routeUpdate ==="atualizar-funcionario") && accessLevel > 1) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	// demais funções
	if ((route ==="/clientes" || route ==="/criar-cliente" || routeUpdate ==="atualizar-cliente") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 3)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/adocoes" || route ==="/criar-adocao" || routeUpdate ==="atualizar-adocao") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 3)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/campanhas-adocao" || route ==="/criar-campanha-adocao" || routeUpdate ==="atualizar-campanha-adocao") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 3)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/relatorios-animais" || route ==="/criar-relatorio-animal" || routeUpdate ==="atualizar-relatorio-animal") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 3 || accessLevel === 2)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/categorias-animais" || route ==="/criar-categoria-animal" || routeUpdate ==="atualizar-categoria-animal") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 2)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/medicamentos" || route ==="/criar-medicamento" || routeUpdate ==="atualizar-medicamento") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 2 || accessLevel === 4)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	if ((route ==="/fornecedores" || route ==="/criar-fornecedor" || routeUpdate ==="atualizar-fornecedor") && !(accessLevel === 0 || accessLevel === 1 || accessLevel === 4)) {
		window.location.href = "/painel?status=Erro&text=Nivel_de_acesso_insuficiente!"
	}
	
	changeMenuStyles()
})()

// TROCAR O ESTILO DOS LINKS DO MENU PELO CARGO
function changeMenuStyles() {
	const links = document.querySelectorAll(".header-content_menu a")
	
	links[1].classList.remove("disabled-link")
	links[2].classList.remove("disabled-link")
	links[3].classList.remove("disabled-link")
	links[4].classList.remove("disabled-link")
	links[5].classList.remove("disabled-link")
	links[6].classList.remove("disabled-link")
	links[7].classList.remove("disabled-link")
	links[8].classList.remove("disabled-link")
	links[9].classList.remove("disabled-link")

	if (localStorage.getItem("occupation") == "Veterinário") {
		links[1].classList.add("disabled-link")
		links[2].classList.add("disabled-link")
		links[3].classList.add("disabled-link")
		links[4].classList.add("disabled-link")
		links[5].classList.add("disabled-link")
		links[6].classList.add("disabled-link")
		links[10].classList.add("disabled-link")
	}
	
	if (localStorage.getItem("occupation") == "Auxiliar") {
		links[1].classList.add("disabled-link")
		links[2].classList.add("disabled-link")
		links[3].classList.add("disabled-link")
		links[8].classList.add("disabled-link")
		links[9].classList.add("disabled-link")
		links[10].classList.add("disabled-link")
	}
	
	if (localStorage.getItem("occupation") == "Almoxarife") {
		links[1].classList.add("disabled-link")
		links[2].classList.add("disabled-link")
		links[3].classList.add("disabled-link")
		links[4].classList.add("disabled-link")
		links[5].classList.add("disabled-link")
		links[6].classList.add("disabled-link")
		links[7].classList.add("disabled-link")
		links[8].classList.add("disabled-link")
	}
	
	if (localStorage.getItem("occupation") == "") {
		links[1].classList.add("disabled-link")
		links[2].classList.add("disabled-link")
		links[3].classList.add("disabled-link")
		links[4].classList.add("disabled-link")
		links[5].classList.add("disabled-link")
		links[6].classList.add("disabled-link")
		links[7].classList.add("disabled-link")
		links[8].classList.add("disabled-link")
		links[9].classList.add("disabled-link")
		links[10].classList.add("disabled-link")
	}
}