import * as React from "react";
import { View } from "react-native";
import "./OCalendlyInline.styles";
import styles from "./OCalendlyInline.styles";

class LoadingSpinner extends React.Component {
    render() {
        return (
            <View style={styles.calendlySpinner}>
                <View style={styles.calendlyBounce1}></View>
                <View style={styles.calendlyBounce2}></View>
                <View style={"calendly-bounce3" as any}></View>
            </View>
        );
    }
}

export default LoadingSpinner;
