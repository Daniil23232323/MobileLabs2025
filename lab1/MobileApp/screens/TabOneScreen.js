import {Image, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.BigTitle}>Home</Text>
      <ScrollView>
          <HomeElements NumberElements={6} />
      </ScrollView>
    </View>
  );
}

function HomeElements(props) {
  var BigElement = []
  for(let i = 0; i < props.NumberElements; i++){
    BigElement.push(
        <View style={styles.HomeElement}>
            <Image source={require('../assets/images/no-image.png')}
                   style={styles.image}
                />
            <View style={styles.TextElement}>
              <Text style={styles.title}>Title</Text>
              <Text style={styles.description}>Description</Text>
            </View>
        </View>
    )
  }
  return BigElement;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  BigTitle: {
      fontSize: 25,
      fontWeight: "bold",
    },
    description: {
          fontSize: 16,
        },
    image: {
     width: 80,
     height: 80,
     },
  HomeElement: {
      flexDirection: 'row',
      marginVertical: 5,
      paddingVertical: 8,
      paddingHorizontal: 6,
      width: 340,
      backgroundColor: "rgb(220,220,220)",
      borderRadius: 5,
    },
    TextElement: {
      paddingHorizontal: 6,
      flexDirection: 'column',
      backgroundColor: "rgb(220,220,220)",
    }
});
