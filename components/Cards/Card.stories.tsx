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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    headerText: "Card Title",
    children: <Text>This is a basic EQCard with just text content.</Text>,
    useTheme: true,
  },
};

export const WithImageHeader: Story = {
  args: {
    headerImage: "https://picsum.photos/400/200",
    headerText: "Card with Image Header",
    children: (
      <View>
        <Text style={{ marginBottom: 8 }}>
          This card includes an image at the top and styled header text.
        </Text>
        <Text>It can also contain any other children like buttons or inputs.</Text>
      </View>
    ),
    useTheme: true,
  },
};

export const WithoutTheme: Story = {
  args: {
    headerText: "Card Without Theme",
    useTheme: false, // theme disabled
    style: {
      card: { backgroundColor: "lightgray", padding: 20 },
      headerText: { color: "darkblue", fontSize: 20 },
    },
    children: (
      <Text>
        This card does not use the theme context and has custom styles applied.
      </Text>
    ),
  },
};
