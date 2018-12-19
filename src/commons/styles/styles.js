import AppColors from './colors';
import { Dimensions, Platform, StatusBar } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const AppStyles = {

    screen_width: ScreenWidth,
    screen_height: ScreenHeight,

    container: {
        flex: 1,
        backgroundColor: AppColors.background
    },
    line: {
        backgroundColor: AppColors.line,
        height: 1
    },
    //由于引用了teaset组件并适配了iPhoneX，此处做iPhone XR,XS Max屏幕适配,此处只做了竖屏适配
    NavBottomStyle: {
        height: Platform.OS === 'android' ? 50 : ((ScreenWidth === XSMAX_WIDTH) || (ScreenHeight === XSMAX_HEIGHT) ? 90 : 50),
        paddingBottom: Platform.OS === 'android' ? 0 : ((ScreenWidth === XSMAX_WIDTH) || (ScreenHeight === XSMAX_HEIGHT) ? 40 : 0),
        borderTopColor: "#e5e5e5",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#e5e5e5",
        backgroundColor: "#f8f8f8",

    },
    NavTopStyle: {
        height: 44,
        height: Platform.OS === 'android' ? 44 + StatusBar.currentHeight : ((ScreenWidth === XSMAX_WIDTH) || (ScreenHeight === XSMAX_HEIGHT) ? 64 : 44),
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : ((ScreenWidth === XSMAX_WIDTH) || (ScreenHeight === XSMAX_HEIGHT) ? 40 : 0),
        backgroundColor: AppColors.themecolor,
        borderBottomWidth: 0,
        elevation: 0,//消除安卓端导航栏底部的阴影
    }
}

export default AppStyles;