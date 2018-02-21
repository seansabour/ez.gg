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
import { summonerLookup, hideErrorMessages } from '../actions';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

class MatchHistory extends React.Component {
    componentDidMount() {
        console.log(`Data ==> ${JSON.stringify(this.props)}`);
        this.props.navigation.setParams({
            //name: this.props.data.name
        });
    }
    static navigationOptions = () => {
        //const { name } = this.props.data;
        return {
            //title: name,
            headerStyle: {
                backgroundColor: color.green
            },
            headerTintColor: color.light_gray
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>MATCH HISTORY: {JSON.stringify(this.props.data)}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MatchHistory);

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
