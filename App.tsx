import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import GenresScreen from "./src/screens/Genres";
import {
  useFonts,
  LibreBaskerville_400Regular,
} from "@expo-google-fonts/libre-baskerville";

export type RootStackParamList = {
  Home: undefined;
  Genres: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  let [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Genres" component={GenresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
