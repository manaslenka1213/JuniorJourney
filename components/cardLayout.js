import { Text,View,TextInput,Button , TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";
import styles from './style_sheet';

const CardLayout = ({empName,descripton}) => {

    const handleEdit = () => {
        console.log('Edit button clicked');
      };
    
      const handleDelete = () => {
        console.log('Delete button clicked');
      };
return (
    <View style={styles.card}>
      <Text style={styles.title}>{empName}</Text>
      <Text style={styles.description}>{descripton}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
);
}

export default CardLayout