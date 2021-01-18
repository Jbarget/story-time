import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
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

const GenresScreen = () => {
  const fadeIn = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeIn.value, { duration: 2000 }),
    };
  });

  useEffect(() => {
    fadeIn.value = 1;
  }, [fadeIn]);

  return (
    <ScreenContainer as={Animated.View} style={animatedStyles}>
      <TopGenreContainer>
        <Text>Fantasy</Text>
      </TopGenreContainer>
      <BottomGenreContainer>
        <Text>Action</Text>
      </BottomGenreContainer>
    </ScreenContainer>
  );
};

export default GenresScreen;
