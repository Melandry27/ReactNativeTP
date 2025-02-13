import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { IngredientProvider } from "../../context/ContextIngredient";
import { RecipeProvider } from "../../context/ContextRecipes";

export default function Layout() {
  return (
    <RecipeProvider>
      <IngredientProvider>
        <Tabs>
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="add/index"
            options={{
              title: "Add",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile/index"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </IngredientProvider>
    </RecipeProvider>
  );
}
