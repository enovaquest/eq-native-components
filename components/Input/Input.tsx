import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type InputType = "text" | "email" | "password" | "number" | "phone" | "multiline";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  type?: InputType;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
};

export const EQInput: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  type = "text",
  numberOfLines = 4,
  containerStyle,
  labelStyle,
  inputStyle,
}) => {
  const [focused, setFocused] = useState(false);

  const inputProps = getInputPropsByType(type, numberOfLines);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.input,
          focused && styles.focused,
          inputProps.multiline && styles.multiline,
          inputStyle,
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
    color: "#000", // Default text color
  },
  input: {
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlignVertical: "center",
    borderColor: "#ccc", // Default border color
  },
  focused: {
    borderColor: "#281E4D", // Focused border color
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
});