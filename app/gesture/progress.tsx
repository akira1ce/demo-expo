import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

/* 极坐标转换为笛卡尔坐标 */
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

/* 圆路径 */
const circlePath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const startPos = polarToCartesian(x, y, radius, startAngle);
  const endPos = polarToCartesian(x, y, radius, endAngle * 0.9999999);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  // prettier-ignore
  const d = ["M", startPos.x, startPos.y, "A", radius, radius, 0, largeArcFlag, 1, endPos.x, endPos.y];
  return { d: d.join(" "), startPos, endPos };
};

/* 计算偏差角度 */
const genAngles = (gapAngle: number) => {
  const startAngle = -180 + gapAngle / 2;
  const endAngle = 180 - gapAngle / 2;
  const sumAngle = endAngle - startAngle;
  return { startAngle, endAngle, sumAngle };
};

export interface CircularProgressProps {
  progress: number;
  radius: number;
  strokeWidth: number;
  gapAngle: number;
}

const CircularProgress = ({
  progress,
  radius = 100,
  strokeWidth = 10,
  gapAngle = 0,
}: CircularProgressProps) => {
  /* 起始角度 */
  const { startAngle, endAngle } = genAngles(gapAngle);

  /* 轨道轨迹 */
  const { d, startPos, endPos } = circlePath(
    radius,
    radius,
    radius - strokeWidth,
    startAngle,
    endAngle
  );

  const circleX = useSharedValue(startPos.x);
  const circleY = useSharedValue(startPos.y);

  const currentAngle = useDerivedValue(() => {
    // 计算两个点相对于圆心的角度
    const angle1 = Math.atan2(startPos.y - radius, startPos.x - radius);
    const angle2 = Math.atan2(circleY.value - radius, circleX.value - radius);

    // 计算角度差（弧度）
    let angle = angle2 - angle1;

    // 将角度差转换为 0 到 2π 之间的正值
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    return angle;
  });

  const cicleProps = useAnimatedProps(() => {
    return {
      cx: circleX.value,
      cy: circleY.value,
    };
  });

  const progressPathProps = useAnimatedProps(() => {
    const largeArcFlag = currentAngle.value > Math.PI ? 1 : 0;

    return {
      d: `M ${startPos.x} ${startPos.y} A ${radius - strokeWidth} ${
        radius - strokeWidth
      } 0 ${largeArcFlag} 1 ${circleX.value} ${circleY.value}`,
    };
  });

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart((e) => {
      const dx = e.x - radius;
      const dy = e.y - radius;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scale = (radius - strokeWidth) / distance;

      circleX.value = radius + dx * scale;
      circleY.value = radius + dy * scale;
    })
    .onUpdate((e) => {
      if (currentAngle.value > (1 - gapAngle / 360) * 2 * Math.PI) {
        return;
      }
      const dx = e.x - radius;
      const dy = e.y - radius;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scale = (radius - strokeWidth) / distance;

      circleX.value = radius + dx * scale;
      circleY.value = radius + dy * scale;
    })
    .onEnd(() => {
      if (currentAngle.value > (1 - gapAngle / 360) * 2 * Math.PI) {
        circleX.value = endPos.x;
        circleY.value = endPos.y;
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Svg width={radius * 2} height={radius * 2}>
          <G>
            <Path d={d} fill="none" stroke="gray" strokeWidth={strokeWidth} />
            {progress > 0 && (
              <AnimatedPath
                animatedProps={progressPathProps}
                fill="none"
                stroke="green"
                strokeWidth={strokeWidth}
              />
            )}
            <AnimatedCircle animatedProps={cicleProps} r="10" fill="blue" />
          </G>
        </Svg>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 1) {
          return prevProgress + 0.01;
        }
        clearInterval(interval);
        return 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <CircularProgress radius={100} strokeWidth={10} progress={progress} gapAngle={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  text: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
