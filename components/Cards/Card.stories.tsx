import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { EQCard } from "./Card";
import { nebulaCorporateTheme } from "../../themes/nebulaCorporateTheme";

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
    passedTheme: nebulaCorporateTheme,
    children: <Text>This is a basic EQCard with just text content.</Text>,
  },
};

export const WithImageHeader: Story = {
  args: {
    headerImage: "https://picsum.photos/400/200",
    headerText: "Card with Image Header",
    passedTheme: nebulaCorporateTheme,
    children: (
      <View>
        <Text style={{ marginBottom: 8 }}>
          This card includes an image at the top and styled header text.
        </Text>
        <Text>It can also contain any other children like buttons or inputs.</Text>
      </View>
    ),
  },
};
