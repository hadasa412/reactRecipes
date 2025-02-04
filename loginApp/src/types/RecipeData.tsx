export interface RecipeData {
  id:string,
    title: string;
    description: string;
    ingredients: { ingredient: string }[];  // אובייקטים במקום סטרינגים בלבד
    instructions: string;
  }
  