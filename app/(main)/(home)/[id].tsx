import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RecipeContext } from "../../../context/ContextRecipes";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { recipes, removeRecipe } = useContext(RecipeContext);
  console.log("id", id);
  const r = recipes[id];
  const recipe = r[0];

  console.log("recipe", recipe);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    removeRecipe(parseInt(id));
    router.back();
  };

  const renderMeasures = () => {
    return recipe.measures.map((measure, index) => (
      <View key={index} style={styles.measureItem}>
        <Text style={styles.measureText}>
          {measure.amount} {measure.unit}
        </Text>
      </View>
    ));
  };

  const renderNutrients = () => {
    const nutrients = recipe.food.nutrients;
    const commonNutrients = [
      { key: "ENERC_KCAL", label: "Calories", unit: "kcal" },
      { key: "PROCNT", label: "Protein", unit: "g" },
      { key: "FAT", label: "Fat", unit: "g" },
      { key: "CHOCDF", label: "Carbohydrates", unit: "g" },
      { key: "FIBTG", label: "Fiber", unit: "g" },
    ];

    return commonNutrients.map((nutrient, index) => {
      if (nutrients[nutrient.key]) {
        return (
          <View key={index} style={styles.nutrientItem}>
            <Text style={styles.nutrientLabel}>{nutrient.label}</Text>
            <Text style={styles.nutrientValue}>
              {Math.round(nutrients[nutrient.key])} {nutrient.unit}
            </Text>
          </View>
        );
      }
      return null;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={24} color="#FF4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {recipe.food.image && (
            <Image
              source={{ uri: recipe.food.image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <Text style={styles.title}>{recipe.food.label}</Text>

          {recipe.food.brand && (
            <Text style={styles.brand}>{recipe.food.brand}</Text>
          )}

          <View style={styles.categoryContainer}>
            <Text style={styles.category}>
              {recipe.food.categoryLabel} • {recipe.food.category}
            </Text>
          </View>

          {recipe.food.foodContentsLabel && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.ingredients}>
                {recipe.food.foodContentsLabel}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutrientsContainer}>{renderNutrients()}</View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Portions</Text>
            <View style={styles.measuresContainer}>{renderMeasures()}</View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  ingredients: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  nutrientsContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
  },
  nutrientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nutrientLabel: {
    fontSize: 16,
    color: "#444",
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  measuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  measureItem: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  measureText: {
    fontSize: 14,
    color: "#444",
  },
});

export default RecipeDetail;
