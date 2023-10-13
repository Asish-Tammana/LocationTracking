import { useEffect, useState } from 'react';
import {
    Button,
    PermissionsAndroid,
    Platform,
    Text,
    View,
  } from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const Home = (props) => {
    
    const [currentLatitude, setCurrentLatitute] = useState("")
    const [currentLongitude, setCurrentLongitude] = useState('')
    const [locationStatus, setLocationStatus] = useState("")
    const [trackingModeOn, setTrackingStatus] = useState(false)

    useEffect(() => {
        const requestLocationPermission = async() => {
            if(Platform.OS === 'ios'){
                // getOneTimeLocation()
                // subscribeLocationLocation()

            } else{
                try{
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Location Access Req",
                            message: "This app needs your location"
                        },
                    );

                    if(granted === PermissionsAndroid.RESULTS.GRANTED){
                       // getOneTimeLocation()
                 // subscribeLocationLocation()
                    } else{
                        setLocationStatus("Permission Denied")
                    }

                } catch(err){
                    setLocationStatus(err)
                }
            }
        };
        requestLocationPermission();
        
    }, []);


    const getOneTimeLocation = () => {
        setLocationStatus("Getting Location ....")
        
        Geolocation.getCurrentPosition(
            (position) => {
                setLocationStatus("You are Here");

                const currLatitude = JSON.stringify(position.coords.latitude)
                const currLongitude = JSON.stringify(position.coords.longitude)

                setCurrentLatitute(currLatitude)
                setCurrentLongitude(currLongitude)
            },
            (error) => {
                setLocationStatus(error)
            }
        )
    }

    useEffect(() => {
        if (trackingModeOn){
            const intervalID = setInterval(getOneTimeLocation, 1000)

            return () => clearInterval(intervalID)
        }
    }, [trackingModeOn])

    const trackingStart = () => {
        setTrackingStatus(true)
       
    }

    const stopTracking = () => {
        setTrackingStatus(false)
        setCurrentLatitute("")
                setCurrentLongitude("")
        
        
    }


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>This is are the coordinates </Text>
        <Button title='Start Tracking' onPress={trackingStart}/>
        <Text>wow</Text>
        <Text style={{ fontSize: 20, color: 'black' }}>latitude: {currentLatitude} </Text>
        <Text style={{ fontSize: 20, color: 'black' }}>longitude: {currentLongitude} </Text>
        <Button title='Stop Tracking' onPress={stopTracking}/>
        <Text style={{ fontSize: 20, color: 'black', marginTop: 40 }}>Make sure the location is turned on </Text>
      </View>
    )
  }

  export default Home