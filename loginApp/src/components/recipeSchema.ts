import * as yup from 'yup';

export const recipeSchema = yup.object().shape({
  title: yup.string().required("יש להזין שם מתכון"),
  description: yup.string().required("יש להזין תיאור"),
  ingredients: yup
    .array()
    .of(yup.string().nullable())  
    .min(1, "יש להזין לפחות מרכיב אחד")
    .required("יש להזין רשימת מרכיבים"),
  instructions: yup.string().required("יש להזין הוראות הכנה"),
});
