import React, { useRef, useMemo, ReactNode, forwardRef, useImperativeHandle } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, ViewStyle } from "react-native";

export type BottomSheetProps = {
  children: ReactNode;
  snapPoints?: (string | number)[];
  onClose?: () => void;
  containerStyle?: ViewStyle;
  enableBackdrop?: boolean;
  enableFullScreenSwipe?: boolean;
};

export type BottomSheetRef = {
  expand: () => void;
  close: () => void;
};

export const EQBottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      snapPoints = ["25%", "50%", "90%"],
      onClose,
      containerStyle,
      enableBackdrop = true,
      enableFullScreenSwipe = false,
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const memoizedSnapPoints = useMemo(() => {
      if (enableFullScreenSwipe) {
        const hasFullScreen = snapPoints.some(
          (point) => point === "100%" || point === 1
        );
        return hasFullScreen ? snapPoints : [...snapPoints, "100%"];
      }
      return snapPoints;
    }, [snapPoints, enableFullScreenSwipe]);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={enableBackdrop ? BottomSheetBackdrop : undefined}
      >
        <BottomSheetView style={[styles.content, containerStyle]}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 60,
  },
});