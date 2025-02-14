import { Link } from "expo-router";
import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import { routes, Route } from "../configs/route.config";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback } from "react";
import { useTheme } from "@react-navigation/native";

export default function Home() {
  /* 获取主题数据 value */
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
    /* 安全区域 */
    <SafeAreaView style={[styles.contianer]}>
      {/* 手势根区域 */}
      <GestureHandlerRootView>
        {/* 虚拟滚动 */}
        <FlatList data={routes} renderItem={renderLink} keyExtractor={(route) => route.path} />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

/* style */
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
