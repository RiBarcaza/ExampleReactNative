
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { App } from '../App'

const MainNavigator = createStackNavigator({
    Home: {
        screen: App,
        navigationOptions: () =>
            ({ title: 'Inicio', headerBackTitle: null })
    },
});

const MainNavigator = createAppContainer(MainNavigator);

export default MainNavigator;