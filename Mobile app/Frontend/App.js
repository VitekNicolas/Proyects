import { StatusBar } from 'expo-status-bar';
import { Pressable, View, StyleSheet, Alert, Image, Animated, ImageBackground, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from 'react';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleScan = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permiso denegado", "Necesitás permiso para usar la cámara.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 0.7, base64: false });

      if (!result.cancelled && result.assets?.length > 0) {
        setImageUri(result.assets[0].uri);

        const formData = new FormData();
        formData.append('file', {
          uri: result.assets[0].uri,
          name: 'frame.png',
          type: 'image/png',
        });

        const response = await fetch('http://192.168.100.34:8000/match-frame/', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        Alert.alert("Resultado", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error al escanear:", error);
      Alert.alert("Error", "No se pudo contactar con el servidor.");
    }
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/wallpaper.jpg')} resizeMode="stretch" style={styles.background}>
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <Pressable
            onPress={handleScan}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.roundButton}
          >
            <Image source={require('./assets/z.png')} style={styles.icon} />
          </Pressable>
        </Animated.View>
      </ImageBackground>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ marginTop: 20, width: 200, height: 200 }} />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
  },
  buttonWrapper: {
    position: 'absolute',
    top: height * 0.4, // adaptá según la zona del símbolo
    left: width * 0.3, // adaptá según tu diseño
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});