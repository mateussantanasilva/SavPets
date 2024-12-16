import * as yup from 'yup'

export const campaignSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O nome é obrigatório')
    .min(5, 'O nome deve conter pelo menos 5 caracteres'),
  date: yup
    .string()
    .trim()
    .required('A data da campanha é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato de data inválido. Por favor, use YYYY-MM-DD.',
    )
    .test(
      'is-future-date',
      'A data da campanha não pode ser anterior à data atual',
      function (value) {
        const currentDate = new Date()
        const selectedDate = new Date(value)

        return selectedDate.getTime() > currentDate.getTime()
      },
    )
    .test(
      'is-correct-length',
      'A data deve conter 10 caracteres',
      function (value) {
        return value.length === 10
      },
    ),
  startTime: yup
    .string()
    .trim()
    .required('O Horário de início é Obrigatório')
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'Formato de horário inválido. Por favor, use HH:MM',
    )
    .test(
      'is-correct-length',
      'O Horário de início deve conter 5 caracteres (HH:MM)',
      function (value) {
        return value.length === 5
      },
    ),
  endTime: yup
    .string()
    .trim()
    .required('O Horário encerramento é Obrigatório')
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'Formato de horário inválido. Por favor, use HH:MM',
    )
    .test(
      'is-correct-length',
      'O Horário de encerramento deve conter 5 caracteres (HH:MM)',
      function (value) {
        return value.length === 5
      },
    ),
  location: yup
    .string()
    .trim()
    .required('A Localização é Obrigatória')
    .min(10, 'A Localização deve conter pelo menos 10 caracteres'),

  description: yup
    .string()
    .trim()
    .required('A Descrição é Obrigatória')
    .min(20, 'A descrição deve conter pelo menos 20 caracteres'),
})

export type CampaignSchema = yup.InferType<typeof campaignSchema>

export type CampaignDTO = CampaignSchema & {
  id: string
}
