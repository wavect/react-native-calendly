# react-native-calendly
Minimalistic React Native Calendly npm package.

## Get started
- `pnpm i @wavect/react-native-calendly` or
- `npm i @wavect/react-native-calendly` or
- `yarn add @wavect/react-native-calendly`

### Basic usage
```ts
import CalendlyInline from "@wavect/react-native-calendly";

<CalendlyInline
                url={`https://your-calendly.com`}
                pageSettings={{
                    hideLandingPageDetails: true,
                    hideEventTypeDetails: true,
                    primaryColor: Color.primary,
                    hideGdprBanner: true, // @dev Make sure we cover this in our data privacy policy
                }}
                utm={{
                    utmSource: "MobileApp",
                }}
                prefill={{
                    email: state.email,
                    firstName: state.firstName,
                    name: state.firstName,
                }}
                onEventScheduled={handleEventScheduled}
            />
```

## Disclaimer
This software is provided as is and no guarantees are being made. 

## Contributions
- [@tcampb](https://github.com/tcampb)
- [@wsdt](https://github.com/wsdt)

This package originated from [this Github thread](https://github.com/tcampb/react-calendly/issues/190). 

## About
[Wavect GmbH](https://wavect.io) is a Web3 Product Studio building Software with a strong focus on achieving Product-Market-Fit.
