import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutAnimated() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown} style={styles.box}></Animated.View>
      <Animated.View entering={FadeInUp} style={styles.box}></Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});
