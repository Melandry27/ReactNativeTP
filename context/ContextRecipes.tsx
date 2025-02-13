import React, { createContext, ReactNode, useState } from "react";
import { formatRecipe } from "../services/request";

interface RecipesContextProps {
  recipes: Object[];
  addRecipe: (recipe: []) => void;
  removeRecipe: (index: number) => void;
  totalCalories: number;
  totalProteins: number;
  totalCarbs: number;
  totalFats: number;
}

const RecipeContext = createContext<RecipesContextProps | undefined>(undefined);

const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Object[]>([]);

  const addRecipe = (recipe: []) => {
    formatRecipe(recipe);

    setRecipes([...recipes, recipe]);
  };

  const removeRecipe = (index: number) => {
    const newIngredients = [...recipes];
    newIngredients.splice(index, 1);
    setRecipes(newIngredients);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
