import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { EQForm } from "./SimpleForm";
import * as Yup from "yup";

const meta: Meta<typeof EQForm> = {
  title: "EQForm",
  component: EQForm,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EQForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const formFields: {
  name: string;
  label: string;
  placeholder: string;
  type: "number" | "text" | "email" | "multiline" | "password" | "phone";
}[] = [
  { name: "name", label: "Name", placeholder: "Enter your name", type: "text" },
  { name: "email", label: "Email", placeholder: "Enter your email", type: "email" },
  { name: "message", label: "Message", placeholder: "Write your message", type: "multiline" },
];

const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().min(10, "Message should be at least 10 characters"),
});

export const Basic: Story = {
  args: {
    fields: formFields,
    schema: formSchema,
    onSubmit: (data: any) => {
      console.log("Form submitted:", data);
    },
    containerStyle: { gap: 16 },
    errorTextStyle: { color: "red", fontSize: 13 },
    buttonStyle: { backgroundColor: "#281E4D", padding: 16 },
  },
};