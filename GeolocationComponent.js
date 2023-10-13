import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const GeolocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',


          
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startTracking = () => {
    setTracking(true);
    Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );
  };

  const stopTracking = () => {
    setTracking(false);
    Geolocation.stopObserving();
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Latitude: {location ? location.latitude : 'unknown'}
      </Text>
      <Text style={styles.text}>
        Longitude: {location ? location.longitude : 'unknown'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Tracking"
          onPress={startTracking}
          disabled={tracking}
        />
        <Button
          title="Stop Tracking"
          onPress={stopTracking}
          disabled={!tracking}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default GeolocationComponent;