import React from "react";
import { View, Alert } from "react-native";
import { Meta, StoryObj } from "@storybook/react";
import { LoginWidget, LoginWidgetProps } from "./login.widget";

const meta: Meta<LoginWidgetProps> = {
  title: "Widgets/LoginWidget",
  component: LoginWidget,
  args: {
    cardHeaderText: "Login",
    containerStyle: { margin: 32 },
  },
};

export default meta;

type Story = StoryObj<LoginWidgetProps>;

export const SimpleMode: Story = {
  args: {
    mode: "simple",
  },
  render: (args) => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoginWidget
        {...args}
        onLogin={(data) => Alert.alert("Simple Login Submitted", JSON.stringify(data))}
      />
    </View>
  ),
};

export const SocialMode: Story = {
  args: {
    mode: "social",
  },
  render: (args) => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoginWidget
        {...args}
        onLogin={(data) => Alert.alert("Social Login Submitted", JSON.stringify(data))}
        onGoogleLogin={() => Alert.alert("Google SSO", "Google login pressed")}
      />
    </View>
  ),
};

export const CustomHeader: Story = {
  args: {
    cardHeaderText: "Sign In to Your Account",
    mode: "simple",
  },
  render: (args) => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoginWidget
        {...args}
        onLogin={(data) => Alert.alert("Custom Login", JSON.stringify(data))}
      />
    </View>
  ),
};