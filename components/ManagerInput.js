import React, { useState,useEffect } from 'react';
import { config }  from "./config";
import { initializeApp } from "firebase/app";
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, child, push, update,set, get } from "firebase/database";


const ManagerInput = () => {
  const [enteredManager, setEnteredManager] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [previousManager, setPreviousManager] = useState('');
  const [previousDescription, setPreviousDescription] = useState('');
  const firebase = initializeApp(config);
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
        entries.map((item)=>console.log(item.name));
        setData(entries.length);
        console.log(entries.length);
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
  const managerInputHandler = enteredText => {
    setEnteredManager(enteredText);
  };

  const descriptionInputHandler = enteredText => {
    setEnteredDescription(enteredText);
  };

  const saveManagerHandler = () => {
    setPreviousManager(enteredManager);
    setPreviousDescription(enteredDescription);
  };

  const resetManagerHandler = () => {
    setEnteredManager('');
    setEnteredDescription('');
    setPreviousManager('');
    setPreviousDescription('');
  };

  const undoManagerHandler = () => {
    setEnteredManager(previousManager);
    setEnteredDescription(previousDescription);
  };

  const addManagerHandler = () => {

   
    // const newManagerRef = push(child(dbRef, 'manager/managerID'));
    // const newManagerKey = newManagerRef.key;
  
    const newManager = {
      name: enteredManager,
      desc: enteredDescription
    };
    const updates = {};
updates['/manager/managerID/3'] = newManager;

    const newManagerRef = set(ref(getDatabase(firebase), `/manager/managerID/${datas}`), newManager);
    set(newManagerRef, newManager)
      .then(() => {
        setEnteredManager('');
        setEnteredDescription('');
        setPreviousManager('');
        setPreviousDescription('');
      })
      .catch((error) => {
        console.log(error);
      });
    setEnteredManager('');
    setEnteredDescription('');
    setPreviousManager('');
    setPreviousDescription('');


  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Manager Name"
        style={styles.input}
        onChangeText={managerInputHandler}
        value={enteredManager}
      />
      <TextInput
        placeholder="Manager Description"
        style={styles.input}
        onChangeText={descriptionInputHandler}
        value={enteredDescription}
      />
      <View style={styles.buttonContainer}>
        <Button title="SAVE" onPress={saveManagerHandler} />
        <Button title="RESET" onPress={resetManagerHandler} />
        <Button title="UNDO" onPress={undoManagerHandler} />
      </View>
      <Button title="ADD" onPress={addManagerHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ManagerInput;
