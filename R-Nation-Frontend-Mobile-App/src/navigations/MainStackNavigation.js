import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../components/Homepage';
// import Profile from '../components/Profile';
// import  { DreamsMainTabNavigation, SharedDreamsTabNavigations, FriendsTabNavigations, DictionaryTabNavigations, AdminTabNavigation } from './MainTabNavigation';
// import FeatureRequest from '../reuseableComponents/FeatureRequest';
// import AuthFlowStack from './AuthFlowStack';
// import { ProfileInfoSaved } from '../context/ProfileInfoSaved';

const Stack = createStackNavigator()
const MainStackNavigation = () => {
      return (
        <>
        <Stack.Navigator>
              <>
                <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }}/>
                {/* <Stack.Screen name="Friends" component={FriendsTabNavigations} options={{headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#b2ebf9'}, headerTintColor:'#b2ebf9'}}/>
                <Stack.Screen name="Vault Home" component={DreamsMainTabNavigation} options={{headerStyle: {backgroundColor: 'white'}, headerTitle:'Vault'}}/>  
                <Stack.Screen name="Dictionary" component={DictionaryTabNavigations} options={{headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#b2ebf9'}, headerTintColor:'#b2ebf9'}}/>
                <Stack.Screen name="Dreams" component={DreamEntry} options={{headerStyle: {backgroundColor: '#1d1d1f'}, headerTitleStyle: {color: '#FFF'}, headerTintColor:'#FFF'}}/>
                <Stack.Screen name="SharedVaultHome" component={SharedDreamsTabNavigations} options={{headerStyle: { backgroundColor: '#FFF' }, headerTitleStyle: { color: '#000' }, headerTintColor: '#000', headerTitle: 'Vault'}}/>  
                <Stack.Screen name="FeatureRequest" component={FeatureRequest} options={{headerStyle: {backgroundColor: '#fff', headerTitleStyle: {color: '#fff'}}, headerTitle:'Feature Request'}}/> 
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Admin" component={AdminTabNavigation} options={{headerStyle: {backgroundColor: '#1d1d1f'}, headerTitleStyle: {color: '#b2ebf9'}, headerTintColor:'#b2ebf9', headerTitle:'Login'}}/> 
                 */}
              </>  
        </Stack.Navigator>
        </>
      );
}      

export default MainStackNavigation