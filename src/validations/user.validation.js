import * as yup from "yup"

export const userValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  phone: yup.string().nullable(true),
  cpf: yup.string().required().min(11).max(11),
})