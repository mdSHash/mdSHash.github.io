const story = [
    "Welcome to Fayrouz First Valentine's Adventure! 💖",
    "Let's prepare for Fayrouz arrival by solving some fun puzzles together.",
    "First, let's match some baby items to unlock the next part of the story.",
    "Great job! Now, let's unscramble a word related to love and family.",
    "Amazing! Now, answer this trivia question about your relationship.",
    "Finally, let's set up Fayrouz nursery by arranging the items.",
    "Write a short love letter to your wife to complete the adventure."
  ];
  
  const puzzles = [
    {
      type: "memory",
      items: ["pacifier", "onesie", "bottle", "rattle"]
    },
    {
      type: "word-scramble",
      question: "Unscramble the word: EVOL",
      answer: "love"
    },
    {
      type: "trivia",
      question: "What was the name of the restaurant where you had your first date?",
      answer: "AISEIC" // Replace with your actual answer
    },
    {
      type: "drag-drop",
      items: ["crib", "teddy bear", "lamp", "diapers"],
      dropZone: "nursery"
    },
    {
      type: "love-letter",
      prompt: "Write a short love letter to your wife:"
    }
  ];
  
  let currentLevel = 0;
  const storyElement = document.getElementById("story");
  const puzzleElement = document.getElementById("puzzle");
  const resultElement = document.getElementById("result");
  const nextButton = document.getElementById("next-button");
  const endingElement = document.getElementById("ending");
  const gameContainer = document.getElementById("game-container");
  
  function displayStory() {
    storyElement.textContent = story[currentLevel];
  }
  
  function displayPuzzle() {
    const puzzle = puzzles[currentLevel];
    if (puzzle.type === "memory") {
      puzzleElement.innerHTML = `
        <p>Match the baby items:</p>
        <div class="memory-game">
          ${puzzle.items.map(item => `<div class="memory-card">${item}</div>`).join("")}
        </div>
      `;
      setupMemoryGame();
    } else if (puzzle.type === "word-scramble") {
      puzzleElement.innerHTML = `
        <p>${puzzle.question}</p>
        <input type="text" id="answer-input" placeholder="Your answer">
        <button onclick="checkAnswer()">Submit</button>
      `;
    } else if (puzzle.type === "trivia") {
      puzzleElement.innerHTML = `
        <p>${puzzle.question}</p>
        <input type="text" id="answer-input" placeholder="Your answer">
        <button onclick="checkAnswer()">Submit</button>
      `;
    } else if (puzzle.type === "drag-drop") {
      puzzleElement.innerHTML = `
        <p>Arrange the items in Fayrouz nursery:</p>
        <div class="drag-drop-container">
          ${puzzle.items.map(item => `<div class="drag-item" draggable="true">${item}</div>`).join("")}
        </div>
        <div class="drop-zone">Drop items here</div>
      `;
      setupDragAndDrop();
    } else if (puzzle.type === "love-letter") {
      puzzleElement.innerHTML = `
        <p>${puzzle.prompt}</p>
        <textarea id="love-letter" rows="5" placeholder="Write your love letter here..."></textarea>
        <button onclick="checkLoveLetter()">Submit</button>
      `;
    }
  }
  
function setupMemoryGame() {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.style.backgroundColor = "#c2185b";
      checkMemoryCompletion();
    });
  });
}

function checkMemoryCompletion() {
  const cards = document.querySelectorAll(".memory-card");
  const completed = Array.from(cards).every(card => card.style.backgroundColor === "rgb(194, 24, 91)");
  if (completed) {
    resultElement.textContent = "Great job! All items matched!";
    nextButton.style.display = "block";
  }
}

function setupDragAndDrop() {
  const dragItems = document.querySelectorAll(".drag-item");
  const dropZone = document.querySelector(".drop-zone");

  dragItems.forEach(item => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.textContent);
    });
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    dropZone.innerHTML += `<div class="drag-item">${data}</div>`;
    checkDragCompletion();
  });
}

function checkDragCompletion() {
  const dropZone = document.querySelector(".drop-zone");
  const items = puzzles[currentLevel].items;
  const completed = items.every(item => dropZone.textContent.includes(item));
  if (completed) {
    resultElement.textContent = "Nursery setup complete! Fayrouz will love it!";
    nextButton.style.display = "block";
  }
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
  const correctAnswer = puzzles[currentLevel].answer.toLowerCase();
  if (userAnswer === correctAnswer) {
    resultElement.textContent = "Correct! Well done!";
    nextButton.style.display = "block";
  } else {
    resultElement.textContent = "Oops! Try again.";
  }
}

function checkLoveLetter() {
  const loveLetter = document.getElementById("love-letter").value.trim();
  if (loveLetter) {
    resultElement.textContent = "What a beautiful letter! 💖";
    nextButton.style.display = "block";
  } else {
    resultElement.textContent = "Please write something sweet!";
  }
}

nextButton.addEventListener("click", () => {
  currentLevel++;
  if (currentLevel < puzzles.length) {
    displayStory();
    displayPuzzle();
    resultElement.textContent = "";
    nextButton.style.display = "none";
  } else {
    showEnding();
  }
});

function showEnding() {
  gameContainer.style.display = "none";
  endingElement.style.display = "block";
}

// Initialize the game
displayStory();
displayPuzzle();