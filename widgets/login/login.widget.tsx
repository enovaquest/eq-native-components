import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle } from "react-native";
import * as Yup from "yup";
import { Card } from "../../components/Cards/Card";
import { Form } from "../../components/Forms/Form";

export type LoginWidgetMode = "simple" | "social";

export type LoginWidgetProps = {
  onLogin: (data: { email: string; password: string }) => void;
  onGoogleLogin?: () => void;
  containerStyle?: ViewStyle;
  cardHeaderText?: string;
  mode?: LoginWidgetMode;
};

const loginFields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email" as const,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password" as const,
  },
];

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

export const LoginWidget: React.FC<LoginWidgetProps> = ({
  onLogin,
  onGoogleLogin,
  containerStyle,
  cardHeaderText = "Login",
  mode = "simple",
}) => {
  return (
    <Card headerText={cardHeaderText} containerStyle={[styles.card, containerStyle]}>
      <Form
        fields={loginFields}
        schema={loginSchema}
        onSubmit={onLogin}
        buttonStyle={styles.button}
        errorTextStyle={styles.error}
      />
      {mode === "social" && (
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={onGoogleLogin}
            accessibilityLabel="Login with Google"
          >
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 400,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#281E4D",
    marginTop: 8,
  },
  error: {
    color: "#CF6679",
  },
  socialContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  orText: {
    marginVertical: 8,
    color: "#888",
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#4285F4",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  googleButtonText: {
    color: "#4285F4",
    fontWeight: "bold",
    fontSize: 16,
  },
});