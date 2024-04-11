document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM content loaded");
    fetch('/api/user-selected-answers')
        .then(response => response.json())
        .then(data => {
            const userSelectedAnswers = data.userSelectedAnswers;
            console.log("User selected answers:", userSelectedAnswers);
            displayUserSelectedAnswers(userSelectedAnswers);
        })
        .catch(error => {
            console.error('Error fetching user-selected answers:', error);
            alert('Error fetching user-selected answers. Please try again later.');
        });
});

function displayUserSelectedAnswers(userSelectedAnswers) {
    const container = document.getElementById('user-selected-answers-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.innerHTML = '';
    userSelectedAnswers.forEach((userSelection, index) => {
        const answerElement = document.createElement('div');
        answerElement.innerHTML = `
            <h3>User ${index + 1} (${userSelection.name}, ${userSelection.email}) Selected Answers:</h3>
            <ul>
                ${userSelection.selectedAnswers.map(answer => <li>${answer.question}: ${answer.answer}</li>).join('')}
            </ul>
        `;
        container.appendChild(answerElement);
    });
}