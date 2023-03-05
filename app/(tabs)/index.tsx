import { StyleSheet } from 'react-native';
import { ScrollView,Text,TextInput,Button } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import ManagerInput from '../../components/ManagerInput';
import { View } from '../../components/Themed';
import styles from '../../components/style_sheet'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.title}>Tab One</Text> */}
      <ManagerInput></ManagerInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
