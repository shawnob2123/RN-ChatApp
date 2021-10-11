import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons'; 
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, MainTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
      },
      headerTintColor: Colors.light.background,
      headerTitleStyle: {
        fontWeight:'bold'
      }
    }}>
      <Stack.Screen name="Root" component={MainTabNavigator} options={{
        headerShown: true, title: 'PitterChatters', headerRight: () => (
          <View style={{flexDirection:'row', width:60, justifyContent:'space-between', marginRight:5, backgroundColor:'#e63946'}}>
            <FontAwesome name="search" size={24} color="white" />
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </View>
        )
     }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
          
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#1d3557',
          height: 4,
          elevation:3
        },
        tabBarLabelStyle: {
          fontWeight: 'bold'
        }
      }}>
      <MainTab.Screen
        name="Camera"
        component={TabOneScreen}
        options={{
          tabBarIcon: () => <Feather name="camera" size={24} color="white" />,
          tabBarLabel: () => null
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={TabTwoScreen}
        options={{
          title: 'Chats',
        }}
      />
          <MainTab.Screen
        name="Status"
        component={TabTwoScreen}
        options={{
          title: 'Status',
        }}
      />
          <MainTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{
          title: 'Calls',
        }}
      />
    </MainTab.Navigator>
  );
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
