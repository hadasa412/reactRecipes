import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import RecipeForm from "./RecipeForm";
import recipeStore from "../stores/RecipeStore";
import axios from "axios";

interface RecipeData {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
}

interface AddRecipeProps {
    onClose: () => void; // פונקציה לסגור את הטופס לאחר שמירה
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onClose }) => {
    const { state } = useContext(UserContext);

    // פונקציה לטיפול בהגשה של המתכון
    const handleRecipeSubmit = async (recipeData: RecipeData) => {
        try {
            const newRecipe = {
                ...recipeData,
                id: Date.now().toString(),
                userId: state.user?.id,
                createdAt: new Date().toISOString(),
            };
    
            // שליחה לשרת
            await axios.post("http://localhost:8787/api/recipes/", newRecipe);
    
            // הוספת המתכון ל-store אחרי שמירתו בשרת
            recipeStore.addRecipe(newRecipe);
    
            alert("המתכון נוסף בהצלחה!");
    
            // סגירת הטופס אחרי הצלחה
            if (onClose) {
                onClose(); // סוגרים את הדיאלוג
            }
        } catch (error) {
            console.error("שגיאה בשמירת המתכון:", error);
            alert("אירעה שגיאה בהוספת המתכון, נסה שוב.");
        }
    };
    

    return <RecipeForm onSubmit={handleRecipeSubmit} />;
};

export default AddRecipe;
