import { PhoneUtils } from "@barba/core";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import useUser from "@/src/data/hooks/useUser";
import React from "react";

export default function Profile({ navigation }: any) {
  const { user, signOut } = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/avatar.png")}
        style={styles.avatar}
      />
      <Text style={styles.highlight}>Hey, {user?.name}!</Text>
      <Text style={styles.text}>E-mail: {user?.email.toLowerCase()}</Text>
      <Text style={styles.text}>Phone: {PhoneUtils.format(user?.phone!)}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          signOut();
          navigation.replace("Register");
        }}
      >
        <Text style={styles.buttonText} numberOfLines={1}>
          SIGN OUT
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "45%",
    height: "45%",
    borderRadius: 9999,
    marginRight: 12,
  },
  highlight: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    margin: 5,
    textAlign: "center",
  },
  text: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "400",
    color: "#A9A9A9",
  },
  button: {
    margin: 30,
    width: "35%",
    height: 45,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
