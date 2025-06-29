import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { EQInput } from "./Input";
import { useState } from "react";

const meta: Meta<typeof EQInput> = {
  title: "EQInput",
  component: EQInput,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EQInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    value: "",
    onChangeText: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <EQInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    value: "",
    onChangeText: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <EQInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const Multiline: Story = {
  args: {
    label: "Message",
    placeholder: "Write a message...",
    type: "multiline",
    numberOfLines: 4,
    value: "",
    onChangeText: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <EQInput {...args} value={value} onChangeText={setValue} />;
  },
};