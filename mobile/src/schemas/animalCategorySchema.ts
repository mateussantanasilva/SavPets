import * as yup from 'yup'

export const animalCategorySchema = yup.object({
  name: yup
    .string()
    .required('O Nome é obrigatório')
    .min(3, 'O Nome precisa conter no mínimo 3 caracteres'),
  race: yup
    .string()
    .required('A Raça é obrigatória')
    .min(3, 'A Raça precisa conter no mínimo 3 caracteres'),
  gender: yup.string().required('O Gênero é obrigatório'),
  size: yup.string().required('O Porte é obrigatório'),
  coatColor: yup
    .string()
    .required('A Cor é obrigatória')
    .min(3, 'A Cor precisa conter no mínimo 3 caracteres'),
})
export type AnimalCategorySchema = yup.InferType<typeof animalCategorySchema>

export type AnimalCategoryDTO = AnimalCategorySchema & {
  id: string
  gender: string
  race: string
  size: string
  coatColor: string
  createdAt: string
}
