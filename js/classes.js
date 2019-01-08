class V2D {
	constructor (x, y) {
        this.x = x;
        this.y = y;
	}
}

class Cell {
        constructor (pos, top, right, bottom, left) {
        this.pos = pos;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        }
}

class Door {
        constructor (relPos, side, state, absPos) {
        this.relPos = relPos;
        this.side = side;
        this.state = state;
        this.absPos = absPos;
        }
}

class Wall {
        constructor (relPos, side, absPos) {
        this.relPos = relPos;
        this.side = side;
        this.absPos = absPos;
        }
}

class Room {
        constructor(walls, doors, absPos) {
        this.walls = walls;
        this.doors = doors;
        this.absPos = absPos;
        }
}

class WorldData {
	constructor (bossRoom, campRooms, rooms, size) {
        this.bossRoom = bossRoom;
        this.campRooms = campRooms;
        this.rooms = rooms;
        this.size = size;
	}
}

class World {
	constructor (rooms, grid, size) {
        this.rooms = rooms;
        this.grid = grid;
        this.size = size;
	}
}