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
})()