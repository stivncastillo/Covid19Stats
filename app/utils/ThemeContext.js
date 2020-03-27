import React, { createContext, useState, useEffect } from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import lightTheme from '../config/themes/light'
import darkTheme from '../config/themes/dark'

const defaultMode = 'dark';

const ThemeContext = createContext({
  mode: defaultMode,
  setMode: mode => console.log(mode),
})

export const useTheme = () => React.useContext(ThemeContext)

const ManageThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultMode)

  const setMode = mode => {
    setThemeState(mode)
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme)
    })
    return () => subscription.remove()
  }, [])

  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'light-content' : 'dark-content'}
          />
          <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {children}
          </SafeAreaView>
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const ThemeManager = ({ children }) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
)
export default ThemeManager;
