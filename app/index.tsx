import { Link } from "expo-router";
import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import { routes, Route } from "../configs/route.config";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback } from "react";
import { useTheme } from "@react-navigation/native";

export default function Home() {
  const { colors } = useTheme();

  const renderLink = useCallback<ListRenderItem<Route>>(
    ({ item }) => (
      <Link key={item.path} href={{ pathname: item.path as any }} style={styles.link}>
        <Text style={[styles.link_text, { color: colors.text }]}>「{item.title}」</Text>
      </Link>
    ),
    [colors.text]
  );

  return (
    <SafeAreaView style={[styles.contianer]}>
      <GestureHandlerRootView>
        <FlatList data={routes} renderItem={renderLink} keyExtractor={(route) => route.path} />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  link: {
    marginVertical: 10,
  },
  link_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
