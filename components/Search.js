import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import * as color from '../utils/colors';
import { summonerLookup } from '../actions';
import { connect } from 'react-redux';

class Search extends React.Component {
    state = { summonerName: '' };
    static navigationOptions = {
        title: 'Summoner Lookup',
        headerStyle: {
            backgroundColor: '#131e3a'
        },
        headerTintColor: '#edf9ff'
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.headerText}>EZ.GG</Text>
                <View style={styles.header}>
                    <Sae
                        style={{
                            marginBottom: 40
                        }}
                        label={'Enter Summoner Name'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={color.yellow}
                        labelStyle={{
                            color: color.white
                        }}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={text =>
                            this.setState({
                                summonerName: text
                            })
                        }
                    />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            this.props.summonerLookup(this.state.summonerName)
                        }>
                        <Text style={{ textAlign: 'center' }}>Search</Text>
                    </TouchableOpacity>

                    <Text style={styles.error}>{this.props.error}</Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    summonerLookup: summonerName => dispatch(summonerLookup(summonerName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 15
    },
    header: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        width: 200,
        padding: 15,
        backgroundColor: color.orange,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'gray',
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginBottom: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: color.light_blue,
        marginBottom: 15
    },
    error: {
        color: color.red,
        textAlign: 'center'
    }
});
