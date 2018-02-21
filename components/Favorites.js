import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getVersion } from '../utils/helpers';
import { withNavigation } from 'react-navigation';
import { bookmarkSummoner } from '../actions';
import SummonerOverview from './SummonerOverview';
class Favorites extends React.Component {
    render() {
        const { favorites } = this.props;
        console.log(`Favorites ==> ${JSON.stringify(favorites)}`);
        const favoriteList = Object.entries(favorites).map(([key, val]) => {
            console.log(`Summoner ==> ${JSON.stringify(val)}`);
            return <SummonerOverview key={key} summoner={val} />;
        });
        return <View style={{ flex: 1 }}>{favoriteList}</View>;
    }
}
const mapStateToProps = state => ({
    favorites: state.bookmarked
});

const mapDispatchToProps = dispatch => ({
    bookmarkSummoner: summoner => dispatch(bookmarkSummoner(summoner))
});

export default withNavigation(
    connect(mapStateToProps, mapDispatchToProps)(Favorites)
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: color.white,
        borderWidth: 0.5,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        height: 100
    },
    error: {
        color: color.red,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
