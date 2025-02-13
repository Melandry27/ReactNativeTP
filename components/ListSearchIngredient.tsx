import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ListSearchIngredient = ({ item, handleAddIngredient }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => handleAddIngredient(item)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            backgroundColor: "#eee",
          },
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.food.label}</Text>
        </View>
        <View>
          <Text>{Math.round(item.food.nutrients.ENERC_KCAL)} kcal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  item: {
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
};

export default ListSearchIngredient;
