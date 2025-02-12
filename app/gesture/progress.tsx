import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Svg, { Circle, G, Path } from "react-native-svg";

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

/* 笛卡尔坐标转换为极坐标 */
const cartesianToPolar = (centerX: number, centerY: number, x: number, y: number) => {
  const dx = x - centerX;
  const dy = y - centerY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  return angle < 0 ? angle + 360 : angle;
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
  const { d } = circlePath(radius, radius, radius - strokeWidth, startAngle, endAngle);

  /* 进度末端角度 */
  const progressEndAngle = startAngle + progress * (endAngle - startAngle);

  /* 进度轨迹 */
  const { d: progressD, endPos: progressEnd } = circlePath(
    radius,
    radius,
    radius - strokeWidth,
    startAngle,
    progressEndAngle
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <G>
          <Path d={d} fill="none" stroke="gray" strokeWidth={strokeWidth} />
          {progress > 0 && (
            <Path d={progressD} fill="none" stroke="green" strokeWidth={strokeWidth} />
          )}
          <Circle cx={progressEnd.x} cy={progressEnd.y} r="10" fill="blue" />
        </G>
      </Svg>
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
