import React, { useContext, useEffect, useCallback } from 'react'
import { StyleSheet, ActivityIndicator, Share, Alert, Linking } from 'react-native'
import { ScrollContainer, ScreenSubtitle, TextArticleTitle, NewsItem } from '../../components';
import { withTheme } from 'styled-components/native';
import NewsContext from '../../context/news/newsContext';
import CountryContext from '../../context/country/countryContext';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
});

const News = ({ theme }) => {
  const newsContext = useContext(NewsContext);
  const { getHeadlines, newsHeadline, loadingNewsHeadline, getNews, news, loadingNews } = newsContext;
  const countryContext = useContext(CountryContext);
  const { selectedCountry } = countryContext;

  useEffect(() => {
    getHeadlines(selectedCountry.iso2);
    getNews()
  }, []);

  const onShare = async (item) => {
    try {
      await Share.share({ message: item.url });
    } catch (error) {
      Alert.alert( 'Error', error.message);
    }
  };

  const onOpen = async (item) => {
    const supported = await Linking.canOpenURL(item.url);

    if (supported) {
      await Linking.openURL(item.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${item.url}`);
    }
  };
  // 383704
  const getArticle = (item, index) => <NewsItem key={`news${index}`} item={item} onShare={() => onShare(item)} onOpen={() => onOpen(item)} />;

  return (
    <ScrollContainer
      contentContainerStyle={styles.container}>
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
