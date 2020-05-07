import React, { Component } from 'react';
import { Text, View, Share, Button, StyleSheet, TouchableOpacity, Image, Linking, Platform, TextInput } from 'react-native';
import SendSMS from 'react-native-sms'

export default class Alerter extends Component {
    constructor(props) {
        super(props);
        this._shareMessage = this._shareMessage.bind(this);
        this._showResult = this._showResult.bind(this);
    }

    _shareMessage() {
        Share.share({
            message: this.props.route.params.message
        }).then(this._showResult);
    }

    _showResult(result) {
        this.setState({result});
    }

    dialCall = () => {
        let phonenumber = 'tel:$911';
        Linking.openURL(phonenumber);
    }

    someFunction() {
        SendSMS.send({
            //Message body
            body: 'Help! I am in distress. I am currently located at 2089 Fordham Dr, Santa Clara, CA 95051, USA',
            //Recipients Number
            recipients: [this.props.route.params.contactInfo],
            //An array of types that would trigger a "completed" response when using android
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            if (completed) {
                console.log('SMS Sent Completed');
            } else if (cancelled) {
                console.log('SMS Sent Cancelled');
            } else if (error) {
                console.log('Some error occured');
            }
        });
    }

    render() {
        console.log(this.props.route.params);
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Button onPress={this.someFunction.bind(this)}
                        title="Send SMS"
                        color="red"/>
                <Button onPress={this.dialCall.bind(this)}
                        title="Make phone call"/>
            </View>
        );
    }
}