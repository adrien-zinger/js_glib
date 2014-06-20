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
			library.camera.move({x: length, y: 0});
		},

		move_right: function (length) {
			library.camera.move({x: -length, y: 0});
		},

		move_up: function (length) {
			library.camera.move({x: 0, y: length});
		},

		move_down: function (length) {
			library.camera.move({x: 0, y: -length});
		},
	},
};
