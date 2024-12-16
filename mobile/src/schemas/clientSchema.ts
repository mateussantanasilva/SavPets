import * as yup from 'yup'

export const clientSchema = yup.object({
  firstName: yup
    .string()
    .required('O primeiro nome é obrigatório')
    .min(3, 'O primeiro nome precisa ter no mínimo 3 caracteres'),
  lastName: yup
    .string()
    .required('O último nome é obrigatório')
    .min(3, 'O último nome precisa ter no mínimo 3 caracteres'),
  telephone: yup
    .string()
    .nullable()
    .optional()
    .default(null)
    .matches(
      /\(\d{2}\)\d{5}-\d{4}/,
      'Formato de telefone inválido. Por favor, use (00)00000-0000 ',
    ),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(
      /\d{3}\.\d{3}\.\d{3}-\d{2}/,
      'Formato de CEP inválido. Por favor, use 000.000.000-00',
    ),
  cep: yup
    .string()
    .required('O CEP é obrigatório')
    .matches(
      /\d{5}-\d{3}/,
      'Formato de CEP inválido. Por favor, use 00000-000',
    ),
  address: yup.string(),
  locationNumber: yup
    .number()
    .required('O número da residência é obrigatório')
    .min(1, 'O número da residência precisa ser superior a 1'),
  complement: yup.string().optional().nullable(),
})

export type ClientSchema = yup.InferType<typeof clientSchema>

export type ClientDTO = ClientSchema & {
  id: string
  createdAt: Date
}
