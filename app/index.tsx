import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import routes from "./configs/route.config";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={[styles.contianer]}>
      {routes.map((route) => (
        <Link key={route.path} href={{ pathname: route.path as any }}>
          <Text style={[styles.link_text]}>「{route.title}」</Text>
        </Link>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  link_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
