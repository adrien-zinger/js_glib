"use strict"

var library = {
    map: {
        blocks:[],

        block_get: function(x, y, block) {
            return library.map.blocks[x][y];
        },

        block_set: function(x, y, block) {
            library.map.blocks[x][y] = block;
            // create an HTML element corresponding to the block... parent
        },
    },
};


var map = library.map.blocks_set(10, 5, "bar");
console.log(library.map.blocks_get(10, 5));
