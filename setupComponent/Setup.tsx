import * as React from 'react';
import Constants from "expo-constants";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pic}>
        <Avatar.Image size={80} source={require('../assets/empty.png')} />
      </View>
      <View style={styles.name}>
        <Text>FirstName LastName</Text>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  pic: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  name: {
    justifyContent: "space-between",
    alignItems: "center",
  }
});

export default Setting