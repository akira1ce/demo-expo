import { Link } from "expo-router";
import { Text, View } from "react-native";
import routes from "./configs/route.config";

export default function Home() {
  return (
    <View className="flex-col items-center gap-10 p-10">
      {routes.map((route) => (
        <Link key={route.path} href={{ pathname: route.path as any }}>
          <Text className="text-2xl font-bold">「{route.title}」</Text>
        </Link>
      ))}
    </View>
  );
}
