import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight , TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { BottomSheet } from 'react-native-btr'; 
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { gql, useQuery , useMutation} from '@apollo/client'
import { useEffect } from 'react/cjs/react.production.min';


const USER_QUERY = gql`
  query {
   getUserDetails(id:2){
    name
    website
    email
    profileUri
  }
}
`

const CHNAGE_PIC_MUTATION = gql`
mutation addProfilePic($ID: Int, $URI : String) {
  addProfilePicture(id: $ID, uri: $URI){
    name
  }
}
`
// const initial_profile_pic = './../assets/images/random-person.jpg'

const Home = (props) => {


    const { loading, data } = useQuery(USER_QUERY)


    const [changePicMutation, {data: mutation_data, loading:  mutation_loading, error: error}] = useMutation(CHNAGE_PIC_MUTATION,
      {
        variables:{
          ID: 1,
          URI: "./../assets/images/blankImage.png",
        }
      });
    // console.log(data);
    

    const picChangeCallback = (uri) => {
      changePicMutation({
        variables:{
          ID: 1,
          URI: uri,
        }
      },
      )
    }

    const [visible, setVisible] = React.useState(false);


    // const [profilePic, setProfilePic] = React.useState(require(data.profileUri));
    const [profilePic, setProfilePic] = React.useState(require('./../assets/images/blankImage.png'));
    // const [user_opinion, setuser_opinion] = React.useState('I like this news');
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [startCamera,setStartCamera] = React.useState(false)

    const removeProfilePic = () => {
        setProfilePic(require('./../assets/images/blankImage.png'));
        picChangeCallback('');
        setVisible(!visible);
    }

    const togglebottomNavigationView = () => {
        setVisible(!visible);
    }


    const [seenOnce, setSeenOnce] = React.useState(false);
    const user_opinion = 'Jonny Depp finally wins the trail!!'
    const src_img = require('./../assets/images/news.jpeg')

    const showStory = () => {
        setSeenOnce(true);
        props.navigation.navigate('Story', {
          src_img : src_img, 
          user_opinion : user_opinion
        })
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if ( pickerResult.cancelled == true){
        return;
        }

        setProfilePic({uri: pickerResult.uri});
        picChangeCallback(pickerResult.uri);
        

        setVisible(!visible);
    } 


    let openCameraAsync = async () => {
        let permissionResult = await Camera.requestCameraPermissionsAsync();

        if (permissionResult.status.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }else{
        setStartCamera(true);

        }
    }

    const takePicture = async () => {
        if (camera ){
          const data = await camera.takePictureAsync(null);
          console.log(data.uri);
          setProfilePic({uri: data.uri});
          picChangeCallback(data.uri);
          setStartCamera(false);
        }
    }

    return (

        <View style={styles.container}>
            {
                startCamera ?

                <View style={styles.cameraContainer}>
                    <Camera
                      ref={(ref) => setCamera(ref)}
                      style={styles.fixedRatio}
                      type={type}
                      ratio={'1:1'}
                    />
                    <Button title={'Take Picture'} onPress={takePicture} />

                </View> 

                :

                <View  style={styles.container}>

                    <View style = {styles.header}>
                        <Ionicons style = {styles.menu} name="menu" size={45} color="#fdbb21" />
                        <Ionicons style = {styles.back} name="chevron-back" size={45} color="#fdbb21" />
                    </View>
        
                    <TouchableOpacity style = {[styles.imageBorder, {'borderColor': seenOnce ? 'grey': '#fdbb21'}]} 
                          onPress={showStory }
                          onLongPress = {togglebottomNavigationView}
                    >
                        <View >
                            <Image 
                                source={profilePic}
                                // source = {{uri: './../assets/images/blankImage.png'}}
                                style={styles.image}
                            />
                            <FontAwesome5 style={styles.plus} name="plus" size={28} color="white" />
                        </View>
                    </TouchableOpacity>
          
                    <View style= {styles.bio}>
                        <Text style={styles.h1}>{data ? data.getUserDetails.name : ""}</Text>
                        <Text style={styles.h2}>{data ? data.getUserDetails.email : ""}</Text>
                        <Text style={styles.h2}>{data ? data.getUserDetails.website : ""}</Text>
                    </View>

                                
                    <View style={styles.footerTop}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#fdbb21'}} />
                        <View>
                            <MaterialCommunityIcons name="hexagon-outline" size={60} color="#fdbb21" />
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: '#fdbb21'}} />
                    </View>

                    <View style = {styles.footer}>
                        <Entypo style = {styles.triangle} name="triangle-up" size={120} color="#fdbb21" />
                        <FontAwesome style= {styles.square} name="square" size={60} color="#fdbb21" />
                    </View>

                    
                    <BottomSheet 
                        visible={visible}
                        onBackButtonPress={togglebottomNavigationView}
                        onBackdropPress={togglebottomNavigationView}
                    >
                        <View style = {styles.buttons}>
                            <Button
                            onPress={removeProfilePic}
                            title = "Remove Profile Pic"/>
                            
                            <Button
                            onPress={openImagePickerAsync}
                            title = "Select from Gallary"/>

                            <Button
                            onPress={openCameraAsync}
                            title = "Open Camera"/>
                        </View>
                    </BottomSheet>
                </View>
            }
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
    h1: {
      // color: '#008F68',
      fontSize: 20,
      color:"black"
    },
    h2: {
      // color : '#FAE042',
      fontSize: 15,
      color:"black"
      // marginTop: 8
    },
    image : {
      width: 200,
      height : 200,
      justifyContent: 'center',
      borderRadius: 100,
      overflow: 'hidden',
      alignItems: 'center',
    },
    cameraContainer: {
      flex: 1,
      // flexDirection: 'row',
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: 1,
    },  
    imageBorder:{
      width: 210,
      height: 210,
      justifyContent: 'center',
      borderRadius: 100,
      borderColor: '#fdbb21',
      borderWidth: 3,
      alignItems: 'center',
    },
    plus : {
      margin: 5,
      position: 'absolute',
      bottom: 5,
      right: 10,
      backgroundColor: '#fdbb21',
      borderRadius: 100,
      width: 30,
      height: 30,
      textAlign: 'center',
    },
    bio: {
      marginTop: 30,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 20,
    },
    header:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 30,
    },
    triangle: {
      flex: 1,
      flexDirection: 'row',
      margin: 5,
      bottom: -32,
      left: 35,
    },
    square: {
      margin: 5,
      position: 'absolute',
      bottom: -2,
      right: 60,
    },
    menu : {
      flex: 1,
      flexDirection: 'row',
      margin: 5,
      position: 'absolute',
      top: -2,
      left: 150,
    },
    back: {
      flex: 1,
      flexDirection: 'row',
      margin: 5,
      position: 'absolute',
      top: -2,
      right: 150,
    },
    footerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 70,
    },
    bottons :{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });
  
export default Home;