import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withTheme } from 'styled-components/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    marginTop: 4,
  },
});

function TabBar({ state, descriptors, navigation, theme, showLabel }) {
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundTabBar}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={`item${index}`}
          >
            {
              showLabel &&
                <Text style={{ color: isFocused ? theme.tintActiveTabBar : theme.tintInactiveTabBar }}>
                  {label}
                </Text>
            }

            {
              options.tabBarIcon &&
                <>
                  <options.tabBarIcon size={20} color={isFocused ? theme.tintActiveTabBar : theme.tintInactiveTabBar} />
                  {
                    isFocused ?
                      <View style={[styles.circle, { backgroundColor: theme.primary }]} />
                    :
                      <View style={[styles.circle, { backgroundColor: 'transparent' }]} />
                  }
                </>
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default withTheme(TabBar);
