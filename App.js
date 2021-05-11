/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StixEmbedded from '@stix/stix-embedded/App';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="POC Embedded">
            Utilizar CodePush para acelerar a atualização do embedded
          </Section>
          <Button
            title="Acessar Embedded"
            onPress={() => navigation.navigate('Embedded')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const EmbeddedScreen = ({navigation}) => {
  const tokenStix =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTQ2MDQxMDYsImVtYWlsIjoidGVzdGVjb2RlcHVzaEBnbWFpbC5jb20iLCJ1c2VyQ3BmIjoiODMwMDQ5ODUwODAiLCJmaXJzdE5hbWUiOiJDb2RlIiwibGFzdE5hbWUiOiJQdXNoIiwicGhvbmVNb2JpbGUiOiIxMTk4OTgxMjI3NCIsInJlbWVtYmVyTWUiOnRydWV9LCJpYXQiOjE2MjA3NTQ4NTEsImV4cCI6MTY1MjI5MDg1MX0.HotA1aMKdJbGPU6FetfOCESsSBU1wbwr8m6ADvCD6Jg';
  const cpf = '83004985080';

  return (
    <StixEmbedded
      jwtToken={`Bearer ${tokenStix}`}
      memberNumber={cpf}
      partner={'RA'}
      environment={'staging'}
      onGoBack={() => {
        navigation.goBack();
      }}
      onGoPartnerScreen={() => {
        navigation.goBack();
      }}
      accountStatementFontColor={'#11273C'}
      componentDefaultBackgroundColor={'#9D0520'}
    />
  );
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={props => <HomeScreen {...props} />}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Embedded"
          component={props => <EmbeddedScreen {...props} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
