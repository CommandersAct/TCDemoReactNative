import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import * as TCServerSide from '@commandersact/tcserverside-react-native';
import {TCAppInstance, TCDeviceInstance, TCBeginCheckoutEvent, TCItem, TCProduct} from '@commandersact/tcserverside-react-native';
import {TCUserInstance} from "@commandersact/tccore-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'TCConsent'        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
        }}
      />
    </Tabs>
  );
}
