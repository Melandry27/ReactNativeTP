import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user.imageUrl && (
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.fullName || "Utilisateur"}</Text>
      <Text style={styles.email}>{user.primaryEmailAddress?.emailAddress}</Text>

      <Button title="Se déconnecter" onPress={() => signOut()} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

export default Profile;
