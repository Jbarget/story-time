import { RouteProp, NavigationProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { RootStackParamList } from "../../App";
import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";
import { generateRandomNumber } from "../helpers";
import dictionary from "../story-words";

const StoryContainer = styled(ScreenContainer)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em 0.5em;
  height: 100%;
`;

const WordsContainer = styled.View`
  flex-direction: row;
  height: 95%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View<{ showContent: boolean }>`
  display: ${props => (props.showContent ? "flex" : "none")};
  align-items: center;
  height: 100%;
  width: 100%;
`;

const HomeButton = styled(Button)`
  position: absolute;
  bottom: 5%;
`;

const Intro = styled.Text<{ showIntro: boolean }>`
  display: ${props => (props.showIntro ? "flex" : "none")};
  font-family: "LibreBaskerville_400Regular";
  font-size: 1.2em;
`;

const StoryWord = styled.Text<{
  fontSize?: number;
  padding?: number;
}>`
  font-family: "LibreBaskerville_400Regular";
  font-size: ${props => props.fontSize}em;
  padding-bottom: ${props => props.padding}px;
  flex-shrink: 1;
  height: fit-content;
  margin: 0.2em;
`;

const Word = (word: string) => {
  const randomFontSize = generateRandomNumber() * 1.2 + 1;
  const randomValue = Math.round(generateRandomNumber() * 80);

  return (
    <StoryWord key={word} fontSize={randomFontSize} padding={randomValue}>
      {word}
    </StoryWord>
  );
};

type StoryScreenRouteProp = RouteProp<RootStackParamList, "Story">;
type StoryScreenNavigationProp = NavigationProp<RootStackParamList, "Story">;

type StoryScreenProps = {
  route: StoryScreenRouteProp;
  navigation: StoryScreenNavigationProp;
};

const INTRO_SHOWN_DURATION = 2000;
const WORDS_SHOWN_DURATION = 5000;
const ANIMATION_DURATION = 2000;
const WORDS_PER_PAGE = 10;

const splitWordsByPage = () => {
  return dictionary.reduce((acc: string[][], _, i) => {
    if (i % WORDS_PER_PAGE === 0) {
      acc.push(dictionary.slice(i, i + WORDS_PER_PAGE));
    }
    return acc;
  }, []);
};

const StoryScreen: React.FC<StoryScreenProps> = ({ navigation }) => {
  // route.params.genre
  const [page, setPage] = useState(0);
  const [words, _setWords] = useState(splitWordsByPage());
  const [showIntro, setShowIntro] = useState(true);
  const fadeInIntro = useSharedValue(0);
  const fadeInWords = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeInIntro.value, { duration: ANIMATION_DURATION }),
    };
  });

  const animatedWordStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeInWords.value, { duration: ANIMATION_DURATION }),
    };
  });

  useEffect(() => {
    fadeInIntro.value = 1;
    const introTimeout = setTimeout(() => {
      fadeInIntro.value = 0;
    }, INTRO_SHOWN_DURATION);

    return clearTimeout(introTimeout);
  }, [fadeInIntro]);

  useEffect(() => {
    let wordsFadeInTimeout: NodeJS.Timeout | undefined;
    if (page === 0) {
      wordsFadeInTimeout = setTimeout(() => {
        setShowIntro(false);
        fadeInWords.value = 1;
      }, INTRO_SHOWN_DURATION + ANIMATION_DURATION);
    } else {
      fadeInWords.value = 1;
    }

    const wordsFadeOutTimeout = setTimeout(() => {
      fadeInWords.value = 0;
    }, INTRO_SHOWN_DURATION + ANIMATION_DURATION + WORDS_SHOWN_DURATION);

    const nextPageTimeout = setTimeout(() => {
      setPage(page + 1);
    }, INTRO_SHOWN_DURATION + ANIMATION_DURATION + WORDS_SHOWN_DURATION + ANIMATION_DURATION);

    return () => {
      wordsFadeInTimeout && clearTimeout(wordsFadeInTimeout);
      clearTimeout(wordsFadeOutTimeout);
      clearTimeout(nextPageTimeout);
    };
  }, [page]);

  const onPress = useCallback(() => navigation.navigate("Home"), []);

  return (
    <StoryContainer>
      <Intro style={animatedStyles} as={Animated.Text} showIntro={showIntro}>
        Once upon a time...
      </Intro>
      <ContentContainer showContent={!showIntro}>
        <WordsContainer style={animatedWordStyles} as={Animated.View}>
          {words[page % words.length].map(Word)}
        </WordsContainer>
        <HomeButton
          onPress={onPress}
          accessibilityLabel="Back to home"
          title="It's bedtime"
        />
      </ContentContainer>
    </StoryContainer>
  );
};

export default StoryScreen;
