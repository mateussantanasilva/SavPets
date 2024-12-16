import * as yup from 'yup'

export const occupationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O nome é obrigatório')
    .min(4, 'O nome precisa conter no mínimo 4 caracteres'),
  description: yup
    .string()
    .trim()
    .required('A descrição é obrigatória')
    .min(10, 'A descrição precisa conter no mínimo 10 caracteres'),
})

export type OccupationSchema = yup.InferType<typeof occupationSchema>

export type OccupationDTO = OccupationSchema & {
  id: string
  name: string
  description: string
  createdAt: string
}
