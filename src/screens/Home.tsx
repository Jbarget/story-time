import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";

const ContentContainer = styled.View`
  align-items: center;
  top: 25%;
`;

const HomeLogoContainer = styled.View`
  margin-bottom: 20px;
`;
const SunSvg = styled(Svg)`
  height: 135px;
  width: 135px;
`;
const GrassContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const HomeLogo: React.FC<{ isChangingPage: boolean }> = ({
  isChangingPage,
}) => {
  const fadeIn = useSharedValue(0);
  const slideDown = useSharedValue(-50);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeIn.value, { duration: 3000 }),
      top: withTiming(slideDown.value, { duration: 3000 }),
    };
  });

  useEffect(() => {
    if (isChangingPage) {
      fadeIn.value = 0;
      slideDown.value = -50;
    } else {
      fadeIn.value = 1;
      slideDown.value = 0;
    }
  }, [fadeIn, slideDown, isChangingPage]);

  return (
    <HomeLogoContainer as={Animated.View} style={animatedStyles}>
      <SunSvg>
        <Path d="M 10 85 a 60 60 0 1 1 115 0" fill="#E79A16" />
        <Path d="M 10 85 a 60 60 0 0 0 115 0" fill="#D78500" />
      </SunSvg>
    </HomeLogoContainer>
  );
};

const GrassSvg: React.FC<{ isChangingPage: boolean }> = ({
  isChangingPage,
}) => {
  const slideUp = useSharedValue(-200);

  useEffect(() => {
    if (isChangingPage) {
      slideUp.value = -200;
    } else {
      slideUp.value = 0;
    }
  }, [slideUp, isChangingPage]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: withTiming(slideUp.value, { duration: 3000 }),
    };
  });

  return (
    <GrassContainer as={Animated.View} style={animatedStyles}>
      <Svg viewBox="0 4 13 8">
        <Path d="M 0 3 L 0 8 L 10 8 Z" fill="#CAD2C5" />
        <Path d="M 13 3 L 3 8 L 13 8 Z" fill="#CAD2C5" />
        <Path d="M 0 4 L 0 10 L 10 10 Z" fill="#84A98C" />
        <Path d="M 13 4 L 3 10 L 13 10 Z" fill="#84A98C" />
        <Path d="M 0 6 L 0 12 L 10 12 Z" fill="#52796F" />
        <Path d="M 13 6 L 3 12 L 13 12 Z" fill="#52796F" />
      </Svg>
    </GrassContainer>
  );
};

const HomeScreen: React.FC<{
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}> = ({ navigation }) => {
  const fadeIn = useSharedValue(0);
  const [isChangingPage, setTransition] = useState(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeIn.value, { duration: 2000 }),
    };
  });

  useEffect(() => {
    fadeIn.value = 1;
  }, [fadeIn]);

  const onPress = useCallback(() => {
    setTransition(true);
    fadeIn.value = 0;

    setTimeout(() => navigation.navigate("Genres"), 3000);
  }, []);

  return (
    <ScreenContainer>
      <ContentContainer>
        <HomeLogo isChangingPage={isChangingPage} />
        <Animated.View style={animatedStyles}>
          <Button
            onPress={onPress}
            title="Start your story"
            accessibilityLabel="Continue to genre selection"
          />
        </Animated.View>
      </ContentContainer>
      <GrassSvg isChangingPage={isChangingPage} />
    </ScreenContainer>
  );
};

export default HomeScreen;
