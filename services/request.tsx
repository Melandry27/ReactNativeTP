export const getIngredientsByQuery = async (query) => {
  let timeoutId: NodeJS.Timeout;

  return new Promise((resolve, reject) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EXPO_PUBLIC_CLERK_APPLICATION_ID}&app_key=${process.env.EXPO_PUBLIC_CLERK_APPLICATION_KEY}&ingr=${query}`
        );

        if (!response.ok) throw new Error("Failed to fetch ingredients");
        const data = await response.json();

        resolve(data.hints);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const getIngredientsByBarcode = async (upc) => {
  let timeoutId: NodeJS.Timeout;

  return new Promise((resolve, reject) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EXPO_PUBLIC_CLERK_APPLICATION_ID}&app_key=${process.env.EXPO_PUBLIC_CLERK_APPLICATION_KEY}&upc=${upc}`
        );

        if (!response.ok) throw new Error("Failed to fetch ingredients");
        const data = await response.json();

        resolve(data.hints);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const formatRecipe = (recipes: Object[]): Object => {
  // Vérifier si les recettes existent
  if (!recipes || recipes.length === 0) {
    return {
      recipes: [],
      totalCalories: 0,
      totalProteins: 0,
      totalCarbs: 0,
      totalFats: 0,
    };
  }

  const calculateNutrients = () => {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    recipes.forEach((recipe) => {
      if (recipe.food.nutrients) {
        const nutrients = recipe.food.nutrients as any;
        totalCalories += nutrients.ENERC_KCAL?.quantity || 0;
        totalProteins += nutrients.PROCNT?.quantity || 0;
        totalCarbs += nutrients.CHOCDF?.quantity || 0;
        totalFats += nutrients.FAT?.quantity || 0;
      }
    });

    return {
      totalCalories: Math.round(totalCalories),
      totalProteins: Math.round(totalProteins),
      totalCarbs: Math.round(totalCarbs),
      totalFats: Math.round(totalFats),
    };
  };

  return {
    recipes,
    ...calculateNutrients(),
  };
};
