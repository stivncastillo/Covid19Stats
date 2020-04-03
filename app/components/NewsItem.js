import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import CardContainer from './Card/CardContainer';
import TextArticleTitle from './Text/TextArticleTitle';
import TextArticleAuthor from './Text/TextArticleAuthor';
import styled from 'styled-components/native';
import { withTheme } from 'styled-components/native';

import Icon from 'react-native-vector-icons/Feather';

const ScreenCardContainer = styled(CardContainer)`
  padding-bottom: 16px;
  flex:1;
`

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: 120,
    marginBottom: 16,
  },
});

const NewsItem = ({ item, onShare, onOpen, theme }) => {
  return (
    <ScreenCardContainer>
      {
        item &&
        <>
          {
            item.urlToImage &&
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri: item.urlToImage}}
              />
          }
          <TextArticleTitle>{item.title}</TextArticleTitle>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <TextArticleAuthor style={{flex:1}}>{item.source.name}</TextArticleAuthor>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
              <Icon onPress={() => onShare()} style={{marginRight: 16}} name="share-2" size={20} color={theme.textCardTitle} />
              <Icon onPress={() => onOpen()} name="external-link" size={20} color={theme.textCardTitle} />
            </View>
          </View>
        </>
      }
    </ScreenCardContainer>
  )
}

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
  onShare: PropTypes.func,
  onOpen: PropTypes.func,
}

NewsItem.defaultProps = {
  item: null,
  onShare: () => {},
  onOpen: () => {},
}

export default withTheme(NewsItem);
