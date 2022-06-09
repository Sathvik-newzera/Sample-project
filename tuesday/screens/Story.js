import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import React from 'react';
// import ProgressBar from './../screens/ProgressBar';
import { ProgressBar} from 'react-native-paper';
import { useEffect } from 'react/cjs/react.production.min';


const Story = (props) => {
    const src_img = props.route.params.src_img;
    const user_opinion = props.route.params.user_opinion

  const [index, setIndex] = React.useState(0);

  const StatusSeen = () => {
    // setIndex(0);
    props.navigation.navigate('Home');
  }

//   const myTimeout = setTimeout( StatusSeen , 5000)

    React.useEffect(()=> {
        setTimeout(StatusSeen, 5000);
    },[])
  React.useEffect(() => {
      const interval = setInterval(() => {setIndex((index) => (index + 0.041));}, 100);
    //   console.log(index);
      return () => {clearInterval(interval);};
    },[index]);

    return (
        <View style={styles.container}>
            <View style= {styles.ProgressBar}>
                <ProgressBar progress={index} color='red'/>
            </View>
            
            <View style = {styles.news}>
                <Image 
                    source = {(src_img)}
                    style = {styles.image}
                />
            </View>            
           
            <View style = {styles.opinion}>
                <Text style = {styles.opinion}>{user_opinion}</Text>
            </View>
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#442977',
        alignContent: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
        // width:'100%', height:'100%'
    },
    news: {
        flex : 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    image: {
        // width: 300,
        // height : 300,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    opinion: {
        fontSize: 40,
        color: '#FAE042',
        textAlign: 'center',
        marginTop: 20,
    },
    ProgressBar: {
        flex: 1,
        marginTop: 35,
        // padding: 20
        flexDirection: 'column',
        // alignContent: 'stretch',
        width: '100%'
    }
})

export default Story;