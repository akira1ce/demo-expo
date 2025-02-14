import { Link } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as linking from "expo-linking";
import { useTheme } from "@react-navigation/native";

export default function Page() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {/* Link */}
      <Link href={{ pathname: "/" }}>
        <Text style={[{ color: colors.text }]}>to /</Text>
      </Link>
      
      {/* expo-linking */}
      <Button title="linking-/" onPress={() => linking.openURL("https://expo.dev/")}></Button>
      <Button
        title="linking-sms:+123456789"
        onPress={() => linking.openURL("sms:+123456789")}></Button>
    </SafeAreaView>
  );
}
