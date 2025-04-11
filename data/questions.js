
export default [
  {
    prompt: "Which of these is a JavaScript framework?",
    type: "multiple-choice",
    choices: ["Laravel", "Django", "React", "Rails"],
    correct: 2, // React
  },
  {
    prompt: "Select all frontend technologies:",
    type: "multiple-answer",
    choices: ["HTML", "CSS", "Node.js", "JavaScript"],
    correct: [0, 1, 3], // HTML, CSS, JavaScript
  },
  {
    prompt: "React Native can be used to build mobile apps.",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1, // True
  },
];
