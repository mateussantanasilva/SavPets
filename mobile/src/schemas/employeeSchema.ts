import * as yup from 'yup'

export const employeeSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(4, 'O nome deve possuir no mínimo 4 caracteres'),
  surname: yup
    .string()
    .required('O sobrenome é obrigatório')
    .min(4, 'O sobrenome deve possuir no mínimo 4 caracteres'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .trim()
    .email('O email deve ter um formato válido'),
  cpf: yup
    .string()
    .trim()
    .required('O CPF é obrigatório')
    .matches(
      /\d{3}\.\d{3}\.\d{3}-\d{2}/,
      'O CPF precisa estar no formato correto. Por favor use 000.000.000-00',
    ),
  cep: yup
    .string()
    .trim()
    .required('O CEP é obrigatório')
    .matches(
      /\d{5}-\d{3}/,
      'O CEP precisa estar no formato correto. Por favor use 00000-000',
    ),
  address: yup.string(),
  locationNumber: yup.number().required('O número da residência é obrigatório'),
  complement: yup.string().optional().nullable(),
  departament: yup.string().required('O departamento é obrigatório'),
  occupation: yup.string().required('O cargo é obrigatório'),
})

export type EmployeeSchema = yup.InferType<typeof employeeSchema>

export type EmployeeDTO = EmployeeSchema & {
  id: string
  password: string
  repeatPassword: string
  createdAt: Date
  accountNumber: string
}
