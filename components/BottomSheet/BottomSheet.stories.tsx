import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { EQBottomSheet, BottomSheetRef } from "./BottomSheet";

const meta: Meta = {
  title: "Components/BottomSheet",
  component: EQBottomSheet,
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const sheetRef = useRef<BottomSheetRef>(null);

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Open Bottom Sheet" onPress={() => sheetRef.current?.expand()} />
        <EQBottomSheet enableFullScreenSwipe={true} ref={sheetRef} onClose={() => {}}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>Hello from Bottom Sheet!</Text>
        </EQBottomSheet>
      </View>
    );
  },
};