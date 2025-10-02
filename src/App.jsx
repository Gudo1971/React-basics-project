import { useState } from "react";
import { RecipeListPage } from "./pages/RecipeListPage";
//import RecipePage from "./components/ui/RecipePage";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      {selectedRecipe ? (
        <RecipePage
          ricpe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      ) : (
        <RecipeListPage onSelectedRecipe={setSelectedRecipe} />
      )}
    </div>
  );
};
