import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { EQInput } from "../Input/Input";
import { EQButton } from "../Button/Button";

type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "phone" | "multiline";
};

export type EQFormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  schema: Yup.AnyObjectSchema;
  defaultValues?: Record<string, string>;
  containerStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

export const EQForm: React.FC<EQFormProps> = ({
  fields,
  onSubmit,
  schema,
  defaultValues = {},
  containerStyle,
  errorTextStyle,
  buttonStyle,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <View style={[styles.formContainer, containerStyle]}>
      {fields.map((field) => (
        <View key={field.name}>
          <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, value } }) => (
              <EQInput
                value={value}
                onChangeText={onChange}
                placeholder={field.placeholder}
                label={field.label}
                type={field.type}
              />
            )}
          />
          {errors[field.name] && (
            <Text style={[styles.error, errorTextStyle]}>
              {(errors[field.name]?.message as string) || ""}
            </Text>
          )}
        </View>
      ))}
      <EQButton
        text="Submit"
        onPress={handleSubmit(onSubmit)}
        containerStyle={buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 16,
  },
  error: {
    fontSize: 13,
    marginTop: -8,
    marginBottom: 8,
    color: "red", // Default error color
  },
});