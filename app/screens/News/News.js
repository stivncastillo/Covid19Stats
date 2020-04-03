import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, ActivityIndicator } from 'react-native'
import { ScrollContainer, ScreenSubtitle, CardContainer, TextArticleTitle, TextArticleAuthor } from '../../components';
import { withTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import NewsContext from '../../context/news/newsContext';
import CountryContext from '../../context/country/countryContext';

const styles = StyleSheet.create({
  image: {
      flex: 1,
      alignSelf: 'stretch',
      width: '100%',
      height: 120,
      marginBottom: 16,
  },
});

const ScreenCardContainer = styled(CardContainer)`
  padding-bottom: 16px;
  flex:1;
`

const News = ({ theme }) => {
  const newsContext = useContext(NewsContext);
  const { getHeadlines, newsHeadline, loadingNewsHeadline, getNews, news, loadingNews } = newsContext;
  const countryContext = useContext(CountryContext);
  const { selectedCountry } = countryContext;

  useEffect(() => {
    getHeadlines(selectedCountry.iso2);
    getNews()
  }, []);
// 383704
  const getArticle = (item, index) => (
    <ScreenCardContainer key={`news${index}`}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{uri: item.urlToImage}}
      />
      <TextArticleTitle>{item.title}</TextArticleTitle>
      <TextArticleAuthor>{item.source.name}</TextArticleAuthor>
    </ScreenCardContainer>
  );

  return (
    <ScrollContainer>
      <ScreenSubtitle>{selectedCountry !== null ? `${selectedCountry.name}` : ''} TOP HEADLINES</ScreenSubtitle>
      {
        loadingNewsHeadline ?
          <ActivityIndicator size="small" color={theme.textCardTitle} />
        :
          newsHeadline.length > 0 ?
            newsHeadline.map(getArticle)
          :
            <TextArticleTitle>Sorry, no news found.</TextArticleTitle>
      }

      <ScreenSubtitle>Other News</ScreenSubtitle>
      {
        loadingNews ?
          <ActivityIndicator size="small" color={theme.textCardTitle} />
        :
          news.length > 0 ?
            news.map(getArticle)
          :
            <TextArticleTitle>Sorry, no news found.</TextArticleTitle>
      }
    </ScrollContainer>
  )
}

export default withTheme(News)
