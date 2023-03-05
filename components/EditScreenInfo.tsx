import React, { useEffect, useState } from 'react'
import { StyleSheet ,ScrollView,Text,View,TextInput,Button } from 'react-native';
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
// import { Text, View } from './Themed';
import { initializeApp } from "firebase/app";
import { config }  from "./config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import CardLayout from "./cardLayout"



export default function EditScreenInfo({ path }: { path: string }) {
const [datas,setData] = useState([])
useEffect(() => {
  const fetchData = async () => {
    const firebase = initializeApp(config);
    const dbRef = ref(getDatabase(firebase));
    console.log("printing");

    try {
      const snapshot = await get(child(dbRef, `manager`));
      if (snapshot.exists()) {
        const entries = snapshot.val().managerID;
        entries.map((item: any)=>console.log(item.name));
        setData(entries);
        console.log(entries);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
    console.log(dbRef);
  }

  fetchData();
}, [])
  return (
    <View>
     
     <Button  title={`Total Managers are ${datas?datas.length-1:'Unknown'} ${datas?"":'click here to Show Managers '}`}  />
      <ScrollView >
      <View>
      {datas && (
        <View>
          {datas.map((item:any,index) => (
            <View>
            <CardLayout key={index} descripton={item.desc} empName={item.name}></CardLayout>
            </View>
          ))}
        </View>
      )}
    </View>
    </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
