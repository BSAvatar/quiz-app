// components/Summary.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ route }) => {
  const { data, answers } = route.params;
  const score = answers.filter((a) => a.isCorrect).length;

  return (
    <View style={styles.container}>
      <Text style={styles.score} testID="total">
        Total Score: {score} / {data.length}
      </Text>
      {data.map((q, i) => {
        const userAnswer = answers[i].selectedIndex;
        const correct = q.correct;

        const isCorrect = answers[i].isCorrect;

        return (
          <View key={i} style={styles.questionBlock}>
            <Text style={styles.prompt}>{q.prompt}</Text>
            {q.choices.map((choice, index) => {
              const isChosen =
                q.type === 'multiple-answer'
                  ? userAnswer.includes(index)
                  : userAnswer === index;

              const isRight =
                q.type === 'multiple-answer'
                  ? correct.includes(index)
                  : correct === index;

              let style = {};
              if (isChosen && isRight) style = styles.correct;
              else if (isChosen && !isRight) style = styles.incorrect;
              else if (isRight) style = styles.correct;

              return (
                <Text key={index} style={[styles.choice, style]}>
                  {isChosen ? ' ' : ''}{choice}
                </Text>
              );
            })}
            <Text style={isCorrect ? styles.rightText : styles.wrongText}>
              {isCorrect ? '✅ Correct' : '❌ Incorrect'}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  score: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  questionBlock: { marginBottom: 24 },
  prompt: { fontSize: 16, marginBottom: 8 },
  choice: { marginLeft: 10, fontSize: 15 },
  correct: { fontWeight: 'bold' },
  incorrect: { textDecorationLine: 'line-through' },
  rightText: { color: 'green', marginTop: 6 },
  wrongText: { color: 'red', marginTop: 6 },
});

export default Summary;
