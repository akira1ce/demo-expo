import React, { useRef } from "react";
import { Animated, View, PanResponder, Text } from "react-native";

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      /* drag and no reset when release */
      // onPanResponderGrant: () => {
      //   pan.setOffset({
      //     x: pan.x._value,
      //     y: pan.y._value,
      //   });
      // },
      // onPanResponderRelease: () => {
      //   pan.flattenOffset();
      // },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
      },
    })
  ).current;

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="leading-6 text-sm font-bold">Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}>
        <View className="h-40 w-40 bg-blue-400 rounded" />
      </Animated.View>
    </View>
  );
};

export default App;
