"use strict"

var library = {
    map: {
        blocks: [],
        compt: 0,
        block_get: function (args) {
            if (typeof library.map.blocks[args.x] === "undefined")
                library.map.blocks[args.x] = [];
            return library.map.blocks[args.x][args.y];
        },

        block_set: function (args) {
            if (typeof library.map.blocks[args.x] === "undefined")
                library.map.blocks[args.x] = [];
            library.map.blocks[args.x][args.y] = args.block;
            var newBlock = document.createElement("div");
            newBlock.id = "b" + library.map.compt;
            newBlock.className = "block";
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

        move_right: function (args) {
            var b = document.getElementsByClassName("block");
            for (var i = 0; i < b.length; ++i)
                b[i].style.left = (parseInt(b[i].style.left.split("p")[0]) + 4) + "px";
        },

        move_left: function (args) {
            var b = document.getElementsByClassName("block");
            for (var i = 0; i < b.length; ++i)
                b[i].style.left = (parseInt(b[i].style.left.split("p")[0]) - 4) + "px";
        },

        move_up: function (args) {
            var b = document.getElementsByClassName("block");
            for (var i = 0; i < b.length; ++i)
                b[i].style.top = (parseInt(b[i].style.top.split("p")[0]) - 4) + "px";
        },

        move_down: function (args) {
            var b = document.getElementsByClassName("block");
            for (var i = 0; i < b.length; ++i)
                b[i].style.top = (parseInt(b[i].style.top.split("p")[0]) + 4) + "px";
        },
    },

    hero: {
        life: 100,
        power: 100,
        name: "hero",
        position: {x:0, y:0},

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

        play_animation: function(args){
            //TODO: how to do an animation just for nothing?
        },
    },

    clic_n_move: {
        move_defined:null,

        define_onclic: function (move) {
            library.clic_n_move.move_defined = move;
        },
        
        clic_event: function (event) {
            var x = new Number();
            var y = new Number();
            var c = document.getElementById("camera");
            if (event.x != undefined && event.y != undefined) {
                x = event.x;
                y = event.y;
            }
            else {
                x = event.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            x -= c.offsetLeft;
            y -= c.offsetTop;

            if (library.clic_n_move.move_defined == null) {
                if (x > (document.getElementById("camera").offsetWidth - c.offsetLeft) / 2)
                    library.camera.move_right();
                else
                    library.camera.move_left();
                if (y > (document.getElementById("camera").offsetHeight - c.offsetTop) / 2)
                    library.camera.move_down();
                else
                    library.camera.move_up();
            } else {
                library.clic_n_move.move_defined({pos_clic_x: x, pos_clic_y: y});
            }
        }
    }

};

var launch_map = function () {
    document.getElementById("camera").addEventListener("mousedown", library.clic_n_move.clic_event, false);
    library.map.block_set({ x: 10, y: 10, c: "camera" });
    library.map.block_set({ x: 30, y: 40, c: "camera" });
    library.map.block_set({ x: 70, y: 40, c: "camera" });
}
