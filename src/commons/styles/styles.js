import AppColors from './colors';
import { Dimensions } from 'react-native';

const AppStyles = {

    screen_width: Dimensions.get('window').width,
    screen_height: Dimensions.get('window').height,

    container: {
        flex: 1,
        backgroundColor: AppColors.background
    },
    line: {
        backgroundColor: AppColors.line,
        height: 1
    },
}

export default AppStyles;