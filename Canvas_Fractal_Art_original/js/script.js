window.addEventListener("load", function () {
	const canvas = document.getElementById("canvas3");
	const ctx = canvas.getContext("2d"); //built in Canvas 2D API:
	//holds all canvas drawing methods and settings
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//make canvas only 80% of screen width&height
	// canvas.width = window.innerWidth * 0.8;
	// canvas.height = window.innerHeight * 0.8;

	// CANVAS SETTINGS
	//ctx.fillStyle = "green";
	// ctx.strokeStyle = "gold";
	// ctx.lineWidth = 10;
	ctx.lineCap = "round"; //round both ends of line
	ctx.shadowColor = "rgba(0,0,0,0.7)";
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 10;

	// EFFECT SETTINGS
	//let size = 200;
	//set size to fit canvas window:
	let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
	const maxLevel = 4;
	const branches = 2;

	let sides = 5;
	let scale = 0.5;
	let spread = 0.1;
	//let color = "hsl(0, 100%, 50%)";
	//randomize hue color:
	let color = `hsl(` + Math.random() * 360 + `,100%, 50%)`;
	let lineWidth = Math.floor(Math.random() * 20 + 10); //random # between 10 & 20

	// CONTROLS
	const randomizeButton = document.getElementById("randomizeButton");
	const resetButton = document.getElementById("resetButton");
	const slider_spread = document.getElementById("spread");
	const label_spread = document.querySelector('[for = "spread"]');
	slider_spread.addEventListener("change", function (e) {
		//console.log(e);
		//console.log(e.target.value);
		spread = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_sides = document.getElementById("sides");
	label_sides = document.querySelector('[for = "sides"]');
	slider_sides.addEventListener("change", function (e) {
		sides = e.target.value;
		updateSliders();
		drawFractal();
	});

	//canvas drawn line by line:
	//(first is bottom layer and rest stay on top of that one layer at a time)
	//ctx.fillRect(50, 50, 100, 100);
	// ctx.save();
	// ctx.translate(canvas.width / 2, canvas.height / 2);
	// ctx.scale(1, 1);
	// ctx.rotate(0);
	// ctx.rotate(0.3);
	// ctx.rotate(0.3);
	// ctx.rotate(0.3);
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	// ctx.restore();

	function drawBranch(level) {
		if (level > maxLevel) return; //termination condition
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(size, 0);
		ctx.stroke();
		for (let i = 0; i < branches; i++) {
			ctx.save();
			ctx.translate(size - (size / branches) * i, 0);
			ctx.scale(scale, scale);

			ctx.save();
			ctx.rotate(spread);
			drawBranch(level + 1); //call self and increase by one (recursion)
			ctx.restore();

			ctx.save();
			// ctx.translate(size - (size / branches) * i, 0);
			ctx.rotate(-spread);
			// ctx.scale(scale, scale);
			drawBranch(level + 1); //call self and increase by one (recursion)
			ctx.restore();

			ctx.restore();
		}
	}
	// drawBranch(0); //initial start level

	function drawFractal() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); //don't have this if want to stack fractals on eachother
		ctx.save();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.translate(canvas.width / 2, canvas.height / 2);
		for (let i = 0; i < sides; i++) {
			ctx.rotate((Math.PI * 2) / sides);
			drawBranch(0);
		}
		ctx.restore();
		randomizeButton.style.backgroundColor = color;
	}
	drawFractal();

	function randomizeFractal() {
		sides = Math.floor(Math.random() * 7 + 2); //random between 2 & 9
		scale = Math.random() * 0.2 + 0.4; //random between 0.4 & 0.6
		spread = Math.random() * 2.9 + 0.1; //random between 0.1 & 3
		color = `hsl(` + Math.random() * 360 + `,100%, 50%)`;
		lineWidth = Math.floor(Math.random() * 20 + 10);
	}
	randomizeButton.addEventListener("click", function () {
		randomizeFractal();
		updateSliders();
		drawFractal();
	});

	function resetFractal() {
		sides = 5;
		scale = 0.5;
		spread = 0.7;
		color = `hsl(290,100%, 50%)`;
		lineWidth = 15;
	}
	resetButton.addEventListener("click", function () {
		resetFractal();
		updateSliders();
		drawFractal();
	});

	function updateSliders() {
		slider_spread.value = spread;
		label_spread.innerText = "Spread: " + Number(spread).toFixed(1);
		slider_sides.value = sides;
		label_sides.innerText = "Sides: " + sides;
	}
	updateSliders();
	// for (let i = 0; i < sides; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, 0);
	// 	ctx.lineTo(size, 0);
	// 	ctx.stroke();
	// 	ctx.rotate((Math.PI * 2) / sides);
	// 	// ctx.scale(0.97, 0.97);
	// 	// ctx.translate(10, 30);
	// }
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(size, 0);
	// ctx.stroke();
	// ctx.rotate(0.5);
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(size, 0);
	// ctx.stroke();
	// ctx.rotate(0.5);
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(size, 0);
	// ctx.stroke();
	// ctx.rotate(0.5);
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(size, 0);
	// ctx.stroke();
	//time to create a for loop

	// ctx.restore();
});
