import * as yup from 'yup'

export const medicineSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome precisa ter no mínimo 3 caracteres'),
  manufacturingDate: yup
    .string()
    .trim()
    .required('A data de fabricação é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato de data inválido. Por favor, use YYYY-MM-DD.',
    ),
  expirationDate: yup
    .string()
    .trim()
    .required('A data de validade é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato de data inválido. Por favor, use YYYY-MM-DD.',
    ),
  utility: yup.string().required('A utilidade é obrigatória'),
  observation: yup.string().optional().nullable(),
  amount: yup
    .number()
    .required('A quantidade é obrigatória')
    .min(1, 'A quantidade precisa ser superior a 1')
    .integer('O número precisa ser inteiro')
    .typeError('A quantidade precisa ser um número'),
  arrivalDate: yup
    .string()
    .trim()
    .required('A data de chegada é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato de data inválido. Por favor, use YYYY-MM-DD.',
    ),
  leaflet: yup
    .string()
    .required('A bula é obrigatória')
    .min(10, 'A bula precisa ter no mínimo 10 caracteres'),
  provider: yup.string(),
})

export type MedicineSchema = yup.InferType<typeof medicineSchema>

export type MedicineDTO = MedicineSchema & {
  id: string
  createdAt: Date
}
