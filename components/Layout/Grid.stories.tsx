import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { EQGrid } from "./Grid";

const meta: Meta<typeof EQGrid> = {
  title: "EQGrid",
  component: EQGrid,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EQGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: Array.from({ length: 9 }, (_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: "#281E4D",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Item {index + 1}</Text>
      </View>
    )),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 12,
    children: Array.from({ length: 6 }, (_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: "#03DAC6",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black" }}>Item {index + 1}</Text>
      </View>
    )),
  },
};

export const CustomStyle: Story = {
  args: {
    columns: 4,
    gap: 8,
    containerStyle: { backgroundColor: "#f5f5f5", padding: 16 },
    children: Array.from({ length: 8 }, (_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: "#CF6679",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Item {index + 1}</Text>
      </View>
    )),
  },
};