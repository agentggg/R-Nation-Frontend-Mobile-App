



import React from 'react'
import DreamVault from '../components/PersonalDream/DreamVault';
import DreamView from '../components/PersonalDream/DreamView';
import DreamVaultEdit from '../components/PersonalDream/DreamVaultEdit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SharedVaultHome from '../components/CollabDreams/SharedVaultHome';
import SharedVaultView from '../components/CollabDreams/SharedVaultView';
import Icon from 'react-native-vector-icons/Ionicons';  
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  
import ManangeFriends from '../components/Friends/ManangeFriends';
import NewFriends from '../components/Friends/NewFriends';
import SelectedWord from '../components/Dictionary/DictionarySelectedWord';
import AllWords from '../components/Dictionary/AllWords';
import DictionaryLanding from '../components/Dictionary/DictionaryLanding';
import Categories from '../components/Dictionary/Categories';
import CategoryWords from '../components/Dictionary/CategoryWords';
import AdminHome from '../components/Admin/AdminHome';
import LandingPage from '../components/Admin/LandingPage';
import Database from '../components/Admin/Database';
import Analytics from '../components/Admin/Analytics'
import BlastEmail from '../components/Admin/BlastEmail';
import BlastNotification from '../components/Admin/BlastNotification';
import Server from '../components/Admin/Server';

const Tab = createBottomTabNavigator();

function DreamsMainTabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dream Vault" component={DreamVault} options={{headerStyle: {backgroundColor: 'white'}, headerTitleStyle: {display: 'none'}, unmountOnBlur: true, tabBarIcon: ({ color, size }) => (
                <Icon name="lock-closed-outline" color={'black'} size={25}/>)}}/>
            <Tab.Screen name="DreamView" component={DreamView} options={{headerTitleStyle: {display: 'none'}, unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null,}}/>
            <Tab.Screen name="DreamVaultEdit" component={DreamVaultEdit} options={{title:"Edit Dream", headerStyle: {backgroundColor: 'white'},tabBarVisible: false, tabBarButton: () => null,}}/>
        </Tab.Navigator> 
    )
}
function SharedDreamsTabNavigations() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Shared Home" component={SharedVaultHome} options={{headerStyle: {backgroundColor: 'white'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Shared Vault', tabBarIcon: ({ color, size }) => (
                <Icon name="lock-closed-outline" color={'black'} size={25}/>)}}/>
            <Tab.Screen name="SharedVaultView" component={SharedVaultView} options={{title:"Shared Dream View", unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null,}}/>
        </Tab.Navigator> 
    )
}
function FriendsTabNavigations() {
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#000'}}}>
            <Tab.Screen name="Friend" component={ManangeFriends}  options={{headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Exisiting Friends', tabBarIcon: ({ color, size }) => (
                <Icon name="people-outline" size={25} color={'#b2ebf9'}/>), tabBarLabelStyle: { color: '#b2ebf9'}}}/>
            <Tab.Screen name="NewFriends" component={NewFriends}  options={{headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Pending Requests', tabBarIcon: ({ color, size }) => (
                <Icon name="person-add-outline" size={25} color={'#b2ebf9'}/>), tabBarLabelStyle: { color: '#b2ebf9'}}}/>
        </Tab.Navigator> 
    )
}
function DictionaryTabNavigations() {
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#000'}}}>
            <Tab.Screen name="DictionaryLanding" component={DictionaryLanding}  options={{headerStyle: {backgroundColor: '#FFF'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (
                <Icon name="book" size={30} color={'#b2ebf9'}/>), tabBarLabelStyle: { color: '#b2ebf9' }}}/>
            <Tab.Screen name="Categories" component={Categories} options={{headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Categories', tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="category" size={30} color={'#b2ebf9'}/>), tabBarLabelStyle: { color: '#b2ebf9' }}}/>  
            <Tab.Screen name="allWords" component={AllWords} options={{headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {display: 'none'}, tabBarLabel: 'Words', tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="speaker-notes" size={30} color={'#b2ebf9'}/>), tabBarLabelStyle: { color: '#b2ebf9' }}}/>  
            <Tab.Screen name="CategoryWords" component={CategoryWords} options={{headerStyle: {backgroundColor: 'black'}, title:'', unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null}}/>  
            <Tab.Screen name="Word" component={SelectedWord}  options={{headerStyle: {backgroundColor: 'black'}, title:'', unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null}}/>
        </Tab.Navigator> 
    )
}

function AdminTabNavigation() {
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#000'}}}>
            <Tab.Screen name="AdminHome" component={AdminHome}  options={{headerStyle: {backgroundColor: '#EF6C57'}, title:'', unmountOnBlur: false, tabBarVisible: false, tabBarButton: () => null}}/>
            <Tab.Screen name="LandingPage" component={LandingPage}  options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', tabBarVisible: false, tabBarIcon: () => null}}/>
            <Tab.Screen name="Database" component={Database} options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', tabBarVisible: false, tabBarIcon: () => null}}/>
            <Tab.Screen name="Analytics" component={Analytics} options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', tabBarVisible: false, tabBarIcon: () => null}}/>
            <Tab.Screen name="BlastEmail" component={BlastEmail} options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null}}/>  
            <Tab.Screen name="BlastNotification" component={BlastNotification}  options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null}}/>
            <Tab.Screen name="Server" component={Server}  options={{headerStyle: {backgroundColor: '#1e1e1e'}, title:'', unmountOnBlur: true, tabBarVisible: false, tabBarButton: () => null}}/>
        </Tab.Navigator> 
    )
}

export  {
    DreamsMainTabNavigation, 
    SharedDreamsTabNavigations, 
    FriendsTabNavigations, 
    DictionaryTabNavigations, 
    AdminTabNavigation
}
