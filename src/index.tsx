import {CSSProperties, FC, useRef, useState} from "react";
import { DimensionValue } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import {
    CalendlyEvent,
    IframeTitle,
    LoadingSpinner,
    PageSettings,
    Prefill,
    Utm,
    formatCalendlyUrl,
} from "./OCalendlyBase";
import styles from "./OCalendlyInline.styles";
import CalendlyLoadingSpinner from "./OCalendlyLoadingSpinner";

export interface Props {
    url: string;
    prefill?: Prefill;
    utm?: Utm;
    styles?: CSSProperties | undefined;
    pageSettings?: PageSettings;
    iframeTitle?: IframeTitle;
    LoadingSpinner?: LoadingSpinner;
    onEventScheduled?: (event: any) => void;
    onDateAndTimeSelected?: (event: any) => void;
    onEventTypeViewed?: (event: any) => void;
    onProfilePageViewed?: (event: any) => void;
    onPageHeight?: (event: any) => void;
}

const OCalendlyInline: FC<Props> = ({
                                        url,
                                        prefill,
                                        utm,
                                        pageSettings,
                                        iframeTitle,
                                        LoadingSpinner = CalendlyLoadingSpinner,
                                        onEventScheduled,
                                        onDateAndTimeSelected,
                                        onEventTypeViewed,
                                        onProfilePageViewed,
                                        onPageHeight,
                                    }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [webViewHeight, setWebViewHeight] = useState<DimensionValue>();
    const webViewRef = useRef<WebView>(null);

    // @dev This one might be more native/cleaner, but doesn't work for the Calendly events (except of PageHeight somehow)
    const injectedJavaScript = `
    (function() {
      window.addEventListener('message', function(e) {
        window.ReactNativeWebView.postMessage(JSON.stringify(e.data));
      });
      true;
    })();
  `;

    const handleMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            switch (data.event) {
                case CalendlyEvent.EVENT_SCHEDULED:
                    onEventScheduled?.(data.payload);
                    break;
                case CalendlyEvent.DATE_AND_TIME_SELECTED:
                    onDateAndTimeSelected?.(data.payload);
                    break;
                case CalendlyEvent.EVENT_TYPE_VIEWED:
                    onEventTypeViewed?.(data.payload);
                    break;
                case CalendlyEvent.PROFILE_PAGE_VIEWED:
                    onProfilePageViewed?.(data.payload);
                    break;
                case CalendlyEvent.PAGE_HEIGHT:
                    setWebViewHeight(
                        parseInt(data.payload.height.replace("px", "")),
                    );
                    onPageHeight?.(data.payload);
                    break;
            }
        } catch (error) {
            console.error("Failed to parse WebView message:", error);
        }
    };

    const src = formatCalendlyUrl({
        url,
        pageSettings,
        prefill,
        utm,
        embedType: "Inline",
    });

    /** @dev We need to use the html prop in order to correctly emit the CalendlyScheduled event. The URI prop doesn't work.
     * The full blown html including head, etc. is necessary to have a responsive view otherwise desktop is loaded.
     * @ref https://github.com/tcampb/react-calendly/issues/190#issuecomment-2364364463
     */
    return (
        <>
            {isLoading && <LoadingSpinner />}
            <WebView
                ref={webViewRef}
                style={[styles.webView, { height: webViewHeight }]}
                source={{
                    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
            }
            iframe {
              border: none;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <iframe src="${src}" width="100%" height="100%"></iframe>
        </body>
      </html>
    `,
                }}
                originWhitelist={["*"]}
                onLoadEnd={() => setIsLoading(false)}
                injectedJavaScript={injectedJavaScript}
                onMessage={handleMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error("WebView error: ", nativeEvent);
                }}
                onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error("WebView HTTP error: ", nativeEvent);
                }}
            />
        </>
    );
};

export default OCalendlyInline;
