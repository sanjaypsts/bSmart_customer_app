import { Dimensions, PixelRatio} from 'react-native';

export const wH = Dimensions.get('window').height;
export const wW = Dimensions.get('window').width;
export const globalPaddingHorizontal = {paddingHorizontal: wW/20}


const scale = wW / 375;
export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
