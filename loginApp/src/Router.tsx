import { Route, Routes } from "react-router"
import Home from "./components/Home"
import About from "./components/About"
import AppLayout from "./components/AppLayout"
import { UserProvider } from "./UserContext"
import AddRecipe from "./components/AddRecipe"
import { Navigate, createBrowserRouter } from "react-router-dom"
import AddRecipeButton from "./components/AddRecipeButton"
import HomePage from "./components/HomePage"
import UpdateUser from "./components/UpdateUser"
import Recipes from "./components/Recipes"
import Login from "./components/Login"

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>שגיאה בטעינת העמוד</>,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/add-recipe',
                element: <AddRecipe />,
            },
            {
                path: '/update-user',
                element: <UpdateUser />,
            },
            {
                path: '/recipes',
                element: <Recipes />,
            }
        ],
    },
]);