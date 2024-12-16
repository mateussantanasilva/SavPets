// Data para a validação posterior
const date = new Date()

function verifyMonth(month) {
  if (month < 9)
    return `0${month + 1}`
  else
    return month + 1
}

const todayDate = `${date.getDate()}/${verifyMonth(date.getMonth())}/${date.getFullYear()}`
const todayDateValidation = `${date.getFullYear()}-${verifyMonth(date.getMonth())}-${date.getDate()}`

const validator = new JustValidate('.form',
  {
    errorLabelStyle: {
      border: 'initials',
      color: 'var(--btn-red-color)',
      fontWeight: '500'
    },
    validateBeforeSubmitting: true,
  }
)

// adicione mais regras para cada campo que for necessário
const fieldsRules = {

  // REGRA PARA CAMPOS
  necessaryToSelect: [
    { rule: 'required', errorMessage: 'selecione alguma opção' },
  ],
  necessaryToSelect2: [ // Para quando tiver mais de 1 select obrigatório na mesma página (provisório)
    { rule: 'required', errorMessage: 'selecione alguma opção' },
  ],
  necessaryToSelect3: [
    { rule: 'required', errorMessage: 'selecione alguma opção' },
  ],
  necessaryToSelect4: [
    { rule: 'required', errorMessage: 'selecione alguma opção' },
  ],

  // REGRAS DE FORMULARIOS GERAIS
  name: [
    { rule: 'required', errorMessage: 'nome é obrigatório' },
    { rule: 'minLength', value: 4, errorMessage: 'nome deve conter no mínimo 4 caracteres' }
  ],
  cpf: [
    { rule: 'required', errorMessage: 'CPF é obrigatório' },
    { rule: 'minLength', value: 14, errorMessage: 'CPF deve possuir todos os caracteres' },
    { rule: 'maxLength', value: 14, errorMessage: 'CPF deve possuir todos os caracteres' },
    { rule: 'customRegexp', value: /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/, errorMessage: 'CPF está no formato errado' }
  ],
  firstName: [
    { rule: 'required', errorMessage: 'primeiro nome é obrigatório' },
    { rule: 'minLength', value: 2, errorMessage: 'primeiro nome deve possuir no mínimo 2 caracteres' }
  ],
  lastName: [
    { rule: 'required', errorMessage: 'último nome é obrigatório' },
    { rule: 'minLength', value: 2, errorMessage: 'último nome deve possuir no mínimo 2 caracteres' }
  ],
  cep: [
    { rule: 'required', errorMessage: 'CEP é obrigatório' },
    { rule: 'minLength', value: 9, errorMessage: 'CEP deve possuir todos os caracteres' },
    { rule: 'maxLength', value: 9, errorMessage: 'CEP deve possuir todos os caracteres' },
    { rule: 'customRegexp', value: /(^[0-9]{5})-?([0-9]{3}$)/, errorMessage: 'CEP está no formato incorreto' }
  ],
  rua: [
    { rule: 'required', errorMessage: 'endereço é obrigatório' },
    { rule: 'minLength', value: 5, errorMessage: 'endereço deve possuir ao menos 5 caracteres' }
  ],
  locationNumber: [
    { rule: 'required', errorMessage: 'número da residência é obrigatório' },
    { rule: 'minNumber', value: 1, errorMessage: 'digite apenas o(s) número(s) da residência' }
  ],
  email: [
    { rule: 'required', errorMessage: 'e-mail é obrigatório' },
    { rule: 'email', errorMessage: 'e-mail deve possuir um e-mail válido' }
  ],

  // REGRAS DO FORMULARIO DEPARTAMENTO

  initials: [
    { rule: 'required', errorMessage: 'iniciais é obrigatório' },
    { rule: 'minLength', value: 2, errorMessage: 'iniciais deve conter no mínimo 2 caracteres' },
    { rule: 'maxLength', value: 3, errorMessage: 'iniciais deve conter no máximo 3 caracteres' }
  ],

  // REGRAS DO FORMULARIO CATEGORIA ANIMAL
  race: [
    { rule: 'required', errorMessage: 'raça é obrigatório' },
    { rule: 'minLength', value: 3, errorMessage: 'raça deve conter no mínimo 3 caracteres' }
  ],
  gender: [
    { rule: 'required', errorMessage: 'gênero é obrigatório' },
    { rule: 'minLength', value: 3, errorMessage: 'gênero deve conter no mínimo 3 caracteres' },
    { rule: 'maxLength', value: 9, errorMessage: 'gênero deve conter no máximo 9 caracteres' }

  ],
  size: [
    { rule: 'required', errorMessage: 'porte é obrigatório' },
    { rule: 'minLength', value: 1, errorMessage: 'porte deve conter no mínimo 1 caracteres' }
  ],
  peltColor: [
    { rule: 'required', errorMessage: 'cor é obrigatório' },
    { rule: 'minLength', value: 4, errorMessage: 'cor deve conter no mínimo 3 caracteres' }
  ],
  // REGRAS DO FORMULARIO MEDICAMENTO
  description: [
    { rule: 'required', errorMessage: 'descrição é obrigatório' },
    { rule: 'minLength', value: 10, errorMessage: 'descrição deve conter no mínimo 10 caracteres' }
  ],
  utility: [
    { rule: 'required', errorMessage: 'utilidade é obrigatório' }
  ],
  medicineName: [
    { rule: 'required', errorMessage: 'nome do medicamento é obrigatório' }
  ],
  leaflet: [
    { rule: 'required', errorMessage: 'bula é obrigatório' },
    { rule: 'minLength', value: 10, errorMessage: 'bula deve conter no mínimo 10 caracteres' }
  ],
  expirationDate: [
    { rule: 'required', errorMessage: 'data de validade é obrigatório' }
  ],
  arrivalDate: [
    { rule: 'required', errorMessage: 'data de chegada é obrigatório' }
  ],
  amount: [
    { rule: 'required', errorMessage: 'quantidade é obrigatório' },
    { rule: 'minNumber', value: 1, errorMessage: 'digite apenas números para a quantidade' }
  ],
  manufacturingDate: [
    { rule: 'required', errorMessage: 'data de fabricação é obrigatório' }
  ],

  // REGRAS DO FORMULARIO CAMPANHAS ADOCAO
  descriptionCampaign: [
    { rule: 'required', errorMessage: 'descrição é obrigatório' },
    { rule: 'minLength', value: 10, errorMessage: 'descrição deve conter no mínimo 10 caracteres' },
    { rule: 'maxLength', value: 180, errorMessage: 'descrição deve conter no máximo 180 caracteres' }
  ],

  startTime: [
    { rule: 'required', errorMessage: 'início do evento é obrigatório' }
  ],
  endTime: [
    { rule: 'required', errorMessage: 'fim do evento é obrigatório' }
  ],

  // REGRAS DO FORMULARIO FUNCIONARIO
  accountNumber: [
    { rule: 'required', errorMessage: 'número da conta é obrigatório' },
    { rule: 'minNumber', value: 1, errorMessage: 'digite apenas os números da conta' }
  ],

  // REGRAS DO FORMULARIO RELATORIO ANIMAL
  local: [
    { rule: 'required', errorMessage: 'local é obrigatório' },
    { rule: 'minLength', value: 5, errorMessage: 'local deve possuir no mínimo 5 caracteres' }
  ],

  // REGRAS DO FORMULARIO CLIENTE
  telefone: [
    { rule: 'required', errorMessage: 'telefone é obrigatório' },
    { rule: 'minLength', value: 14, errorMessage: 'telefone deve possuir todos caracteres' },
    { rule: 'maxLength', value: 14, errorMessage: 'telefone deve possuir todos caracteres' },
    { rule: 'customRegexp', value: /(\([0-9]{2}\)\s?[0-9]{4,5}-?[0-9]{3,4})|([0-9]{10,11})|([0-9]{2}\s?[0-9]{8,9})/, errorMessage: ' telefone está no formato errado' }
  ],
  surname: [
    { rule: 'required', errorMessage: 'sobrenome é obrigatório' },
    { rule: 'minLength', value: 3, errorMessage: 'sobrenome deve possuir no mínimo 3 caracteres' }
  ],

  // REGRAS DO FORMULARIO CADASTRO
  password: [
    { rule: 'required', errorMessage: 'senha é obrigatório' },
    { rule: 'strongPassword', errorMessage: 'a senha deve conter pelo menos 8 dígitos, uma letra maiúscula, uma minúscula, um caractere especial e um número' }
  ],



  // REGRAS DO FORMULARIO FORNECEDOR
  provider: [
    { rule: 'required', errorMessage: 'fornecedor é obrigatório' }
  ],
  cnpj: [
    { rule: 'required', errorMessage: 'CNPJ é obrigatório' },
    { rule: 'minLength', value: 18, errorMessage: 'CNPJ deve possuir todos os caracteres' },
    { rule: 'maxLength', value: 18, errorMessage: 'CNPJ deve possuir todos os caracteres' },
    { rule: 'customRegexp', value: /(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, errorMessage: 'CNPJ está no formato incorreto' }
  ]
}

// REGRA PARA  REPETIR SENHA
if (document.getElementById("repeatPassword") != null) {
  validator.addField(repeatPassword, [
    { rule: 'required', errorMessage: 'repetir senha é obrigatório' },
    { rule: 'strongPassword', errorMessage: 'a senha deve conter pelo menos 8 dígitos, uma letra maiúscula, uma minúscula, um caractere especial e um número' },
    {
      validator: (value, fields) => {
        if (
          fields['#password'] &&
          fields['#password'].elem
        ) {
          const repeatPasswordValue =
            fields['#password'].elem.value;
          return value === repeatPasswordValue;
        }
        return true;
      },
      errorMessage: 'repita a mesma senha',
    }])
}

if (document.getElementById("campaignDate") != null) {
  validator.addField("#campaignDate", [
    {
      rule: 'required',
      errorMessage: 'data da campanha é obrigatória'
    },
    {
      plugin: JustValidatePluginDate(() => ({
        format: 'yyyy-MM-dd',
        isAfterOrEqual: `${todayDateValidation}`,
      })),
      errorMessage: `data deve ser superior ou igual a ${todayDate}`,
    },
  ],)
}

const existingFieldsOnTheCurrentPage = document.querySelectorAll('input[id], select[id], textarea[id]')
existingFieldsOnTheCurrentPage.forEach(field => {

  field.addEventListener('input', (event) => {
    setTimeout(() => showValidationStatusIcon(event), 100) // delay para rodar depois de digitar
  })

  const fieldId = field.getAttribute('id')
  const rulesForThisField = fieldsRules[fieldId]

  if (rulesForThisField)
    addFieldWithRules([{ fieldId: fieldId, rules: rulesForThisField }])
})

function showValidationStatusIcon(event) {
  const field = event.target
  const fieldParent = field.parentNode
  const errorLabel = field.nextElementSibling

  if (errorLabel && errorLabel.classList.contains('just-validate-error-label')) {
    fieldParent.classList.add('exclamation')
    fieldParent.classList.remove('check')
  } else {
    fieldParent.classList.add('check')
    fieldParent.classList.remove('exclamation')
  }
}

function addFieldWithRules(fieldToAdd) {
  fieldToAdd.forEach(({ fieldId, rules }) => {
    const fieldRules = rules.map(({ rule, value, errorMessage }) => ({
      rule: rule,
      value: value,
      errorMessage: errorMessage,
    }))

    validator.addField(`#${fieldId}`, fieldRules)
  })
}

validator.onSuccess((event) => {
  const inputSubmit = document.querySelector('input.btn')
  const numFields = Object.values(validator.fields).length
  let validFields = 0

  for (let fieldName in validator.fields) {
    const fieldsHasContent = validator.fields[fieldName].elem.value !== ''
    const inputSubmitHasAttribute = inputSubmit.hasAttribute('data-just-validate-fallback-disabled')

    if (fieldsHasContent && inputSubmitHasAttribute)
      validFields++
  }

  if (numFields === validFields)
    event.target.submit()
})