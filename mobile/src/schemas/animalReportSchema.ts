import * as yup from 'yup'

export const animalReportSchema = yup.object({
  animalName: yup
    .string()
    .required('O nome do animal é obrigatório')
    .min(4, 'O nome precisa conter no mínimo 3 caracteres'),
  medicine: yup.string().required('A situação de saúde é obrigatória'),
  animalCategory: yup.string().required('A categoria do animal é obrigatório'),
  arrivalDate: yup
    .string()
    .required('A data de chegada do animal é obrigatória')
    .matches(
      /\d{2}\/\d{2}\/\d{4}/,
      'A data de chegada precisa estar no formato correto. Por favor, use DD/MM/YYYY',
    ),

  local: yup
    .string()
    .required('O local onde o animal foi encontrado é obrigatório')
    .min(5, 'O local precisa conter no mínimo 5 caracteres'),
  description: yup
    .string()
    .required('A descrição é obrigatória')
    .min(10, 'A descrição precisa conter no mínimo 10 caracteres'),
})

export type AnimalReportSchema = yup.InferType<typeof animalReportSchema>

export type AnimalReportDTO = AnimalReportSchema & {
  id: string
  animalName: string
  medicine: string
  animalCategory: string
  arrivalDate: Date
  local: string
  description: string
  createdAt: string
}
