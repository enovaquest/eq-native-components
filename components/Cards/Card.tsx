import React, { ReactNode } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

type CardProps = {
  children: ReactNode;
  headerText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
};

export const EQCard: React.FC<CardProps> = ({ children, headerText, containerStyle, headerTextStyle }) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {headerText && <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>}
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#281E4D",
  },
  cardContent: {
    gap: 12,
  },
});