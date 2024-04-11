document.addEventListener('DOMContentLoaded', () => {
  const aptitudeForm = document.getElementById('aptitude-form');
  const questionContainer = document.getElementById('question-container');
  let selectedChoices = {}; // Object to store selected choices for each question

  // Function to shuffle the array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Fetch questions from backend and display them
  function fetchAndDisplayQuestions() {
    const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  fetch(`/api/questions?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(data => {
        const questions = data.questions;
        shuffleArray(questions);
        const randomQuestions = questions.slice(0, 5);
        displayQuestions(randomQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }

 // Display questions with choices in the form
 function displayQuestions(questions) {
  questionContainer.innerHTML = ''; // Clear previous questions
  selectedChoices = {}; // Clear selected choices
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);
    question.choices.forEach(choice => {
      const choiceInput = document.createElement('input');
      choiceInput.type = 'radio';
      choiceInput.name = `question-${index}`; // Name should be unique for each question
      choiceInput.value = choice;
      choiceInput.addEventListener('change', () => {
        selectedChoices[`${question.question}`] = choice; // Store selected choice
      });
      const choiceLabel = document.createElement('label');
      choiceLabel.textContent = choice;

      questionDiv.appendChild(choiceInput);
      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement('br'));
    });
    questionContainer.appendChild(questionDiv);
  });
}

// Display initial set of questions
  fetchAndDisplayQuestions();

  // Handle form submission
  aptitudeForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission
    console.log(selectedChoices); // Log selected choices to console (for testing purposes)
    submitSelectedChoices(selectedChoices); // Send selected choices to the server
    window.alert("Record Submitted Successfully!");
    disableRadioButtons(); // Disable radio buttons after form submission
  });

  // Function to disable radio buttons after form submission
  function disableRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
      radioButton.disabled = true;
    });
  }

  // Function to send selected choices to the server
  function submitSelectedChoices(choices) {
    const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
    fetch('/api/save-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, selectedAnswers: choices })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Optionally, you can handle successful submission here
    })
    .catch(error => {
      console.error('Error submitting answers:', error);
    });
  }
});

document.getElementById('aptitude-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get user selections
  const selectedAnswers = [];
  const selectedInputs = document.querySelectorAll('input[type="radio"]:checked');
  selectedInputs.forEach(input => {
      selectedAnswers.push({
          question: input.name,
          answer: input.value
      });
  });

});