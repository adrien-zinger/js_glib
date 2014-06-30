"use strict"

var library = {
	map: {
		blocks: [],

		block_set: function (args) {
			var id = "b_" + args.x + "_" + args.y;

			var block = document.getElementById(id);
			if (!block) {
				block = document.createElement("div");
				block.id = id;
				block.className = "block";
			}

			block.style.left = (args.x * 20) + "px";
			block.style.top = (args.y * 20) + "px";

			var camera = document.getElementById("camera");
			camera.appendChild(block);

			if (typeof library.map.blocks[args.x] === "undefined")
				library.map.blocks[args.x] = [];
			library.map.blocks[args.x][args.y] = block;
		},

		block_get: function (args) {
			if (typeof library.map.blocks[args.x] === "undefined")
				library.map.blocks[args.x] = [];
			return library.map.blocks[args.x][args.y];
		},
	},

	camera: {
		x: 0,
		y: 0,

		move: function (args) {
			library.camera.x += args.x;
			library.camera.y += args.y;

			var blocks = library.map.blocks;
			for (var x = 0; x < blocks.length; ++x)
				if (typeof blocks[x] !== "undefined")
					for (var y = 0; y < blocks[x].length; ++y)
						if (typeof blocks[x][y] !== "undefined") {
							blocks[x][y].style.left = ((x * 20) - library.camera.x) + "px";
							blocks[x][y].style.top = ((y * 20) - library.camera.y) + "px";
						}
		},

		move_left: function (length) {
			library.camera.move({
				x: length,
				y: 0
			});
		},

		move_right: function (length) {
			library.camera.move({
				x: -length,
				y: 0
			});
		},

		move_up: function (length) {
			library.camera.move({
				x: 0,
				y: length
			});
		},

		move_down: function (length) {
			library.camera.move({
				x: 0,
				y: -length
			});
		},
	},

	hero: {
		life: 100,
		power: 100,
		name: "hero",
		position: {
			x: 0,
			y: 0
		},

		create: function (args) {
			if (typeof args.name !== 'undefined')
				library.hero.name = args.name;
			if (typeof args.life !== 'undefined')
				library.hero.life = args.life;
			if (typeof args.power !== 'undefined')
				library.hero.power = args.power;
			if (typeof args.position !== 'undefined')
				library.hero.position = args.position;
		},

		name_set: function (name) {
			library.hero.name = name;
		},
		life_set: function (life) {
			library.hero.life = life;
		},
		power_set: function (power) {
			library.hero.power = power;
		},
		name_get: function () {
			return library.hero.name;
		},
		life_get: function () {
			return library.hero.life;
		},
		power_get: function (power) {
			return library.hero.power;
		},

		right_movement: {
			move: function (args) {
				console.log(library.hero.name + "moving right");
			},
			run: function (args) {
				console.log(library.hero.name + "running right");
			},
		},

		left_movement: {
			move: function (args) {
				console.log(library.hero.name + "is moving left");
			},
			run: function (args) {
				console.log(library.hero.name + "is running left");
			},
		},

		jump: {
			simple: function () {
				console.log(library.hero.name + "is jumping");
			},
			double: function () {
				console.log(library.hero.name + "is jumping really hight");
			},
		},

		play_animation: function (args) {
			//TODO: how to do an animation just for nothing?
		},
	},

	clic_n_move: {
		move_defined: null,

		define_onclic: function (move) {
			library.clic_n_move.move_defined = move;
			console.log("function defined");
		},

		clic_event: function (event) {
			var x = new Number();
			var y = new Number();
			var c = document.getElementById("camera");
			if (event.x != undefined && event.y != undefined) {
				x = event.x;
				y = event.y;
			} else {
				x = event.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
				y = event.clientY + document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			x -= c.offsetLeft;
			y -= c.offsetTop;

			if (library.clic_n_move.move_defined == null) {
				if (x > (document.getElementById("camera").offsetWidth - c.offsetLeft) / 2)
					library.camera.move_right(4);
				else
					library.camera.move_left(4);
				if (y > (document.getElementById("camera").offsetHeight - c.offsetTop) / 2)
					library.camera.move_down(4);
				else
					library.camera.move_up(4);
			} else {
				library.clic_n_move.move_defined({
					pos_clic_x: x,
					pos_clic_y: y
				});
			}
		}
	}

};

var init_library = function () {
	document.getElementById("camera").addEventListener("mousedown",
		library.clic_n_move.clic_event, false);
}
