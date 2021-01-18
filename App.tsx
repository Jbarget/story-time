import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import GenresScreen from "./src/screens/Genres";

export type RootStackParamList = {
  Home: undefined;
  Genres: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
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
