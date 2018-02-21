import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';
import { summonerLookup, hideErrorMessages } from '../actions';
import { connect } from 'react-redux';

class Search extends React.Component {
    state = { summonerName: '' };
    static navigationOptions = {
        title: 'Summoner Lookup',
        headerStyle: {
            backgroundColor: color.green
        },
        headerTintColor: color.light_gray
    };

    render() {
        const { error } = this.props;
        console.log(error);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                //borderRadius: 4,
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
                        showLoading={this.props.isFetching}
                        value={this.state.summonerName}
                        placeholder="Search for a Summoner"
                        onChangeText={summonerName => {
                            this.props.hideErrorMessages();

                            this.setState({ summonerName });
                        }}
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => {
                            if (!this.state.summonerName) {
                                return;
                            }
                            this.props.summonerLookup(this.state.summonerName);
                        }}
                        clearButtonMode="while-editing"
                    />
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (!this.state.summonerName) {
                                return;
                            }
                            this.props.summonerLookup(this.state.summonerName);
                        }}>
                        <Text style={{ textAlign: 'center' }}>Search</Text>
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.error}>{this.props.error}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    error: state.error,
    isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
    summonerLookup: summonerName => dispatch(summonerLookup(summonerName)),
    hideErrorMessages: () => dispatch(hideErrorMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: color.cream
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
