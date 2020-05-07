import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput
} from 'react-native';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            keyword1: "", msg1: "", contact1: "", keyword2: "", contact2: ""
        };
        this.handleKeyWordChangeText = this.handleKeyWordChangeText.bind(this);
        this.handleAlertMsgChangeText = this.handleAlertMsgChangeText.bind(this);
        this.handleContactChangeText = this.handleContactChangeText.bind(this);

        this.handleKeyWordChangeText2 = this.handleKeyWordChangeText2.bind(this);
        // this.handleAlertMsgChangeText2 = this.handleAlertMsgChangeText2.bind(this);
        this.handleContactChangeText2 = this.handleContactChangeText2.bind(this);
    }

    handleKeyWordChangeText(alertMsgText) {
        this.setState({
            keyword1: alertMsgText
        })
    }

    handleAlertMsgChangeText(alertMsgText2) {
        this.setState({
            msg1: alertMsgText2
        })
    }

    handleContactChangeText(alertMsgText3) {
        this.setState({
            contact1: alertMsgText3
        })
    }

    handleKeyWordChangeText2(alertMsgText4) {
        this.setState({
            keyword2: alertMsgText4
        })
    }

    // handleAlertMsgChangeText2(alertMsgText5) {
    //     this.setState({
    //         msg2: alertMsgText5
    //     })
    // }

    handleContactChangeText2(alertMsgText6) {
        this.setState({
            contact2: alertMsgText6
        })
    }


    onSubmitEditing = () => {
        this.props.navigation.navigate("Home", this.state);
        console.log(this.state);
    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text> Emergency Text Message:</Text>
                <Text> Keyword:</Text>
                <TextInput
                    defaultValue={this.state.keyword1}
                    onChangeText={this.handleKeyWordChangeText}
                    style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 3, padding: 10}}
                />

                <Text> Enter your alert message: </Text>
                <TextInput
                    defaultValue={this.state.msg1}
                    onChangeText={this.handleAlertMsgChangeText}
                    style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 3, padding: 10}}
                />

                <Text> Enter your emergency contact: </Text>
                <TextInput
                    defaultValue={this.state.contact1}
                    onChangeText={this.handleContactChangeText}
                    style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 3, padding: 10}}
                    // onSubmitEditing={this.onSubmitEditing}
                />

                <Text> Emergency Dialer:</Text>
                <Text> Keyword:</Text>
                <TextInput
                    defaultValue={this.state.keyword2}
                    onChangeText={this.handleKeyWordChangeText2}
                    style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 3, padding: 10}}
                />

                <Text> Enter your emergency contact number: </Text>
                <TextInput
                    defaultValue={this.state.contact2}
                    onChangeText={this.handleContactChangeText2}
                    style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 3, padding: 10}}
                    onSubmitEditing={this.onSubmitEditing}/>

            </View>
        );
    }
}