import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import CardContainer from './CardContainer';
import TextCardTitle from '../Text/TextCardTitle';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    paddingVertical: 8,
  },
});

const Card = ({ title, icon, iconOnPress, children }) => {
  const theme = useContext(ThemeContext);

  return (
    <CardContainer>
      <View style={styles.headerContainer}>
        { title !== null &&
            <TextCardTitle>{title}</TextCardTitle>
        }
        { icon !== null &&
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={iconOnPress}>
              <Icon name={icon} size={20} color={theme.textCardTitle} />
            </TouchableOpacity>
        }
      </View>

      <View style={styles.bodyContainer}>{children}</View>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  iconOnPress: PropTypes.func,
}

Card.defaultProps = {
  title: null,
  icon: null,
  iconOnPress: () => {},
}
export default Card
