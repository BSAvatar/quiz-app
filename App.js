// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Question from './components/Question';
import Summary from './components/Summary';
import questions from './data/questions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question" screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: questions, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Question, Summary };
