import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

// Back button component
function BackButton() {
  const router = useRouter();

  const onPress = () => {
    if (router.canGoBack()) {
      router.back(); // go back in history
    } else {
      router.push('/login'); // fallback to home if no history
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 12 }}>
      <Ionicons name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>
  );
}

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' }, // white background
        headerTitleStyle: { fontWeight: '700', color: '#000' }, // black title text
        headerTintColor: '#000', // black icons/text
      }}
    >
      {/* Home page: hide back button */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLeft: () => null,
        }}
      />

      {/* Example other pages */}
      <Stack.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: 'Details',
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
