const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
let totalScore = document.querySelector('.score');
let playTime = document.querySelector('.playTime');
let lastMole;
let timeUp = false;
let score = 0;
let duration = 15000;

function randomTime(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomMole(moles) {
	const index = Math.floor(Math.random() * moles.length);
	const mole = moles[index];

	if (mole === lastMole) {
		return randomMole(moles);
	}
	lastMole = mole;
	return mole;
}

function peep() {
	const time = randomTime(400, 1000);
	const mole = randomMole(moles);
	mole.classList.add('up');
	setTimeout(() => {
		mole.classList.remove('up');
		if (!timeUp) peep();
	}, time);
}

function startGame() {
	const start = document.getElementById('start');
	score = 0;
	timeUp = false;
	start.style.display = 'none';
	totalScore.innerHTML = `Your Score: ${score}`;
	timer();
	peep();
	setTimeout(() => {
		timeUp = true;
		start.style.display = 'block';
		start.innerHTML = 'Play Again';
	}, duration);
}
start.addEventListener('click', startGame);

function bonk(e) {
	console.log(e);
	if (!e.isTrusted) return;
	score++;
	totalScore.innerHTML = `Your Score: ${score}`;
	this.classList.remove('up');
}
moles.forEach((mole) => mole.addEventListener('click', bonk));

function timer() {
	let sec = duration / 1000 - 1;
	var timer = setInterval(() => {
		playTime.innerHTML = `00:${sec}`;
		sec--;
		if (sec < 3) {
			playTime.style.color = '#d84a4a';
		} else {
			playTime.style.color = '#332f41';
		}
		if (sec < 0) clearInterval(timer);
	}, 1000);
}
