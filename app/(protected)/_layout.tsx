import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProtectedTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
    tabBarActiveTintColor: '#FFFFFF',
    tabBarStyle: {
      backgroundColor: '#1B5E20',
    },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Criar Item',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="house" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: 'Item',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
        <Tabs.Screen
        name="item/create-item"
        options={{
          href: null, // impede que apareça na tabbar
        }}
      />
    </Tabs>
  );
}