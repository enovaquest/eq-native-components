import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { EQInput } from "../Input/Input";
import { EQButton } from "../Button/Button";
import { Theme } from "../../themes/themeType";
import { useTheme } from "../../hooks/useTheme";

// ---------- Types ----------
type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "phone" | "multiline";
};

export type EQFormProps = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  passedTheme?: Theme;
  schema: Yup.AnyObjectSchema;
  defaultValues?: Record<string, string>;
};

// ---------- Entry Component ----------
export const EQForm = (props: EQFormProps) => {
  if (props.passedTheme) {
    return <EQFormInternal {...props} passedTheme={props.passedTheme!} />;
  }
  return <EQFormWithContext {...props} />;
};

// ---------- With Context ----------
const EQFormWithContext = (props: EQFormProps) => {
  const { theme } = useTheme();
  return <EQFormInternal {...props} passedTheme={theme} />;
};

// ---------- Internal ----------
const EQFormInternal = ({
  fields,
  onSubmit,
  passedTheme,
  schema,
  defaultValues = {},
}: EQFormProps & { passedTheme: Theme }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.formContainer}>
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
                passedTheme={passedTheme}
              />
            )}
          />
          {errors[field.name] && (
            <Text style={[styles.error, { color: passedTheme.colors.error }]}>
              {(errors[field.name]?.message as string) || ""}
            </Text>
          )}
        </View>
      ))}
      <EQButton text="Submit" onPress={handleSubmit(onSubmit)} passedTheme={passedTheme} />
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
  },
});
