// =============== BACK TO TOP ===============
const backToTop = document.querySelector('.back-to-top')
const scrollDown = document.querySelector('.scroll-down')

window.addEventListener('scroll', () => {
    if (scrollY > 600) {
        backToTop.classList.add('activate_scroll-top')

        if (scrollDown)
            scrollDown.classList.add('hide_scroll-down')
    } else {
        backToTop.classList.remove('activate_scroll-top')

        if (scrollDown)
            scrollDown.classList.remove('hide_scroll-down')
    }
})

// =============== SCROLL REVEAL SETTINGS ===============
scrollReveal.reveal(`
    .presentation-container_welcome
`, { delay: 900 })

scrollReveal.reveal(`
    .optionshelp-container_title,
    .optionshelp-group_card,
    .about-container,
    .difference-container_description,
    .difference-highlights_item,
    .start-container,
    .contact-container,
    .main-title,
    .main-subtitle,
    .title_amount-campaign,
    .campaign-content
`)

// =============== DATE CONVERT TO HTML ===============
const campaignsDates = document.querySelectorAll('.campaign-date')

campaignsDates.forEach((campaignDate) => {
    // Variável que irá receber a data em string, substituindo os traços por barras
    const campaignDateReplaced = campaignDate.innerText.replaceAll("-", "/")

    // Variável que irá converter a string criada em uma data
    const convertedDate = new Date(campaignDateReplaced)

    // Variável que irá representar o dia da semana
    let weekDay;
    // Switch para atribuir um dia da semana na variável 'weekday'
    switch (convertedDate.getDay()) {
        case 0:
            weekDay = "Domingo"
            break
        case 1:
            weekDay = "Segunda-feira"
            break
        case 2:
            weekDay = "Terça-feira"
            break
        case 3:
            weekDay = "Quarta-feira"
            break
        case 4:
            weekDay = "Quinta-feira"
            break
        case 5:
            weekDay = "Sexta-feira"
            break
        case 6:
            weekDay = "Sábado"
            break
    }

    // Variável que irá representar o mês
    let month;
    // Switch para atribuir um mês na variável 'month'
    switch (convertedDate.getMonth()) {
        case 0:
            month = "Janeiro"
            break
        case 1:
            month = "Fevereiro"
            break
        case 2:
            month = "Março"
            break
        case 3:
            month = "Abril"
            break
        case 4:
            month = "Maio"
            break
        case 5:
            month = "Junho"
            break
        case 6:
            month = "Julho"
            break
        case 7:
            month = "Agosto"
            break
        case 8:
            month = "Setembro"
            break
        case 9:
            month = "Outubro"
            break
        case 10:
            month = "Novembro"
            break
        case 11:
            month = "Dezembro"
            break
    }

    // Variável que representa a informação final
    // Inserindo o conteúdo necessário para a data da campanha
    campaignDate.innerText = `${weekDay}, ${convertedDate.getDate()} de ${month} de ${convertedDate.getFullYear()}`
})