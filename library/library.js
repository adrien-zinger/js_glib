"use strict"

var library = {
	map: {
		blocks: [],
		players: [], // ?
		enemies: [], // ?

		block_set: function (args) {
			var id = "b_" + args.x + "_" + args.y;

			var block = document.getElementById(id);
			if (!block) {
				block = document.createElement("div");
				block.id = id;
				block.className = "block";
			}

			block.style.left = (args.x * 20) + "px"; // 20 -> Fix to CONSTANT
			block.style.top = (args.y * 20) + "px";

			var camera = document.getElementById("camera");
			camera.appendChild(block);

			if (typeof library.map.blocks[args.x] === "undefined")
				this.blocks[args.x] = [];
			library.map.blocks[args.x][args.y] = {
				elem: block,
				value: "1", // 1 is a string ?
				state: "solid", // what is a block which are not solid?
				/* Useless, because we can add them in DOM:
				x = getElementById("#id")
				x.value = 1;
				x.state = "solid"

				Why value? Why not just css class for kind of block?
				Why state here? We can manage colisions with an another array of booleans!
				*/
			};
		},

		block_get: function (args) {
			if (typeof library.map.blocks[args.x] === "undefined")
				this.blocks[args.x] = [];
			return this.blocks[args.x][args.y];
		},

		/* Why players are in map? Create a player object! */
		add_player: function (player) {
			library.map.players.push(player);
		},

		get_players: function () {
			return library.map.players;
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
							blocks[x][y].elem.style.left = ((x * 20) - library.camera.x) + "px";
							blocks[x][y].elem.style.top = ((y * 20) - library.camera.y) + "px";
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
};

/*******************************************************************************
 **                               LIBRARY EVENT                               **
 *******************************************************************************/

var library_event = {

	init_event: function () {
		document.getElementById("camera").addEventListener("mousedown",
			library_event.clic_n_move.clic_event, false);
	},

	clic_n_move: {
		move_defined: null,

		define_onclic: function (move) {
			library.clic_n_move.move_defined = move;
			console.log("DEBUG: function defined");
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

			if (library_event.clic_n_move.move_defined == null) {
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
		},
	},
};

/*******************************************************************************
 **                               LIBRARY LIFE                                **
 *******************************************************************************/

var library_life = {

	player: function () {
		this.life = 100;
		this.power = 100;
		this.name = "hero";
		this.position_map = {
			x: 0,
			y: 0
		};
		this.weight = 20;
		this.height = 20;

		this.create = function (args) {
			if (typeof args !== 'undefined') {
				if (typeof args.name !== "undefined")
					this.name = args.name;
				if (typeof args.life !== "undefined")
					this.life = args.life;
				if (typeof args.power !== "undefined")
					this.power = args.power;
				if (typeof args.position !== "undefined")
					this.position = args.position;
			}

			/* ----- FIX ME -----
			var player = document.getElementById(library_life.player.name);
			if (!player) {
				player = document.createElement("div");
				player.id = this.name;
				document.getElementById("camera").appendChild(player);
				library.map.add_player(this);
			}
			*/
		};

		this.name_set = function (name) {
			this.name = name; // Cool! How do you want name your chicken?
		};
		this.life_set = function (life) {
			this.life = life;
		};
		this.power_set = function (power) {
			this.power = power;
		};
		this.name_get = function () {
			return this.name;
		};
		this.life_get = function () {
			return this.life;
		};
		this.power_get = function (power) {
			return this.power;
		};

		this.right_movement = {
			move: function (args) {
				console.log("DEBUG: " + library_life.hero.name + "is moving right");
				var blocks = library.map.blocks;
				var posx = this.position_map.x;
				var posy = map.hero.position_map.y;
				//FIX ME
				/*
				for (var i = args.length + posx; i > posx; --i)
					if (typeof blocks[i] !== "undefined")
						if (typeof blocks[i][posy] !== "undefined")
							if (blocks[i][posy].state = 'solid')
								return false;
				*/
				return true;
			},
			run: function (args) {
				console.log("DEBUG: " + library_life.hero.name + "is running right");
			},
		};

		this.left_movement = {
			move: function (args) {
				console.log("DEBUG: " + library_life.hero.name + "is moving left");
			},
			run: function (args) {
				console.log("DEBUG: " + library_life.hero.name + "is running left");
			},
		};

		this.jump = {
			simple: function () {
				console.log("DEBUG: " + library_life.hero.name + "is jumping");
			},
			double: function () {
				console.log("DEBUG: " + library_life.hero.name + "is jumping really hight");
			},
		};

		this.play_animation = function (args) {
			//TODO
		};
	},
};


/*******************************************************************************
 **                               LIBRARY FORM                                **
 *******************************************************************************/

/* OK, perhaps you would say "polygon" ? Just because I don't see checkbox... */

var form = {
	height: 0, // Of the bounding box ?
	width: 0,
	value: 0, // Hum ?
	position: { // Of the top-left corner ?
		x: 0,
		y: 0,
	},
	create: function (args) {
		if (args === 'undefined')
			console.log("ERROR: NO ARGUMENTS"); // console.error prints pretty good errors !
		if (args.form === 'undefined')
			console.log("ERROR: FORM UNDEFINED");
		if (args.width === 'undefined')
			console.log("ERROR: WIGTH UNDEFINED");
		if (args.height === 'undefined')
			console.log("ERROR: HEIGHT UNDEFINED");
		if (args.position !== 'undefined')
			this.position = args.position;
		this.height = args.height; // And if height or width are undefined?
		this.width = args.width;
		this.stuff(args.form); // hum... OK!
	},
	stuff: function (form) {
		if (form == "rectangle") {
			for (var i = 0; i < this.width; ++i)
				for (var j = 0; j < this.height; ++j)
					library.map.block_set({
						x: this.position.x + i,
						y: this.position.y + j,
					});
			if (form == "triange") // what's look like a "triange"?
				for (var i = 0; i < this.width; ++i)
					for (var j = i; j < this.height; ++j)
						library.map.block_set({
							x: this.position.x,
							y: this.position.y,
						});
		}
		// FIX ME: We have numerous good algorythms to dram forms with pixels on wikipedia!
	},

	// Useless...
	value_set: function (args) {
		// TODO
	},
	value_get: function (args) {
		// TODO
	},

	// Ok good, let me think that blocks are not currently movable...
	position_set: function (args) {
		// TODO
	},
	position_get: function (args) {
		// TODO
	},

	// Do a "group" object to play with block easier!
};
