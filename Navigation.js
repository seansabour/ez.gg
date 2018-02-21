import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Search from './components/Search';
import MatchHistory from './components/MatchHistory';

const StackNavigation = StackNavigator({
    Home: { screen: Search },
    MatchHistory: { screen: MatchHistory }
});

const MainNavigation = TabNavigator({
    Home: {
        screen: StackNavigation,
        navigationOptions: {
            title: 'Summoner Lookup',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-search" size={24} />
            )
        }
    }
});
export default MainNavigation;
