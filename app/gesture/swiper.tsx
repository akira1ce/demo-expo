import React from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const SwipeableExample = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        renderLeftActions={() => (
          <View style={{ backgroundColor: "red", justifyContent: "center", flex: 1 }}>
            <Text style={{ color: "white", marginLeft: 20 }}>Swipe Left</Text>
          </View>
        )}
        renderRightActions={() => (
          <View style={{ backgroundColor: "blue", justifyContent: "center", flex: 1 }}>
            <Text style={{ color: "white", marginRight: 20 }}>Swipe Right</Text>
          </View>
        )}>
        <View
          style={{
            height: 100,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "white" }}>Swipe Me</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default SwipeableExample;
