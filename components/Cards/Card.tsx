import React, { ReactNode } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../themes/themeType";

// ---------- Types ----------
type EQCardProps = {
  children: ReactNode;
  headerImage?: string;
  headerText?: string;
  useTheme?: boolean; // Flag to control context usage
  style?: {
    card?: StyleProp<ViewStyle>;
    headerImage?: StyleProp<ImageStyle>;
    headerText?: StyleProp<TextStyle>;
    cardContent?: StyleProp<ViewStyle>;
  };
  onPress?: (event: GestureResponderEvent) => void; // optional onPress
};

// ---------- Entry Component ----------
export const EQCard = (props: EQCardProps) => {
  if (props.useTheme === false) {
    return <EQCardInternal {...props} />;
  }
  return <EQCardWithContext {...props} />;
};

// ---------- With Context ----------
const EQCardWithContext = (props: EQCardProps) => {
  const { theme } = useTheme();
  return <EQCardInternal {...props} theme={theme} />;
};

// ---------- Internal ----------
const EQCardInternal = ({
  children,
  headerImage,
  headerText,
  theme,
  style = {},
  onPress,
}: EQCardProps & { theme?: Theme }) => {
  const themeStyles = theme
    ? {
        card: { backgroundColor: theme.colors.background },
        headerText: { color: theme.colors.primary },
      }
    : {};

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, themeStyles.card, style.card]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : undefined}
    >
      {headerImage && (
        <Image
          source={{ uri: headerImage }}
          style={[styles.headerImage, style.headerImage]}
          resizeMode="cover"
        />
      )}
      {headerText && (
        <Text style={[styles.headerText, themeStyles.headerText, style.headerText]}>
          {headerText}
        </Text>
      )}
      <View style={[styles.cardContent, style.cardContent]}>{children}</View>
    </Container>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
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
