"use strict"

var library = {
	map: {
		blocks: [],
		compt: 0,
		block_get: function(args) {
			if (typeof library.map.blocks[args.x] === "undefined")
				library.map.blocks[args.x] = [];
			return library.map.blocks[args.x][args.y];
		},

		block_set: function(args) {
			if (typeof library.map.blocks[args.x] === "undefined")
				library.map.blocks[args.x] = [];
			library.map.blocks[args.x][args.y] = args.block;
			var newBlock = document.createElement("div");
			newBlock.id = "b" + library.map.compt;
			newBlock.className="block";
			newBlock.style.left = args.x + "px";
			newBlock.style.top = args.y + "px";
			document.getElementById("camera").appendChild(newBlock);
			++library.map.compt;
		},
	},

	camera: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		
		move_right: function(args) {
			var b = document.getElementsByClassName("block");
			for (var i = 0; i < b.length; ++i)
				b[i].style.left = (parseInt(b[i].style.left.split("p")[0]) + 4) + "px";
		},
		
		move_left: function(args) {
			var b = document.getElementsByClassName("block");
			for (var i = 0; i < b.length; ++i)
				b[i].style.left = (parseInt(b[i].style.left.split("p")[0]) - 4) + "px";
		},
		
		move_up: function(args) {
			var b = document.getElementsByClassName("block");
			for (var i = 0; i < b.length; ++i)
				b[i].style.top = (parseInt(b[i].style.top.split("p")[0]) - 4) + "px";
		},
		
		move_down: function(args) {
			var b = document.getElementsByClassName("block");
			for (var i = 0; i < b.length; ++i)
				b[i].style.top = (parseInt(b[i].style.top.split("p")[0]) + 4) + "px";
		},
	},
};

var launch_map = function() {
	library.map.compt = 0;
	library.map.block_set({x: 10, y: 10, c: "camera"});
	library.map.block_set({x: 30, y: 40, c: "camera"});
}