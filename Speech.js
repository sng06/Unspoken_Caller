// Reference: https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert,
} from "react-native";
import Voice from "react-native-voice";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import Alerter from "./Alerter";

class Speech extends Component {
  state = {
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    location: "",
    loading: false,
    message: "",
    contactInfo: "",
    isText: true,
  };
  constructor(props) {
    console.log(props.route.params);
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    //Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }
  componentWillUnmount() {
    //destroy the process after switching the screen

    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };
  onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log("onSpeechResults: ", e);
    //let results = e.value;
    for (var i = 0; i < e.value.length; i++) {
      if (e.value[i].toLowerCase() === this.props.route.params.keyword1) {
        this.setState({
          isText: true,
          message: this.props.route.params.msg1,
          contactInfo: this.props.route.params.contact1,
        });
        console.log("Navigate to next page"); //TODO: trigger text message

        const { location, loading, addressComponent } = this.state;
        this._requestLocation();
        console.log(location);
        this.props.navigation.navigate("Alerter", this.state);
        break;
      } else if (e.value[i].toLowerCase() === "stay away") {
        console.log("pasta lover"); //TODO: trigger phone call
        break;
      } else {
        console.log("No match");
      }
    }
    this.setState({
      results: e.value,
    });
  };
  onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({
      pitch: e.value,
    });
  };
  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    this.setState({
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });
    try {
      await Voice.start("en-US");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });
  };
  _requestLocation = () => {
    //console.log("helloooo");
    const geo_api = process.env.GEO_API_KEY;
    Geocoder.init(geo_api);
    this.setState({ loading: true, location: null });
    var addressComponent;
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then((location) => {
        Geocoder.from(location.latitude, location.longitude).then((json) => {
          addressComponent = json.results[0].formatted_address;
          this.setState({
            location: addressComponent,
            loading: false,
          });
          console.log(addressComponent);
          //console.log(JSON.stringify(this.state, 0, 2));
        });
      })
      .catch((ex) => {
        const { code, message } = ex;
        console.warn(code, message);
        if (code === "CANCELLED") {
          Alert.alert("Location cancelled by user or by another request");
        }
        if (code === "UNAVAILABLE") {
          Alert.alert("Location service is disabled or unavailable");
        }
        if (code === "TIMEOUT") {
          Alert.alert("Location request timed out");
        }
        if (code === "UNAUTHORIZED") {
          Alert.alert("Authorization denied");
        }
        this.setState({
          location: null,
          loading: false,
        });
      });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.mainTitle}>Send your help!</Text>
          <Text style={styles.instructions}>Press mic button to start</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.textOutputTitle}>Text Output</Text>
          </View>
          <View
            style={{
              height: 200,
              flexDirection: "row",
              paddingRight: 50,
              paddingLeft: 50,
            }}
          >
            <View style={styles.textOutputContainer}>
              {this.state.results.map((result, index) => {
                return (
                  <Text key={`result-${index}`} style={styles.label}>
                    {result}
                  </Text>
                );
              })}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: 300,
              padding: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#BD0439",
              }}
            >{`Pitch \n ${this.state.pitch}`}</Text>
            <TouchableHighlight
              onPress={this._startRecognizing}
              style={{ marginVertical: 50, justifyContent: "center" }}
            >
              <Image
                style={styles.button}
                source={require("./Images/microphone.png")}
                style={{ width: 50, height: 80 }}
              />
            </TouchableHighlight>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#BD0439",
              }}
            >{`Error \n ${this.state.error}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "space-between",
              position: "absolute",
              bottom: 0,
            }}
          >
            <TouchableHighlight
              onPress={this._stopRecognizing}
              style={{ flex: 1, backgroundColor: "#D32F2F" }}
            >
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._cancelRecognizing}
              style={{ flex: 1, backgroundColor: "#D32F2F" }}
            >
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{ flex: 1, backgroundColor: "#D32F2F" }}
            >
              <Text style={styles.action}>Clear</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  textOutputContainer: {
    flex: 1,
    borderWidth: 1,
  },
  mainTitle: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    paddingTop: 20,
  },
  action: {
    width: "100%",
    textAlign: "center",
    color: "white",
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    fontSize: 15,
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    textAlign: "center",
    color: "#D32F2F",
    marginBottom: 5,
  },
  textOutputTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#BD0439",
    marginBottom: 5,
    marginTop: 30,
  },
});
export default Speech;
