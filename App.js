import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import MainNavigation from './Navigation';
import StyledStatusBar from './components/StatusBar';

export default class App extends React.Component {
    render() {
        const store = configureStore();

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StyledStatusBar
                        backgroundColor="#131e3a"
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
