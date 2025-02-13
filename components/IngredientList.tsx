import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IngredientList = ({ item, handleRemoveIngredient }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.food.label}</Text>
        <Text style={styles.kcal}>
          {Math.round(item.food.nutrients.ENERC_KCAL)} kcal
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveIngredient(item)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoContainer: {
    flexDirection: "column",
    maxWidth: "80%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  kcal: {
    fontSize: 14,
    color: "#ff6347",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 50,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    height: 20,
    width: 20,
  },
});

export default IngredientList;
