import React, { Component } from 'react';
import { Image } from 'react-native';
import Setup from './Setup';
import Speech from './Speech';
navigator.geolocation = require('@react-native-community/geolocation');
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Alerter from './Alerter';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, H1 } from 'native-base';

const Stack = createStackNavigator();
export default class CardImageExample extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name= "Home" component = {HomeScreen}/>
                    <Stack.Screen name= "Setup" component = {Setup}/>
                    <Stack.Screen name= "Speech" component = {Speech}/>
                    <Stack.Screen name= "Alerter" component = {Alerter}/>

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

class HomeScreen extends Component {

    render() {
        var contact = this.props.route.params;

        return (
            <Content padder>
                <H1> Unspoken Caller </H1>
                <Card>

                <CardItem header button onPress={() => {
                    this.props.navigation.navigate("Setup");
                //this.props.navigation.navigate("Setup", {test: "hi"});
                console.log(this.props);
                console.log(this.props.navigation);
                }}
                >
                <Text>Setup</Text>
                </CardItem>
                <CardItem cardBody>

                <Image source={{uri: 'https://mymodernmet.com/wp/wp-content/uploads/archive/WgD9KRVDXIug8mEz6dYW_KidofSteel.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                </Card>
                <Card>
                    <CardItem header button onPress={() => {
                        this.props.navigation.navigate("Speech", contact);
                    }}
                    >
                        <Body>
                        <Text style={{ fontFamily: 'Iowan Old Style' }}>Contact</Text>
                        </Body>
                    </CardItem>

                    <CardItem cardBody>
                        <Image source={{uri: 'https://mymodernmet.com/wp/wp-content/uploads/archive/1l5UE-2HoIpTSrO73U9p_NeighborhoodsFinest.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>

                    <CardItem header button onPress={() => alert("This is Card Header")}>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}