// import { makeAutoObservable, runInAction } from "mobx";
// import { RecipeData } from "../types/RecipeData";
// import axios from "axios";

// class RecipeStore {
//     recipes: RecipeData[] = [];
//     selectedRecipe: RecipeData | null = null;
//     loading: boolean = false;

//     constructor() {
//         makeAutoObservable(this);
//         this.getRecipes(); // טוען מתכונים בעת יצירת ה-Store
//     }

//     async getRecipes() {
//         this.setLoading(true);
//         try {
//             const res = await axios.get("http://localhost:8787/api/recipes/");
//             this.setRecipes(res.data);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             this.setLoading(false);
//         }
//     }

//     async addRecipe(newRecipe: RecipeData) {
//         try {
//             const res = await axios.post("http://localhost:8787/api/recipes", newRecipe);
//             runInAction(() => {
//                 this.recipes.push(res.data); // מוסיף את המתכון לרשימה הקיימת
//             });
//         } catch (e) {
//             console.log("Error adding recipe:", e);
//         }
//     }

//     setRecipes(recipes: RecipeData[]) {
//         this.recipes = recipes;
//     }

//     setSelectedRecipe(recipe: RecipeData | null) {
//         this.selectedRecipe = recipe;
//     }

//     setLoading(isLoading: boolean) {
//         this.loading = isLoading;
//     }

//     selectRecipeById(id: number) {
//         this.selectedRecipe = this.recipes.find((recipe) => recipe.id === id) || null;
//     }
// }

// const recipeStore = new RecipeStore();
// export default recipeStore;


import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { RecipeData } from "../types/RecipeData";

class RecipeStore {
    recipes: RecipeData[] = [];
    selectedRecipe: RecipeData | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.getRecipes(); // טוען מתכונים בעת יצירת ה-Store
    }

    async getRecipes() {
        this.setLoading(true);
        try {
            const res = await axios.get("http://localhost:8787/api/recipes/");
            this.setRecipes(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    setRecipes(recipes: RecipeData[]) {
        this.recipes = recipes;
         this.recipes = [...new Map(recipes.map(recipe => [recipe.id, recipe])).values()];

    }

    addRecipe(recipe: RecipeData) {
        this.recipes.push(recipe); // ✅ הוספת מתכון חדש מיידית
    }

    setSelectedRecipe(recipe: RecipeData | null) {
        this.selectedRecipe = recipe;
    }

    setLoading(isLoading: boolean) {
        this.loading = isLoading;
    }

    selectRecipeById(id: string) {
        this.selectedRecipe = this.recipes.find((recipe) => recipe.id === id) || null;
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;
