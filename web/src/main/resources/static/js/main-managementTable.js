// =============== DATATABLES SETTINGS ===============
$(document).ready(function () {
    $('#example').DataTable({
        responsive: true,
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
        }
    });
});

// =============== ACTIONS TABLE SETTINGS ===============
function showDeleteConfirmationModal(event) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#a4cbe0',
        cancelButtonColor: '#ff7575',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Deletado',
                text: 'Registro apagado com sucesso!',
                icon: 'success',
                confirmButtonColor: '#a4cbe0'
            })

            executeDeleteMethod(event)
        }
    })
}

function executeDeleteMethod(event) {
    const deleteBtn = event.target.closest('a')
    const url = deleteBtn.href.split('/')
    
    let endpoint = url.filter(Boolean)[2]  // 0º(http)://1º(host)/2º(objective)/3º(id)
    endpoint = '/' + endpoint

    const id = url.filter(Boolean)[3]

    window.location.href = `${endpoint}/${id}`
}