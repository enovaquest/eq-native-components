import React, { ReactNode } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../themes/themeType";

// ---------- Types ----------
type EQCardProps = {
  children: ReactNode;
  headerImage?: string;
  headerText?: string;
  passedTheme?: Theme;
  style?: any;
};

// ---------- Entry Component ----------
export const EQCard = (props: EQCardProps) => {
  if (props.passedTheme) {
    return <EQCardInternal {...props} passedTheme={props.passedTheme!} />;
  }
  return <EQCardWithContext {...props} />;
};

// ---------- With Context ----------
const EQCardWithContext = (props: EQCardProps) => {
  const { theme } = useTheme();
  return <EQCardInternal {...props} passedTheme={theme} />;
};

// ---------- Internal ----------
const EQCardInternal = ({
  children,
  headerImage,
  headerText,
  passedTheme,
  style,
}: EQCardProps & { passedTheme: Theme }) => {
  return (
    <View style={[styles.card, { backgroundColor: passedTheme.colors.background }, style]}>
      {headerImage && (
        <Image source={{ uri: headerImage }} style={styles.headerImage} resizeMode="cover" />
      )}
      {headerText && <Text style={[styles.headerText, { color: passedTheme.colors.primary }]}>{headerText}</Text>}
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  headerImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardContent: {
    gap: 12,
  },
});
