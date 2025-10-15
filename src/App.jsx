import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (recipe) => {
    console.log("Navigating to /recipe");
    setSelectedRecipe(recipe);
    navigate("/recipe");
  };

  const handleBack = () => {
    console.log("Navigating to /");
    setSelectedRecipe(null);
    navigate("/");
  };
  console.log("Current path:", window.location.pathname);
  return (
    <Routes>
      <Route
        path="/"
        element={<RecipeListPage onSelectedRecipe={handleSelect} />}
      />
      <Route
        path="/recipe"
        element={
          selectedRecipe ? (
            <RecipePage recipe={selectedRecipe} onBack={handleBack} />
          ) : (
            <RecipeListPage onSelectedRecipe={handleSelect} />
          )
        }
      />
    </Routes>
  );
};
