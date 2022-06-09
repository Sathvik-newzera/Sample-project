// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import React from 'react'; 
// import Home from './screens/HomeScreen';
// import Story from './screens/Story';
// import ProgressBar from './screens/ProgressBar';
import MyStack from './routes/storyStack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'


const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000',
  cache: new InMemoryCache(),
})



// const StoryStack = createStackNavigator();

export default function App() {
  const user_opinion = 'Jonny Depp finally wins the trail!!'
  const src_img = require('./assets/images/news.jpeg')

  // const [index, setIndex] = React.useState(0);

  // React.useEffect(() => {
  //     const interval = setInterval(() => {setIndex((index + 1)%(10+1));}, 500 );
  //     // console.log(index);
  //     return () => {clearInterval(interval);};
  //   },[index]);
  
  return (


        // <NavigationContainer>
        //     <StoryStack.Navigator initialRouteName='Home'>
        //         <StoryStack.Screen name = "Home" component = {Home} />
        //         <StoryStack.Screen name = "Story" component = {Story} />
        //     </StoryStack.Navigator>
        // </NavigationContainer>
  <ApolloProvider client={client}>
    <View style={styles.container}>
      <MyStack /> 
      {/* <Text>Hello</Text> */}
      {/* // <ProgressBar step={3} steps={10} height={20}/> */} 
       {/* <Story
        src_img = {src_img}
        user_opinion = {user_opinion}
      />  */}
    </View>
  </ApolloProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
});