import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Haptic, LinearGradient } from 'expo';

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
  },
  gradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

class GradientButton extends React.PureComponent { 
  render() {
    const {
      children,
      style,
      text,
      textStyle,
      gradientBegin,
      gradientEnd,
      gradientDirection,
      height,
      width,
      radius,
      impact,
      impactStyle,
      onPressAction,
      purpleViolet,
      violetPink,
      pinkDarkGreen,
      blueViolet,
      blueMarine,
      deepBlue,
    } = this.props;

    const purpleVioletColor = ['#7B42F6', '#B01EFF'];
    const violetPinkColor = ['#B01EFF', '#E1467C'];
    const pinkDarkGreenColor = ['#E1467C', '#205284'];
    const blueVioletColor = ['#3672F8', '#B01EFF'];
    const blueMarineColor = ['#14F1D9', '#3672F8'];
    const deepBlueColor = ['#4F73C3', '#3C46A2'];

    const horizontalGradient = {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 }
    }

    const verticalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 }      
    }    

    const diagonalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }      
    }

    return (
      <TouchableOpacity
        style={[styles.button, {height, width}, style]}
        onPress={() => {
          if (Platform.OS === 'ios' && impact === true) {
            Haptic.impact(Haptic.ImpactStyles[impactStyle]);
          }
          if (onPressAction) {
            return onPressAction();
          }
        }}
      >
        <LinearGradient
          style={[styles.gradient, {borderRadius: radius}]}
          colors={
            purpleViolet ? purpleVioletColor :
            violetPink ? violetPinkColor :
            pinkDarkGreen ? pinkDarkGreenColor :
            blueViolet ? blueVioletColor :
            blueMarine ? blueMarineColor :
            deepBlue ? deepBlueColor : [gradientBegin, gradientEnd]
          }
          start={
            gradientDirection === 'vertical' ? verticalGradient.start : 
            gradientDirection === 'diagonal' ? diagonalGradient.start : 
            horizontalGradient.start
          }
          end={
            gradientDirection === 'vertical' ? verticalGradient.end : 
            gradientDirection === 'diagonal' ? diagonalGradient.end : 
            horizontalGradient.end            
          }
        >
          <Text style={[styles.text, textStyle]}>{text ? text : children}</Text>
        </LinearGradient>
      </TouchableOpacity> 
    );
  }
}

GradientButton.defaultProps = {
  gradientBegin: '#00d2ff',
  gradientEnd: '#3a47d5',
  gradientDirection: 'horizontal',
  height: 75,
  radius: 50,
  impact: false,
  impactStyle: 'Heavy',
};

export default GradientButton;
