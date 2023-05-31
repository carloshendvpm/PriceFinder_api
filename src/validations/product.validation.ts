import * as Yup from 'yup';

export const idSchema = Yup.number().positive().integer().required();