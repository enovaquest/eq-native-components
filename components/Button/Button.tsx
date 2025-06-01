import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../themes/themeType";

type ButtonProps = {
  onPress: () => void;
  text: string;
  passedTheme?: Theme;
}

export const EQButton = (props: ButtonProps) => {
  if (props.passedTheme) {
    return <EQButtonInternal {...props} passedTheme={props.passedTheme!} />;
  }
  return <EQButtonWithContext {...props} />;
};

const EQButtonWithContext = (props: ButtonProps) => {
  const { theme } = useTheme();
  return <EQButtonInternal {...props} passedTheme={theme} />;
};

const EQButtonInternal = ({ onPress, text, passedTheme }: Required<ButtonProps>) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: passedTheme.colors.primary }]}
    onPress={onPress}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: '',
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  text: { color: "white", fontSize: 16, fontWeight: "bold" },
});
