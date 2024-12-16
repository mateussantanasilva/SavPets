import * as yup from 'yup'

export const providerSchema = yup.object({
  name: yup
    .string()
    .required('A razão social é obrigatória')
    .min(3, 'A razão social precisa ter no mínimo 3 caracteres'),
  cnpj: yup
    .string()
    .required('O CNPJ é obrigatório')
    .matches(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      'O CNPJ precisa estar no formato correto (00.000.000/0000-00)',
    ),
  cep: yup
    .string()
    .required('O CEP é obrigatório')
    .matches(
      /^\d{5}-\d{3}/,
      'O CEP precisa estar no formato correto (00000-000)',
    ),
  address: yup.string(),
  locationNumber: yup
    .number()
    .required('O número do endereço é obrigatório')
    .min(1, 'O número do endereço deve ser maior do que 1'),
  complement: yup.string().optional().nullable(),
})

export type ProviderSchema = yup.InferType<typeof providerSchema>

export type ProviderDTO = {
  id: string
  name: string
  cnpj: string
  cep: string
  address: string
  locationNumber: number
  complement: string
  telephone: string
  email: string
  createdAt: Date
}
