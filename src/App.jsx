import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AboutPage } from "./pages/AboutPage";
// import { MiniNav } from "./components/ui/MiniNav";

export function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate(); // ✅ navigatiehook

  const handleSelect = (recipe) => {
    setSelectedRecipe(recipe);
    navigate("/recipe"); // ✅ navigeer direct
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    navigate("/"); // ✅ terug naar lijst
  };

  return (
    <>
      {/* <MiniNav /> */}
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/"
          element={<RecipeListPage onSelectedRecipe={handleSelect} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage onSelectedRecipe={handleSelect} />}
        />
        <Route
          path="/recipe"
          element={
            selectedRecipe ? (
              <RecipePage recipe={selectedRecipe} onBack={handleBack} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}
