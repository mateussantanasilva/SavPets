// =============== CONTRAST SETTINGS ===============
(function changeThemeToHighContrastAfterPageLoad() {
    const activeContrast = localStorage.getItem('contrast') // !!activeContrast == true // !activeContrast == false

    if (activeContrast === 'yes') {
        bodyElement.classList.toggle('contrast')
    }
})()

const btnContrast = document.querySelector('.accessibility-group_contrast')
btnContrast.addEventListener('click', () => changeThemeToHighContrast())

function changeThemeToHighContrast() {
    const activeContrast = localStorage.getItem('contrast') // !activeContrast == true // !!activeContrast == false

    if (activeContrast === 'yes')
        localStorage.setItem('contrast', 'no')
    else 
        localStorage.setItem('contrast', 'yes')

    bodyElement.classList.toggle('contrast')
}

// =============== CHANGE FONT SIZE SETTINGS ===============
const textElements = Array.from(document.querySelectorAll('body *')).filter(element => {

    const elementStyles = getComputedStyle(element)
    let elementIsVisible

    if (elementStyles.textContent !== '') {
        elementIsVisible = elementStyles.getPropertyValue('display') !== 'none'

        return elementIsVisible
    }
})

const storeOriginalFontSizes = getCurrentFontSizeOfElements(textElements)
function getCurrentFontSizeOfElements(textElements) {
    return textElements.map(element => {
        const elementStyles = getComputedStyle(element)
        return parseFloat(elementStyles.fontSize)
    })
}

const btnIncreaseFont = document.querySelector('.accessibility-item_increase')
const btnDecreaseFont = document.querySelector('.accessibility-item_decrease')

btnIncreaseFont.addEventListener('click', () => {
    const currentFontSizeOfTextElements = getCurrentFontSizeOfElements(textElements)
    increaseFont(textElements, currentFontSizeOfTextElements, btnIncreaseFont, btnDecreaseFont)
})

btnDecreaseFont.addEventListener('click', () => {
    const currentFontSizeOfTextElements = getCurrentFontSizeOfElements(textElements)
    decreaseFont(textElements, currentFontSizeOfTextElements, storeOriginalFontSizes, btnIncreaseFont, btnDecreaseFont)
})

function increaseFont(textElements, currentFontSizeOfTextElements, btnIncreaseFont, btnDecreaseFont) {
    if (btnDecreaseFont.classList.contains('accessibility-disabled'))
        btnDecreaseFont.classList.remove('accessibility-disabled')

    textElements.forEach((element, index) => {
        const fontSize = currentFontSizeOfTextElements[index]

        if (fontSize < 24)
            element.style.fontSize = `${fontSize + 2}px`

        const allFontsReachMaxSize = currentFontSizeOfTextElements.every(fontSize => fontSize >= 24)

        if (allFontsReachMaxSize)
            btnIncreaseFont.classList.add('accessibility-disabled')
    })
}

function decreaseFont(textElements, currentFontSizeOfTextElements, storeOriginalFontSizes, btnIncreaseFont, btnDecreaseFont) {
    if (btnIncreaseFont.classList.contains('accessibility-disabled'))
        btnIncreaseFont.classList.remove('accessibility-disabled')

    textElements.forEach((element, index) => {
        const currentFontSize = currentFontSizeOfTextElements[index]
        const originalFontSize = storeOriginalFontSizes[index]

        if (currentFontSize > originalFontSize)
            element.style.fontSize = `${currentFontSize - 2}px`

        const allFontsReachMinSize = currentFontSizeOfTextElements.every((fontSize, index) => fontSize === storeOriginalFontSizes[index])

        if (allFontsReachMinSize)
            btnDecreaseFont.classList.add('accessibility-disabled')
    })
}