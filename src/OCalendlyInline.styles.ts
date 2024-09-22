import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window"); // Get the window dimensions

const styles = StyleSheet.create({
    calendlyInlineWidget: {
        fontSize: 16,
        lineHeight: 19.2,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    webView: {
        width: "100%",
        height: "100%",
        minHeight: 600,
    },
    calendlyInlineWidgetAll: {
        fontSize: 16,
        lineHeight: 19.2,
    },
    calendlyBadgeWidget: {
        fontSize: 16,
        lineHeight: 19.2,
    },
    calendlyBadgeWidgetAll: {
        fontSize: 16,
        lineHeight: 19.2,
    },
    calendlyOverlay: {
        fontSize: 16,
        lineHeight: 19.2,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 9999,
        backgroundColor: "rgba(31, 31, 31, 0.4)",
    },
    calendlyOverlayAll: {
        fontSize: 16,
        lineHeight: 19.2,
    },
    calendlyInlineWidgetIframe: {
        width: "100%",
        height: "100%",
    },
    calendlyBadgeWidgetIframe: {
        width: "100%",
        height: "100%",
    },
    calendlyOverlayIframe: {
        width: "100%",
        height: "100%",
    },
    calendlyCloseOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    calendlyBadgeWidgetPosition: {
        position: "absolute",
        right: 20,
        bottom: 15,
        zIndex: 9998,
    },
    calendlyBadgeContent: {
        width: "auto",
        height: 45,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        fontFamily: "sans-serif",
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 14,
        color: "#fff",
    },
    calendlyBadgeContentWhite: {
        color: "#666a73",
    },
    calendlyBadgeContentSpan: {
        fontSize: 12,
    },
    calendlySpinner: {
        position: "absolute",
        top: height * 0.5, // 50% of the window height
        left: 0,
        right: 0,
        transform: [{ translateY: -height * 0.5 }], // Translate by -50% of the height
        textAlign: "center",
        zIndex: -1,
    },
    calendlyBounce1: {
        width: 18,
        height: 18,
        backgroundColor: "#e1e1e1",
        borderRadius: 9, // Changed to 50% of width/height
        verticalAlign: "middle",
        // @ts-ignore
        animation: "calendlyBouncedelay 1.4s infinite ease-in-out", // Simplified animation
        animationDelay: "-0.32s",
    },
    calendlyBounce2: {
        // @ts-ignore
        animationDelay: "-0.16s",
    },
    // Note: Keyframe animations like calendlyBouncedelay are not supported in React Native.
});

export default styles;
