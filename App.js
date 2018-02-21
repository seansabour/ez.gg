import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import MainNavigation from './Navigation';
import StyledStatusBar from './components/StatusBar';
import * as color from './utils/colors';

export default class App extends React.Component {
    render() {
        const store = configureStore();

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StyledStatusBar
                        backgroundColor={color.green}
                        barStyle="light-content"
                    />
                    <MainNavigation />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
