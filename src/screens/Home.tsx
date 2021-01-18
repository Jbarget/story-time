import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Svg, { Path } from "react-native-svg";

const HomeLogo = () => {
  const fadeIn = useSharedValue(0);
  const slideDown = useSharedValue(-50);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeIn.value, { duration: 3000 }),
      top: withTiming(slideDown.value, { duration: 3000 }),
    };
  });

  useEffect(() => {
    fadeIn.value = 1;
    slideDown.value = 0;
  }, [fadeIn, slideDown]);

  return (
    <Animated.View style={[styles.homeLogoContainer, animatedStyles]}>
      <Svg style={styles.homeLogoSvg}>
        <Path d="M 10 85 a 60 60 0 1 1 115 0" fill="#E79A16" />
        <Path d="M 10 85 a 60 60 0 0 0 115 0" fill="#D78500" />
      </Svg>
    </Animated.View>
  );
};

const GrassSvg = () => {
  const slideUp = useSharedValue(-100);

  useEffect(() => {
    slideUp.value = 0;
  }, [slideUp]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: withTiming(slideUp.value, { duration: 3000 }),
    };
  });

  return (
    <Animated.View style={[styles.grassContainer, animatedStyles]}>
      <Svg viewBox="0 4 13 8">
        <Path d="M 0 3 L 0 8 L 10 8 Z" fill="#CAD2C5" />
        <Path d="M 13 3 L 3 8 L 13 8 Z" fill="#CAD2C5" />
        <Path d="M 0 4 L 0 10 L 10 10 Z" fill="#84A98C" />
        <Path d="M 13 4 L 3 10 L 13 10 Z" fill="#84A98C" />
        <Path d="M 0 6 L 0 12 L 10 12 Z" fill="#52796F" />
        <Path d="M 13 6 L 3 12 L 13 12 Z" fill="#52796F" />
      </Svg>
    </Animated.View>
  );
};

const HomeScreen = () => {
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
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <HomeLogo />
        <Animated.View style={animatedStyles}>
          <Button
            onPress={() => console.log("clicke")}
            title="Start your story"
            color="#84A98C"
            accessibilityLabel="Continue to genre selection"
          />
        </Animated.View>
      </View>
      <GrassSvg />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contentWrapper: {
    alignItems: "center",
    top: "25%",
  },
  homeLogoContainer: {
    marginBottom: "20px",
  },
  homeLogoSvg: {
    height: "135px",
    width: "135px",
  },
  grassContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default HomeScreen;
