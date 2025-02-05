import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Grid, Divider, Button, Modal } from '@mui/material';
import RecipeForm from './RecipeForm';
const Recipes = observer(() => {
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
    useEffect(() => {
        recipeStore.getRecipes();
    }, []);
    useEffect(() => {
        if (recipeStore.recipes.length > 0 && !selectedRecipe) {
            setSelectedRecipe(recipeStore.recipes[0]);
        }
    }, [recipeStore.recipes]);
    return (
        <Box sx={{ width: '100%', minHeight: '100vh', padding: '20px', direction: 'rtl', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '30px', color: '#9c27b0', textAlign: 'center', fontWeight: 'bold' }}>
                (:המתכונים שלנו
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <List>
                            {recipeStore.recipes.map((recipe) => (
                                <ListItem
                                    key={recipe.id}
                                    onClick={() => setSelectedRecipe(recipe)}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedRecipe?.id === recipe.id ? '#f3e5f5' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#f3e5f5',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={recipe.title}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                color: selectedRecipe?.id === recipe.id ? '#9c27b0' : 'inherit',
                                                fontWeight: selectedRecipe?.id === recipe.id ? 'bold' : 'normal',
                                            },
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedRecipe && (
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        color: '#9c27b0',
                                        fontWeight: 'bold',
                                        marginBottom: '16px',
                                    }}                                >
                                    {selectedRecipe.title}
                                </Typography>

                                {selectedRecipe.description && (
                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ marginBottom: '16px' }}>
                                        {selectedRecipe.description}
                                    </Typography>
                                )}
                                {selectedRecipe.ingredients && (
                                    <>
                                        <Divider sx={{ margin: '16px 0' }} />
                                        <Typography variant="subtitle2" gutterBottom sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                                            מרכיבים:
                                        </Typography>
                                        <Typography variant="body2" paragraph sx={{ marginBottom: '16px', lineHeight: '1.6' }}>
                                            {selectedRecipe.ingredients.join(', ')}
                                        </Typography>
                                    </>
                                )}
                                {selectedRecipe.instructions && (
                                    <>
                                        <Divider sx={{ margin: '16px 0' }} />
                                        <Typography variant="subtitle2" gutterBottom sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                                            הוראות הכנה:
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: '1.6' }}>
                                            {selectedRecipe.instructions}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}</Grid>
            </Grid>
        </Box>);
});
export default Recipes;
