import React, { createContext, ReactNode, useState } from "react";

interface IngredientContextProps {
  ingredients: Object[];
  addIngredient: (ingredient: Object) => void;
  removeIngredient: (index: number) => void;
}

const IngredientContext = createContext<IngredientContextProps | undefined>(
  undefined
);

const IngredientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ingredients, setIngredients] = useState<Object[]>([]);

  const addIngredient = (ingredient: Object) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <IngredientContext.Provider
      value={{ ingredients, addIngredient, removeIngredient }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export { IngredientContext, IngredientProvider };
