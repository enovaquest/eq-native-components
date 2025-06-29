import React from "react";
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

type ButtonProps = {
  onPress: () => void;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const EQButton: React.FC<ButtonProps> = ({ onPress, text, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]} // Merge default and custom styles
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: "#281E4D",
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});