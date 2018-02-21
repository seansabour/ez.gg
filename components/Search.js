import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';
import {
    getBySummonerName,
    hideErrorMessages,
    clearCurrentSummoner
} from '../actions';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import SummonerOverview from './SummonerOverview';
import Favorites from './Favorites';

class Search extends React.Component {
    state = { summonerName: '' };
    static navigationOptions = {
        title: 'Summoner Lookup',
        headerStyle: {
            backgroundColor: color.green
        },
        headerTintColor: color.light_gray
    };

    /*
     * _handleChangeText handles input text onChangeText
     * and checks to see if any errors, if so hide them.
     * It will also check to see if any data is currently
     *  in redux, if so clear it. finally it updates state.
     */
    _handleChangeText = summonerName => {
        if (this.props.error) {
            this.props.hideErrorMessages();
        }
        if (!summonerName || this.props.data) this.props.clearCurrentSummoner();

        this.setState({ summonerName });
    };

    render() {
        const { error, isFetching, data } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                borderWidth: error ? 1 : 0.5,
                                borderColor: error ? 'red' : 'gray',
                                shadowColor: error ? 'red' : 'gray',
                                shadowOffset: {
                                    width: error ? 4 : 2,
                                    height: error ? 4 : 2
                                },
                                shadowOpacity: 1,
                                shadowRadius: error ? 2 : 1
                            }
                        ]}
                        autoCapitalize="none"
                        value={this.state.summonerName}
                        placeholder="Search for a Summoner"
                        onChangeText={this._handleChangeText}
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => {
                            if (!this.state.summonerName) {
                                return;
                            }
                            this.props.getBySummonerName(
                                this.state.summonerName
                            );
                        }}
                        clearButtonMode="while-editing"
                    />
                    {isFetching && <ActivityIndicator size="large" />}
                </View>
                {data &&
                    !error && (
                        <View style={{ alignSelf: 'stretch' }}>
                            <SummonerOverview summoner={data} />
                        </View>
                    )}
                {this.props.favorites && (
                    <View style={{ alignSelf: 'stretch' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            Favorites
                        </Text>
                        <Favorites />
                    </View>
                )}

                <Text style={styles.error}>{this.props.error}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    error: state.error,
    isFetching: state.isFetching,
    favorites: state.bookmarked
});

const mapDispatchToProps = dispatch => ({
    getBySummonerName: summonerName =>
        dispatch(getBySummonerName(summonerName)),
    hideErrorMessages: () => dispatch(hideErrorMessages()),
    clearCurrentSummoner: () => dispatch(clearCurrentSummoner())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: color.dark_gray
    },
    header: {
        alignSelf: 'stretch',
        justifyContent: 'flex-start'
    },
    textInput: {
        padding: 15,
        backgroundColor: color.white,
        marginBottom: 10
    },

    error: {
        color: color.red,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
