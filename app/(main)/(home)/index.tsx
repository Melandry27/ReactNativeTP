import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RecipeContext } from "../../../context/ContextRecipes";

const RecipeCard = ({ item, onRemove }) => {
  const recipes = Array.isArray(item) ? item : [item];

  return (
    <ScrollView style={styles.cardContainer}>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{recipe.food.label}</Text>
            <TouchableOpacity
              onPress={() => onRemove(index)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentRow}>
            {recipe.food.image && (
              <Image
                source={{ uri: recipe.food.image }}
                style={styles.foodImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.infoContainer}>
              {recipe.food.brand && (
                <Text style={styles.brandText}>Brand: {recipe.food.brand}</Text>
              )}

              <Text style={styles.categoryText}>
                {recipe.food.categoryLabel} • {recipe.food.category}
              </Text>
            </View>
          </View>

          {recipe.food.foodContentsLabel && (
            <View style={styles.ingredientsContainer}>
              <Text style={styles.ingredientsTitle}>Ingredients:</Text>
              <Text style={styles.ingredientsText}>
                {recipe.food.foodContentsLabel}
              </Text>
            </View>
          )}

          <View style={styles.measuresContainer}>
            <Text style={styles.measuresText}>
              Available portions: {recipe.measures.length}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { recipes, removeRecipe } = useContext(RecipeContext);

  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Hello, {user?.emailAddresses[0].emailAddress}
          </Text>
          <Text style={styles.recipeCount}>
            You have {recipes.length} recipes
          </Text>
        </View>

        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(main)/(home)/[id]",
                  params: { id: index },
                })
              }
            >
              <RecipeCard item={item} onRemove={() => removeRecipe(index)} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 16 }}
        />

        <Link href="/(main)/add" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Recipe</Text>
          </TouchableOpacity>
        </Link>
      </SignedIn>

      <SignedOut>
        <View style={styles.authContainer}>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.authButton}>
              <Text style={styles.authButtonText}>Sign in</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity style={[styles.authButton, styles.signUpButton]}>
              <Text style={styles.authButtonText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  recipeCount: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  brandText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  cardContent: {
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  measures: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 12,
    marginTop: 12,
  },
  measureText: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  authButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  signUpButton: {
    backgroundColor: "#34C759",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  contentRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },

  categoryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ingredientsContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  ingredientsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  measuresContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
    marginTop: 8,
  },
  measuresText: {
    fontSize: 14,
    color: "#666",
  },
});
