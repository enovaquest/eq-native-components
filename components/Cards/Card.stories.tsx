import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { EQCard } from "./Card";

const meta: Meta<typeof EQCard> = {
  title: "EQCard",
  component: EQCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EQCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    headerText: "Card Title",
    containerStyle: { backgroundColor: "#fff", padding: 16 },
    headerTextStyle: { color: "#281E4D", fontSize: 18 },
    children: <Text>This is a basic EQCard with just text content.</Text>,
  },
};

export const WithImageHeader: Story = {
  args: {
    headerText: "Card with Image Header",
    containerStyle: { backgroundColor: "#fff", padding: 16 },
    headerTextStyle: { color: "#281E4D", fontSize: 18 },
    children: (
      <View>
        <Text style={{ marginBottom: 8 }}>
          This card includes styled header text and can contain other children.
        </Text>
        <Text>It can also include buttons or inputs.</Text>
      </View>
    ),
  },
};