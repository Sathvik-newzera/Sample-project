import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './../screens/HomeScreen';
import Story from './../screens/Story';


const StoryStack = createStackNavigator();

// function MyStack() {
//     return (
//         <NavigationContainer>
//             <StoryStack.Navigator initialRouteName='Home'>
//                 <StoryStack.Screen name = "Home" component = {HomeScreen} />
//                 <StoryStack.Screen name = "Story" component = {Story} />
//             </StoryStack.Navigator>
//         </NavigationContainer>
        
//     )
// }

const MyStack = (props) => {
    return(
        <NavigationContainer>
            <StoryStack.Navigator initialRouteName='Home'>
                <StoryStack.Screen name = "Story" component = {Story} 
                    
                    options = {{
                        headerShown: false
                    }}
                />
                <StoryStack.Screen name = "Home" component = {HomeScreen} 
                    options = {{
                        headerShown: false,
                    }}
                />
            </StoryStack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack;