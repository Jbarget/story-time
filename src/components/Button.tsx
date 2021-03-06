import React from "react";

import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity`
  background-color: #84a98c;
  padding: 8px 16px;
  text-transform: uppercase;
  border-radius: 2px;
`;

const StyledText = styled.Text`
  font-family: Roboto_400Regular;
  letter-spacing: 1px;
  color: white;
  font-size: 18px;
`;

interface ButtonProps {
  onPress: () => void;
  title: string;
  accessibilityLabel: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  accessibilityLabel,
}) => {
  return (
    <StyledButton onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <StyledText>{title}</StyledText>
    </StyledButton>
  );
};

export default Button;
