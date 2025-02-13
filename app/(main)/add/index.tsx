import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";

import IngredientList from "../../../components/IngredientList";
import ListSearchIngredient from "../../../components/ListSearchIngredient";

import { IngredientContext } from "../../../context/ContextIngredient";
import { RecipeContext } from "../../../context/ContextRecipes";

import { getIngredientsByQuery } from "../../../services/request";

const AddIngredient = () => {
  const router = useRouter();

  const { addRecipe } = useContext(RecipeContext);
  const { ingredients, addIngredient, removeIngredient } =
    useContext(IngredientContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const updateSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const data = await getIngredientsByQuery(query);
        setResults(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search for an ingredient"
            onChangeText={updateSearch}
            value={searchQuery}
            lightTheme
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInput}
          />
          <TouchableOpacity onPress={() => router.push("/add/camera")}>
            <Ionicons
              name="qr-code-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListSearchIngredient
              item={item}
              handleAddIngredient={addIngredient}
            />
          )}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          Ingredients
        </Text>
        <FlatList
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <IngredientList
              item={item}
              handleRemoveIngredient={removeIngredient}
            />
          )}
        />
      </View>

      <TouchableOpacity
        disabled={ingredients.length === 0}
        onPress={() => {
          addRecipe(ingredients);
          router.push("/");
        }}
        style={{
          position: "absolute",
          top: "auto",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "blue",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          opacity: ingredients.length === 0 ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    width: "90%",
  },
  icon: {
    marginLeft: -25,
  },
  container: {
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default AddIngredient;
