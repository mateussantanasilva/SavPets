import * as yup from 'yup'

export const userCredentialsSchema = yup.object({
  email: yup
    .string()
    .email('O email deve ter um formato válido')
    .trim()
    .required('O email é obrigatório'),
  password: yup.string().trim().required('A senha é obrigatória'),
})

export const newUserCredentialsSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('O nome é obrigatório')
    .min(4, 'O nome precisa conter no mínimo 4 caracteres'),
  surname: yup
    .string()
    .trim()
    .required('O sobrenome é obrigatório')
    .min(4, 'O sobrenome precisa conter no mínimo 4 caracteres'),
  email: yup
    .string()
    .email('O email deve ter um formato válido')
    .trim()
    .required('O email é obrigatório'),
  password: yup
    .string()
    .trim()
    .required('A senha é obrigatória')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'A senha precisa conter pelo menos 8 dígitos, uma letra maiúscula, uma minúscula, um caractere especial e um número',
    ),
  repeatPassword: yup
    .string()
    .required('A confirmação da senha é obrigatória')
    .oneOf([yup.ref('password')], 'A confirmação deve ser igual a senha'),
})

export const updatedUserCredentialsSchema = yup.object({
  email: yup
    .string()
    .email('O email deve ter um formato válido')
    .trim()
    .required('O email é obrigatório'),
  password: yup
    .string()
    .trim()
    .required('A nova senha é obrigatória')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'A nova senha precisa conter pelo menos 8 dígitos, uma letra maiúscula, uma minúscula, um caractere especial e um número',
    ),
  repeatPassword: yup
    .string()
    .required('A confirmação da nova senha é obrigatória')
    .oneOf([yup.ref('password')], 'A confirmação deve ser igual a nova senha'),
})

export type UserCredentialsSchema = yup.InferType<typeof userCredentialsSchema>

export type NewUserCredentialsSchema = yup.InferType<
  typeof newUserCredentialsSchema
>

export type UpdatedUserCredentialsSchema = yup.InferType<
  typeof updatedUserCredentialsSchema
>
