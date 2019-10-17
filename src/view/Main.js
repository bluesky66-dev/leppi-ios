import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

export default class Main extends Component {

    static navigationOptions = {header: null}

    render() {
        return (
            <Container style={styles.container}>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 20,

    },
    form: {
        marginTop: 150,
        alignItems: 'center',
    },
    instructions: {
        marginBottom: 20,

    },
    signup: {
        marginTop: 50,

    },
});
