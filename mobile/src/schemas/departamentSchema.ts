import * as yup from 'yup'

export const departamentSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O nome é obrigatório')
    .min(4, 'O nome precisa conter no mínimo 4 caracteres'),
  initials: yup
    .string()
    .trim()
    .required('As iniciais são obrigatórias')
    .min(2, 'As iniciais precisa conter no mínimo 2 caracteres')
    .max(3, 'As iniciais precisa conter no máximo 3 caracteres')
    .transform((value: string) => value.toUpperCase()),
})

export type DepartamentSchema = yup.InferType<typeof departamentSchema>

export type DepartamentDTO = DepartamentSchema & {
  id: string
  createdAt: string
}
