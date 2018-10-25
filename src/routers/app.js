import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { headerOptions, RouteConfigs, TabNavigatorConfig, StackNavigatorConfig } from '../components/Navigation/navConfig';
import { PersonalView, LoginView, Home, ExhibitionView, ListView, ECharts, ImagePicker, QrcodeView } from './index';



const TabBarText = {
  home: "首页",
  exhibitionName: "展示",
  persnalName: "个人中心",
}

const Nav = TabNavigator(

  {
    Home: {
      screen: Home,
      navigationOptions: props => {
        return RouteConfigs({
          imgSource: require('../commons/assets/icon_home_a.png'),
          label: TabBarText.home,
          props,
        })
      },
    },

    ExhibitionView: {
      screen: ExhibitionView,
      navigationOptions: props => {
        return RouteConfigs({
          imgSource: require('../commons/assets/icon_exhibition.png'),
          label: TabBarText.exhibitionName,
          props,
        })
      },
    },
    PersonalView: {
      screen: PersonalView,
      navigationOptions: props => {
        return RouteConfigs({
          imgSource: require('../commons/assets/icon_tab_person.png'),
          label: TabBarText.persnalName,
          props,
        })
      },
    },
  },
  TabNavigatorConfig({
    initialRouteName: "Home",
  }),
)


const Routers = StackNavigator(
  {
    Nav: {
      screen: Nav,
    },
    LoginView: {
      screen: LoginView,
      navigationOptions: props => {
        return headerOptions({
          ...props,
          ...{
            back: true,
          },
        })
      },
    },

    ListView: {
      screen: ListView,
      navigationOptions: props => {
        return headerOptions({
          ...props,
          ...{
            back: true,
          },
        })
      },
    },
    ECharts: {
      screen: ECharts,
      navigationOptions: props => {
        return headerOptions({
          ...props,
          ...{
            back: true,
          },
        })
      },
    },
    ImagePicker: {
      screen: ImagePicker,
      navigationOptions: props => {
        return headerOptions({
          ...props,
          ...{
            back: true,
          },
        })
      },
    },
    QrcodeView: {
      screen: QrcodeView,
      navigationOptions: props => {
        return headerOptions({
          ...props,
          ...{
            back: true,
          },
        })
      },
    },
  },

  StackNavigatorConfig({
    initialRouteName: "Nav",
  }),
)



export default Routers
