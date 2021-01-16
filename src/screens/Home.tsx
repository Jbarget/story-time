import React, { useRef, useEffect } from "react";
import { Animated, Button, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const HomeLogo = () => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideDown = useRef(new Animated.Value(0)).current;
  const breath = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideDown, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeIn, breath]);

  return (
    <Animated.View
      style={[
        styles.homeLogoContainer,
        {
          opacity: fadeIn,
          transform: [
            {
              scaleX: breath.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.1, 1],
              }),
            },
            {
              scaleY: breath.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.1, 1],
              }),
            },
          ],
          top: slideDown.interpolate({
            inputRange: [0, 1],
            outputRange: ["-50px", "0px"],
          }),
        },
      ]}
    >
      <Svg style={styles.homeLogoSvg}>
        <Path d="M 10 85 a 60 60 0 1 1 115 0" fill="#E79A16" />
        <Path d="M 10 85 a 60 60 0 0 0 115 0" fill="#D78500" />
      </Svg>
    </Animated.View>
  );
};

const GrassSvg = () => {
  const lower = useRef(new Animated.Value(-100)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(lower, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [lower]);

  return (
    <Animated.View style={[styles.grassContainer, { bottom: lower }]}>
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
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <HomeLogo />
        <Animated.View style={{ opacity: fadeIn }}>
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
