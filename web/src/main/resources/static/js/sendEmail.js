const formContact = document.querySelector('.form')

$(document).ready((event) => {
  $(formContact).submit((event) => {
    event.preventDefault()
    spinnerLoading.classList.add('active-loading')
    vlibrasWidget.classList.add('active-loading')
    document.body.classList.add('active-loading')

    const name = $('#name').val()
    const clientEmail = $('#email').val()
    const subject = $('#topic').val()
    const content = $('#message').val()

    $.ajax({
      url: '/api/v1/cadastros/enviar-email',
      type: 'POST',
      data: { name, clientEmail, subject, content },
      success: () => {
        spinnerLoading.classList.remove('active-loading')
        vlibrasWidget.classList.remove('active-loading')
        document.body.classList.remove('active-loading')

        Swal.fire({
          title: 'Sucesso',
          text: 'Email enviado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#a4cbe0'
        })

        $('#name').val()
        $('#email').val()
        $('#topic').val()
        $('#message').val()
      }
    })
  })
})