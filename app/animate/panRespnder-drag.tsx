import React, { useRef } from "react";
import { Animated, View, PanResponder, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Drag & Release this box!</Text>
      <Animated.View
        style={[styles.animatedView, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    lineHeight: 24,
    fontSize: 14,
    fontWeight: "bold",
  },
  animatedView: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 160,
    width: 160,
    backgroundColor: "blue",
    borderRadius: 8,
  },
});

export default App;
