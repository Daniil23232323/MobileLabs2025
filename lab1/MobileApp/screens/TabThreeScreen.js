import {TextInput, Alert, TouchableHighlight, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.BigTitle}>Profile</Text>
      <InputElements title="Email" KType="email-address" secure={false}/>
      <InputElements title="Password" KType="default" secure={true}/>
      <InputElements title="Repeat password" KType="default" secure={true}/>
      <InputElements title="First name" KType="default" secure={false}/>
      <InputElements title="Last name" KType="default" secure={false}/>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.5}
            underlayColor="rgb(127, 165, 240)"
            onPress={() => alert('Pressed!')}
            value="asdasd"
          >
              <Text style={styles.buttonText}>Button</Text>
          </TouchableHighlight>
    </View>
  );
}


function InputElements(props) {
  return (
  <View style={styles.ProfileElements}>
      <Text style={styles.description}>{props.title}</Text>
      <TextInput
            style={styles.InputElement}
            keyboardType={props.KType}
            secureTextEntry={props.secure}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
      backgroundColor: "rgb(86, 142, 252)",
      justifyContent: "center",
      alignItems: "center",
      width: "93.1%",
      height: 48,
      borderRadius: 5,
      },
  description: {
        fontSize: 16,
      },
  buttonText: {
      color: "white",
        fontSize: 20,
      },
  BigTitle: {
      fontSize: 25,
      fontWeight: "bold",
    },
  ProfileElements: {
    padding: 2,
    margin: 4,
    justifyContent: "center",
    width: 340,
    },
  InputElement: {
      fontSize: 16,
      width: "100%",
      borderColor: "rgb(200,200,200)",
      borderWidth: 1.2,
      borderRadius: 5,
    }
});
