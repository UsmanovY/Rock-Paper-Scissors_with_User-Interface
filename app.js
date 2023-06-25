let paper_select = document.querySelector("#paper");
let scissors_select = document.querySelector("#scissors");
let rock_select = document.querySelector("#rock");
let game = document.querySelector("#game");
let player = document.querySelector(".player");
let picked = document.querySelector(".picked");
let cpu_bg = document.querySelector(".cpu__bg");
let playAgainBtn = document.querySelector(".btn-play__again");
let win = document.querySelector("#win-text");
let lose = document.querySelector("#lose-text");
let draw = document.querySelector("#draw-text");
let score = document.querySelector("#score");
let exit = document.querySelector("#modalShow");



function showModal() {
	exit.classList.replace("hide", "show");
}

exit.addEventListener("click", (event) => {
	if (event.target.id === "clear") {
		exit.classList.replace("show", "hide");
	}
})

if(!localStorage.getItem("score")) {
	localStorage.setItem("score", 0);
} else {
	score.textContent = localStorage.getItem("score");
}

game.addEventListener("click", (e) => {
	if (e.target.tagName === "IMG") {
		const svg = e.target.cloneNode();
		game.style.display = "none";
		picked.style.display = "grid";
		player.appendChild(svg);

		const options = [paper_select, scissors_select, rock_select];
		const choice = Math.floor(Math.random() * 3);
		setTimeout(() => {
			cpu_bg.appendChild(options[choice]);
		},0);

		checkForWin(svg, options, choice);
		checkForLose(svg, options, choice);
	}
})

const confettiConfig = {
	particleCount: 200,
	spread: 100,
	origin: { y: 0.6},
};

function saveToLocalStorage(score) {
	localStorage.setItem("score", score);
}

function countScore() {
	win.textContent = "YOU WIN";
	score.textContent = +score.textContent + 1;
}

function checkForWin(svg, options, choice) {
	if (options[choice].id === "rock" && svg.id === "paper") {
		countScore();
		confetti(confettiConfig);
		saveToLocalStorage(score.textContent);
	} else if (options[choice].id === "paper" && svg.id === "scissors") {
		countScore();
		confetti(confettiConfig)
		saveToLocalStorage(score.textContent);
	} else if (options[choice].id === "scissors" && svg.id === "rock") {
		countScore();
		confetti(confettiConfig)
		saveToLocalStorage(score.textContent);
	}
}

function checkForLose(svg, options, choice) {
	if (options[choice].id === svg.id) {
		draw.textContent = "DRAW";
	} else if (options[choice].id === "paper" && svg.id === "rock") {
		lose.textContent = "YOU LOSE";
	} else if (options[choice].id === "scissors" && svg.id === "paper") {
		lose.textContent = "YOU LOSE";
	} else if (options[choice].id === "rock" && svg.id === "scissors") {
		lose.textContent = "YOU LOSE";
	}
}

playAgainBtn.addEventListener("click", () => {
	location.reload();
});



















