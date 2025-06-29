import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { View } from "react-native";
import { EQButton } from "./Button";

const meta: Meta<typeof EQButton> = {
  title: "EQButton",
  component: EQButton,
  args: {
    text: "Simple Button",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EQButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onPress: fn(),
    containerStyle: { backgroundColor: "#281E4D", padding: 16 },
    textStyle: { color: "white", fontSize: 16 },
  },
};