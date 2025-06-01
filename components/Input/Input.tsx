import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardTypeOptions,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../themes/themeType";

type InputType = "text" | "email" | "password" | "number" | "phone" | "multiline";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  passedTheme?: Theme;
  type?: InputType;
  numberOfLines?: number;
};

export const EQInput = (props: InputProps) => {
  if (props.passedTheme) {
    return <EQInputInternal {...props} passedTheme={props.passedTheme!} />;
  }
  return <EQInputWithContext {...props} />;
};

const EQInputWithContext = (props: InputProps) => {
  const { theme } = useTheme();
  return <EQInputInternal {...props} passedTheme={theme} />;
};

const EQInputInternal = ({
  value,
  onChangeText,
  placeholder,
  label,
  passedTheme,
  type = "text",
  numberOfLines = 4,
}: Required<Omit<InputProps, "placeholder" | "label" | "type" | "numberOfLines">> & {
  placeholder?: string;
  label?: string;
  type?: InputType;
  numberOfLines?: number;
}) => {
  const [focused, setFocused] = useState(false);

  const inputProps = getInputPropsByType(type, numberOfLines);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, { color: passedTheme.colors.text }]}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.input,
          inputProps.multiline && styles.multiline,
          {
            borderColor: focused
              ? passedTheme.colors.primary
              : passedTheme.colors.border,
            color: passedTheme.colors.text,
          },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
    </View>
  );
};

const getInputPropsByType = (
  type: InputType,
  numberOfLines: number
): {
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
} => {
  switch (type) {
    case "email":
      return { keyboardType: "email-address" };
    case "password":
      return { secureTextEntry: true };
    case "number":
      return { keyboardType: "numeric" };
    case "phone":
      return { keyboardType: "phone-pad" };
    case "multiline":
      return { multiline: true, numberOfLines };
    case "text":
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlignVertical: "center",
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
});
