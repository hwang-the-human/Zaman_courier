import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function Pulse({index, duration}) {
  const config = {
    duration: duration + index * 300,
  };

  const pulseStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: 150,
      height: 150,
      borderRadius: 150,
      borderWidth: 1,
      borderColor: 'grey',
      opacity: withRepeat(
        withSequence(withTiming(1, config), withTiming(0, config)),
        -1,
        false,
      ),
      transform: [
        {
          scale: withRepeat(
            withSequence(withTiming(0.9, config), withTiming(3, config)),
            -1,
            false,
          ),
        },
      ],
    };
  });

  return <Animated.View style={pulseStyle} />;
}

const styles = StyleSheet.create({});
