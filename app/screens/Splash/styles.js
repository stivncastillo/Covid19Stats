import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  image: {
    width: width / 4,
  },
});
