import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type GridProps = {
  children: ReactNode;
  columns?: number; // Number of columns in the grid
  gap?: number; // Gap between grid items
  containerStyle?: StyleProp<ViewStyle>; // Custom styles for the grid container
};

export const EQGrid: React.FC<GridProps> = ({
  children,
  columns = 2,
  gap = 16,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.gridContainer,
        { gap },
        containerStyle,
        { flexWrap: "wrap", flexDirection: "row" },
      ]}
    >
      {React.Children.map(children, (child) => (
        <View style={[styles.gridItem, { width: `${100 / columns}%`, padding: gap / 2 }]}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    display: "flex",
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});