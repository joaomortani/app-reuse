import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    ExploreIcon,
    ItemsIcon,
    ProfileIcon,
    NotificationsIcon,
    HomeIcon,
  } from "../icons";
import { StyleSheet } from "react-native";

import ExploreScreen from "../screens/ExploreScreen";
import ItemsScreen from "../screens/ItemsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import HomeScreen from "../screens/HomeScreen";


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    
    <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#37474F",
        tabBarInactiveTintColor: "#49454F",
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        }}>
      <Tab.Screen 
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <ExploreIcon />,
        }}
        />
        <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon />,
        }}
        />
        <Tab.Screen
        name="My Items"
        component={ItemsScreen}
        options={{
          tabBarIcon: ({ focused }) => <ItemsIcon />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <ProfileIcon />,
        }}
      />
      <Tab.Screen
        name="Updates"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => <NotificationsIcon />,
        }}
      />
        
      
    </Tab.Navigator>
 
  );
}

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "#00796B",
      paddingHorizontal: 8,
      height: 80,
      borderTopWidth: 0,
    },
    tabBarLabel: {
      fontSize: 12,
      letterSpacing: 0.5,
      fontFamily: "Roboto",
      marginBottom: 5,
    },
    activeLabel: {
      fontWeight: "700",
      color: "#37474F",
    },
    inactiveLabel: {
      fontWeight: "400",
      color: "#49454F",
    },
    activeTab: {
      backgroundColor: "#B0BEC5",
      borderRadius: 16,
      marginTop: 12,
    },
    inactiveTab: {
      marginTop: 12,
    },
  });