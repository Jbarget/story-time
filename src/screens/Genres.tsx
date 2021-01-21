import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { RootStackParamList } from "../../App";
import ScreenContainer from "../components/ScreenContainer";

const GenreContainer = styled.TouchableOpacity`
  flex: 1;
  width: 100%
  background-color: green;
  align-items: center;
  justify-content: center;
`;

const TopGenreContainer = styled(GenreContainer)`
  border-bottom-width: 1px;
  border-color: white;
`;

const BottomGenreContainer = styled(GenreContainer)`
  border-top-width: 1px;
  border-color: white;
`;

const HeaderText = styled.Text`
  font-family: "LibreBaskerville_400Regular";
  text-transform: uppercase;
  color: white;
`;

export type GenreType = "ACTION" | "FANTASY";

const GenresScreen: React.FC<{
  navigation: StackNavigationProp<RootStackParamList, "Genres">;
}> = ({ navigation }) => {
  const fadeIn = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeIn.value, { duration: 1000 }),
    };
  });

  useEffect(() => {
    fadeIn.value = 1;
  }, [fadeIn]);

  const onPress = useCallback(
    (genre: GenreType) => () => {
      fadeIn.value = 0;

      setTimeout(() => navigation.navigate("Story", { genre }), 3000);
    },
    []
  );

  return (
    <ScreenContainer as={Animated.View} style={animatedStyles}>
      <TopGenreContainer onPress={onPress("FANTASY")}>
        <HeaderText>FANTASY</HeaderText>
      </TopGenreContainer>
      <BottomGenreContainer onPress={onPress("ACTION")}>
        <HeaderText>Action</HeaderText>
      </BottomGenreContainer>
    </ScreenContainer>
  );
};

export default GenresScreen;
