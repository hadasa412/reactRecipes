import React, { useState, useContext } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../UserContext';
import recipeStore from '../stores/RecipeStore';
import { observer } from 'mobx-react-lite';
interface RecipeFormProps {
  onSubmit?: (data: any) => void;
  onClose: () => void;}
const RecipeForm: React.FC<RecipeFormProps> = observer((onClose) => {
  const { state } = useContext(UserContext);
  const userId = state?.user?.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredient: '' }]);
  const [instructions, setInstructions] = useState('');
  const onSubmitHandler = () => {
    if (!userId) {
      console.error("❌ שגיאה: המשתמש לא מחובר, userId חסר.");
      return;    }
      const products = ingredients.map(item => item.ingredient);
      const dataWithUserId = { title, description, products, ingredients, instructions, userId };
    axios.post("http://localhost:8787/api/recipes/", dataWithUserId, {
      headers: { 'user-id': userId },    })
    .then(response => {
      recipeStore.addRecipe(response.data.recipe);
       onClose.onClose();    })
    .catch(error => {
      console.error("❌ שגיאה בשמירת המתכון:", error.response?.data || error.message);    });
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleIngredientsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredient = e.target.value;
    setIngredients(updatedIngredients);
  };
  const handleInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstructions(e.target.value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler(); }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#9c27b0' }}> הוסף מתכון חדש </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           <TextField
            value={title}
            onChange={handleTitleChange}
            fullWidth
            label="שם המתכון"
            sx={{ backgroundColor: 'white' }}/>
          <TextField
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            label="תיאור"
            multiline
            rows={3}
            sx={{ backgroundColor: 'white' }} />
          <Typography variant="h6" sx={{ color: '#9c27b0', mt: 2 }}>הוסף מרכיבים</Typography>
          {ingredients.map((item, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={index}>
              <TextField
                value={item.ingredient}
                onChange={(e) => handleIngredientsChange(index, e)}
                fullWidth
                label={`מרכיב ${index + 1}`}
                sx={{ backgroundColor: 'white' }} />
              <Button variant="outlined" color="error"
                onClick={() => {const updatedIngredients = ingredients.filter((_, i) => i !== index);
                  setIngredients(updatedIngredients);
                }}> מחק
              </Button>
            </Box>))}
          <Button
            variant="contained" sx={{ mt: 2 }} onClick={() => setIngredients([...ingredients, { ingredient: '' }])}
          > הוסף מרכיב
          </Button>
          <TextField
            value={instructions}
            onChange={handleInstructionsChange}
            fullWidth
            label="הוראות הכנה"
            multiline
            rows={4}
            sx={{ backgroundColor: 'white', mt: 2 }}
          /></Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#9c27b0',
              '&:hover': { backgroundColor: '#7b1fa2' },
            }} >
            הוסף מתכון
          </Button>
        </Box>
      </Box>
    </form>
  );
});
export default RecipeForm;
