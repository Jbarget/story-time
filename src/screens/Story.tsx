import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../../App";
import ScreenContainer from "../components/ScreenContainer";
import words from "../story-words";

const StoryContainer = styled(ScreenContainer)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const WordsContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const StoryWord = styled.Text`
  font-family: "LibreBaskerville_400Regular";
  font-size: 2em;
  flex-shrink: 1;
`;

const Word = (word: string) => {
  return <StoryWord key={word}>{word}</StoryWord>;
};

type StoryScreenRouteProp = RouteProp<RootStackParamList, "Story">;

type StoryScreenProps = {
  route: StoryScreenRouteProp;
};

const StoryScreen: React.FC<StoryScreenProps> = ({ route }) => {
  // console.log(route.params.genre);

  return (
    <StoryContainer>
      <WordsContainer>{words.slice(0, 10).map(Word)}</WordsContainer>
    </StoryContainer>
  );
};

export default StoryScreen;
