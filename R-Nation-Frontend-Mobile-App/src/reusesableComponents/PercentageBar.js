import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PercentageBar = ({ percentage, label, goal }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const barWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  return (
    <View>
    <View style={styles.barContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, { width: barWidth }]}>
          <LinearGradient
            colors={['red', 'yellow', 'green']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.percentageTextInside}>{percentage}%</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 40,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
      },
      label: {
        width: 50, // Adjust as needed
        marginRight: 5,
        fontSize: 18, // Adjust font size if needed
      },
      barBackground: {
        flex: 1,
        height: 50, // Increased height
        backgroundColor: '#eee',
        borderRadius: 15, // Adjust to match the new height
        overflow: 'hidden',
        marginLeft: 5, // Add margin if needed
      },
      barFill: {
        height: '100%',
        borderRadius: 15, // Adjust to match the new height
      },
      percentageText: {
        marginLeft: 5,
      },
      percentageTextInside: {
        color: '#FFF',
        textAlign: 'right',
        paddingRight: 5,
        fontSize: 22, // Adjust font size if neede
  },
    gradient: {
        ...StyleSheet.absoluteFillObject, // This will make the gradient fill the entire bar
        justifyContent: 'center',
    },
});

export default PercentageBar;
