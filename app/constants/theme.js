import { Dimensions } from  'react-native';
const {width, height} = Dimensions.get('window');

/* Creating predefined colors and dimension*/
export const COLORS = {
    primary: "#252c4a",
    secondary: "#1E90FF",
    accent: '#3498cb',

    success: '#00C851',
    error: '#ff4444',

    black: '#171717',
    white: '#FFFFFF',
    background: "#1b3646"
}

export const SIZES = {
    base: 10,
    width,
    height
}