import React, { useContext } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { TextField, Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { recipeSchema } from './recipeSchema';
import { UserContext } from '../UserContext';

interface RecipeFormProps {
  onSubmit: (data: any) => void;
  onClose?: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, onClose }) => {
  const { state } = useContext(UserContext);
  const userId = state?.user?.userId;

  console.log("🟢 UserContext:", state);
  console.log("🔹 userId:", userId);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(recipeSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  const onSubmitHandler = (data: any) => {
    console.log("📤 שליחת טופס!", data);

    if (!userId) {
      console.error("❌ שגיאה: המשתמש לא מחובר, userId חסר.");
      return;
    }

    const dataWithUserId = { ...data, userId };

    axios.post('http://localhost:8787/api/recipes/', dataWithUserId, {
      headers: { 'user-id': userId },
    })
    .then(response => {
      console.log("✅ המתכון נשמר בהצלחה:", response.data);
      onSubmit(response.data);
      if (onClose) onClose();
    })
    .catch(error => {
      console.error("❌ שגיאה בשמירת המתכון:", error.response?.data || error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log("📋 נתוני הטופס לפני שליחה:", data);
      onSubmitHandler(data);
    })}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#9c27b0' }}>
          הוסף מתכון חדש
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="שם המתכון"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="תיאור"
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={3}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />

          {/* מרכיבים דינמיים */}
          <Typography variant="h6" sx={{ color: '#9c27b0', mt: 2 }}>הוסף מרכיבים</Typography>
          {fields.map((item, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={item.id}>
              <Controller
                name={`ingredients.${index}.ingredient`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={`מרכיב ${index + 1}`}
                    error={!!errors.ingredients?.[index]?.ingredient}
                    helperText={errors.ingredients?.[index]?.ingredient?.message}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                מחק
              </Button>
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => append({ ingredient: '' })}
          >
            הוסף מרכיב
          </Button>

          <Controller
            name="instructions"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="הוראות הכנה"
                error={!!errors.instructions}
                helperText={errors.instructions?.message}
                multiline
                rows={4}
                sx={{ backgroundColor: 'white', mt: 2 }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#9c27b0',
              '&:hover': { backgroundColor: '#7b1fa2' },
            }}
          >
            הוסף מתכון
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RecipeForm;
