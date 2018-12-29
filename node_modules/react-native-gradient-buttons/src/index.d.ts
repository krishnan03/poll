// Type definitions for react-native-gradient-buttons
// Project: React Native Gradient Buttons
// Definitions by: Thomas Wang <thomaswang.io>

import { TextStyle, ViewStyle } from 'react-native';

/*~ You can declare types that are available via importing the module */
export interface Props {
    children: JSX.Element[] | JSX.Element,
    style: ViewStyle,
    text: string,
    textStyle: TextStyle,
    gradientBegin: string,
    gradientEnd: string,
    gradientDirection: string,
    height: any,
    width: any,
    radius: number,
    impact: boolean,
    impactStyle: string,
    onPressAction: Function,    
    purpleViolet: boolean,
    violetPink: boolean,
    pinkDarkGreen: boolean,
    blueViolet: boolean,
    blueMarine: boolean,
    deepBlue: boolean,
}