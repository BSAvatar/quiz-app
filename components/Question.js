// components/Question.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const Question = ({ navigation, route }) => {
  const { data, index, answers } = route.params;
  const question = data[index];
  const [selectedIndex, setSelectedIndex] = useState(
    question.type === 'multiple-answer' ? [] : null
  );

  const isCorrect = () => {
    if (question.type === 'multiple-answer') {
      return (
        Array.isArray(selectedIndex) &&
        selectedIndex.length === question.correct.length &&
        selectedIndex.every((val) => question.correct.includes(val))
      );
    } else {
      return selectedIndex === question.correct;
    }
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, { selectedIndex, isCorrect: isCorrect() }];
    if (index + 1 < data.length) {
      navigation.push('Question', {
        data,
        index: index + 1,
        answers: updatedAnswers,
      });
    } else {
      navigation.replace('Summary', { data, answers: updatedAnswers });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <ButtonGroup
        vertical
        buttons={question.choices}
        selectedIndexes={question.type === 'multiple-answer' ? selectedIndex : undefined}
        selectedIndex={question.type !== 'multiple-answer' ? selectedIndex : undefined}
        onPress={(value) => {
          if (question.type === 'multiple-answer') {
            setSelectedIndex((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            );
          } else {
            setSelectedIndex(value);
          }
        }}
        testID="choices"
      />
      <Button
        title="Next Question"
        testID="next-question"
        disabled={
          question.type === 'multiple-answer'
            ? selectedIndex.length === 0
            : selectedIndex === null
        }
        onPress={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  prompt: { fontSize: 18, marginBottom: 12 },
});

export default Question;
