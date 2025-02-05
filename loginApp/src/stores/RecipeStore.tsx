


import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { RecipeData } from "../types/RecipeData";

class RecipeStore {
    recipes: RecipeData[] = [];
    selectedRecipe: RecipeData | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.getRecipes(); 
    }

    async getRecipes() {
        this.setLoading(true);
        try {
            const res = await axios.get("http://localhost:8787/api/recipes/");
            this.setRecipes(res.data);
        } catch (e) {
        } finally {
            this.setLoading(false);
        }
    }

    setRecipes(recipes: RecipeData[]) {
        this.recipes = recipes;
         this.recipes = [...new Map(recipes.map(recipe => [recipe.id, recipe])).values()];

    }

    addRecipe(recipe: RecipeData) {
        this.recipes.push(recipe); 
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
