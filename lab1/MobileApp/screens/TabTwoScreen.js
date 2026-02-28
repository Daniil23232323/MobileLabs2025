import {ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.BigTitle}>Photo</Text>
      <ScrollView>
          <View style={styles.PhotoElements}>
                  <PhotoElements NumberElements={17} />
          </View>
      </ScrollView>
    </View>
  );
}

function PhotoElements(props) {
  var PhotoElement = []
  for(let i = 0; i < props.NumberElements; i++){
    PhotoElement.push(<View style={styles.PhotoElement}></View>)
  }
  return PhotoElement;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  BigTitle: {
      fontSize: 25,
      fontWeight: "bold",
    },
  PhotoElements: {
      flexWrap: "wrap",
      flexDirection: 'row',
      width: "99%",
    },
  PhotoElement: {
      margin: 4,
      width: "31%",
      height: 110,
      backgroundColor: "rgb(250,250,250)",
      shadowColor: "#000",
      elevation: 6,
      borderRadius: 3,
    }
});
