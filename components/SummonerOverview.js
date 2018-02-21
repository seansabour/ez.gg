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

class SummonerOverview extends React.Component {
    state = { version: null, bookmarked: false };
    async componentWillMount() {
        const version = await getVersion();
        this.setState({ version: version[0] });
    }
    render() {
        const { summoner } = this.props;
        const { version, bookmarked } = this.state;
        if (!summoner) {
            return <ActivityIndicator />;
        }
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        padding: 10,
                        backgroundColor: color.cream
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                        <View>
                            {version ? (
                                <Image
                                    style={{ width: 64, height: 64 }}
                                    source={{
                                        uri: `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${
                                            summoner.profileIconId
                                        }.png`
                                    }}
                                />
                            ) : (
                                <ActivityIndicator size={'small'} />
                            )}
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 15
                            }}>
                            <View>
                                <Text style={{ fontSize: 14 }}>
                                    {summoner.name}
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: color.dark_green
                                    }}>
                                    Lv {summoner.summonerLevel}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState(prevState => ({
                                    bookmarked: !prevState.bookmarked
                                }));
                                this.props.bookmarkSummoner(summoner);
                            }}>
                            <Ionicons
                                name={
                                    this.props.favorites[summoner.accountId]
                                        ? 'ios-bookmark'
                                        : 'ios-bookmark-outline'
                                }
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    favorites: state.bookmarked
});

const mapDispatchToProps = dispatch => ({
    bookmarkSummoner: summoner => dispatch(bookmarkSummoner(summoner))
});
export default withNavigation(
    connect(mapStateToProps, mapDispatchToProps)(SummonerOverview)
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
