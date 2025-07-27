import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const handleScan = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Necesitás permiso para usar la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      setImageUri(image.uri);

      const formData = new FormData();
      formData.append('file', {
  uri: image.uri,           // sin .slice(7)
  name: "photo.png",        // importante en Android
  type: "image/png", 
      });

      try {
        const response = await fetch('http://192.168.100.34:8000/match-frame/', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();
        Alert.alert("Resultado", JSON.stringify(data));
      } catch (error) {
        console.error("Error al escanear:", error);
        Alert.alert("Error", "No se pudo contactar con el servidor.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleScan}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#0f0',
            padding: 20,
            borderRadius: 5,
          },
        ]}
      >
        <Text style={{ color: '#000' }}>Escanear Episodio</Text>
      </Pressable>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ marginTop: 20, width: 200, height: 200 }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
