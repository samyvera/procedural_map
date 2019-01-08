var generateWorld = worldData => {

    var rooms = new Array();
    var usedSpace = new Map();
    usedSpace = setBorderUsedSpace(worldData);

    var firstRoom = new Room(worldData.bossRoom.walls, worldData.bossRoom.doors, worldData.bossRoom.absPos);
    var firstDoor = new Door(
        worldData.bossRoom.doors[0].relPos, worldData.bossRoom.doors[0].side,
        worldData.bossRoom.doors[0].state, worldData.bossRoom.doors[0].absPos
    );
    rooms.push(firstRoom);
    usedSpace = updateUsedSpace(usedSpace, firstRoom);

    var addNextRoom = (worldData, lastRoom, lastDoor) => {

        var newRoom = generateNewRoom(worldData, usedSpace, lastRoom, lastDoor);
        rooms.push(newRoom);
        usedSpace = closeNeighborDoors(usedSpace, newRoom);
        usedSpace = updateUsedSpace(usedSpace, newRoom);

        newRoom.doors.forEach(door => {
            if (door.state) {
                door.state = false;
                addNextRoom(worldData, newRoom, door);
            }
        });
    }
    addNextRoom(worldData, firstRoom, firstDoor);

    return new World(rooms, usedSpace, worldData.size);
}
var generateNewRoom = (worldData, usedSpace, lastRoom, lastDoor) => {

    var potentialRooms = new Array();
    worldData.rooms.forEach(room => {
        room.doors.forEach(door => {
            if (door.side === reverseDoorSide(lastDoor.side)) {
                potentialRooms.push(room);
            }
        });
    });
    var magicNumber = Math.floor(Math.random() * potentialRooms.length)
    var newRoom = makeNewRoom(
        potentialRooms[magicNumber].walls,
        potentialRooms[magicNumber].doors
    );

    var potentialDoors = new Array();
    newRoom.doors.forEach(door => {
        if (door.side === reverseDoorSide(lastDoor.side)) {
            potentialDoors.push(door)
        }
    });
    var AnotherMagicNumber = Math.floor(Math.random() * potentialDoors.length)
    var newDoor = new Door(
        potentialDoors[AnotherMagicNumber].relPos,
        potentialDoors[AnotherMagicNumber].side,
        false
    )
    newRoom.absPos = calculateNewRoomAbsPos(newRoom, newDoor, lastRoom, lastDoor);

    calculateAbsPos(newRoom, newRoom.walls);
    calculateAbsPos(newRoom, newRoom.doors);

    if (checkUsedSpace(newRoom, usedSpace) && checkNeighborCells(newRoom, usedSpace)) {
        newRoom = closeNewDoor(newRoom, newDoor);
        return newRoom;
    } else {
        return generateNewRoom(worldData, usedSpace, lastRoom, lastDoor);
    }
}
var setBorderUsedSpace = worldData => {
    var limit = worldData.size / 2 + 1;
    var newUsedSpace = new Map();
    for (let x = -limit; x < limit; x++) {
        for (let y = -limit; y < limit; y++) {
            if (x === -limit || x === limit - 1 || y === -limit || y === limit - 1) {
                newUsedSpace.set(x + ", " + y,
                    new Cell(new V2D(x, y), new Wall(new V2D(0, 0), 'top', new V2D(x, y)), new Wall(new V2D(0, 0), 'right', new V2D(x, y)),
                        new Wall(new V2D(0, 0), 'bottom', new V2D(x, y)), new Wall(new V2D(0, 0), 'left', new V2D(x, y))));
            } else {
                newUsedSpace.set(x + ", " + y, new Cell(new V2D(x, y)));
            }
        }
    }
    return newUsedSpace;
}
var updateUsedSpace = (usedSpace, newRoom) => {
    var newUsedSpace = new Map(usedSpace);
    newRoom.walls.forEach(wall => {
        if (wall.side === "top") {
            newUsedSpace.set(wall.absPos.x + ", " + wall.absPos.y,
                new Cell(newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).pos, wall, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).right,
                    newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).bottom, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).left));
        } else if (wall.side === "right") {
            newUsedSpace.set(wall.absPos.x + ", " + wall.absPos.y,
                new Cell(newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).pos, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).top, wall,
                    newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).bottom, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).left));
        } else if (wall.side === "bottom") {
            newUsedSpace.set(wall.absPos.x + ", " + wall.absPos.y,
                new Cell(newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).pos, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).top,
                    newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).right, wall, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).left));
        } else if (wall.side === "left") {
            newUsedSpace.set(wall.absPos.x + ", " + wall.absPos.y,
                new Cell(newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).pos, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).top,
                    newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).right, newUsedSpace.get(wall.absPos.x + ", " + wall.absPos.y).bottom, wall));
        }
    });
    newRoom.doors.forEach(door => {
        if (door.side === "top") {
            newUsedSpace.set(door.absPos.x + ", " + door.absPos.y,
                new Cell(newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).pos, door, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).right,
                    newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).bottom, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).left));
        } else if (door.side === "right") {
            newUsedSpace.set(door.absPos.x + ", " + door.absPos.y,
                new Cell(newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).pos, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).top, door,
                    newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).bottom, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).left));
        } else if (door.side === "bottom") {
            newUsedSpace.set(door.absPos.x + ", " + door.absPos.y,
                new Cell(newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).pos, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).top,
                    newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).right, door, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).left));
        } else if (door.side === "left") {
            newUsedSpace.set(door.absPos.x + ", " + door.absPos.y,
                new Cell(newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).pos, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).top,
                    newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).right, newUsedSpace.get(door.absPos.x + ", " + door.absPos.y).bottom, door));
        }
    });
    return newUsedSpace;
}
var reverseDoorSide = doorSide => {
    if (doorSide === "top") {
        return "bottom";
    } else if (doorSide === "right") {
        return "left";
    } else if (doorSide === "bottom") {
        return "top";
    } else if (doorSide === "left") {
        return "right";
    }
}
var calculateNewRoomAbsPos = (room, door, lastRoom, lastDoor) => {
    var newRoom = room;
    door.absPos = new V2D(undefined, undefined);
    newRoom.absPos = new V2D(undefined, undefined);
    if (door.side === 'top') {
        door.absPos.x = lastDoor.absPos.x;
        door.absPos.y = lastDoor.absPos.y - 1;
    } else if (door.side === 'right') {
        door.absPos.x = lastDoor.absPos.x - 1;
        door.absPos.y = lastDoor.absPos.y;
    } else if (door.side === 'bottom') {
        door.absPos.x = lastDoor.absPos.x;
        door.absPos.y = lastDoor.absPos.y + 1;
    } else if (door.side === 'left') {
        door.absPos.x = lastDoor.absPos.x + 1;
        door.absPos.y = lastDoor.absPos.y;
    }
    newRoom.absPos.x = door.absPos.x - door.relPos.x;
    newRoom.absPos.y = door.absPos.y - door.relPos.y;
    return newRoom.absPos;
}
var calculateAbsPos = (container, object) => {
    object.forEach(element => {
        element.absPos = new V2D(undefined, undefined);
        element.absPos.x = container.absPos.x - element.relPos.x;
        element.absPos.y = container.absPos.y - element.relPos.y;
    });
}
var makeNewRoom = (walls, doors) => {
    var newWalls = new Array();
    walls.forEach(wall => {
        newWalls.push(new Wall(new V2D(wall.relPos.x, wall.relPos.y), wall.side))
    });
    var newDoors = new Array();
    doors.forEach(door => {
        newDoors.push(new Door(new V2D(door.relPos.x, door.relPos.y), door.side, true))
    });
    return new Room(newWalls, newDoors);
}
var checkUsedSpace = (newRoom, usedSpace) => {
    var roomOK = true;
    newRoom.walls.forEach(wall => {
        if (wall.side === "top") {
            if (usedSpace.get(wall.absPos.x + ", " + wall.absPos.y).top !== undefined) {
                roomOK = false;
            }
        } else if (wall.side === "right") {
            if (usedSpace.get(wall.absPos.x + ", " + wall.absPos.y).right !== undefined) {
                roomOK = false;
            }
        } else if (wall.side === "bottom") {
            if (usedSpace.get(wall.absPos.x + ", " + wall.absPos.y).bottom !== undefined) {
                roomOK = false;
            }
        } else if (wall.side === "left") {
            if (usedSpace.get(wall.absPos.x + ", " + wall.absPos.y).left !== undefined) {
                roomOK = false;
            }
        }
    });
    newRoom.doors.forEach(door => {
        if (door.side === "top") {
            if (usedSpace.get(door.absPos.x + ", " + door.absPos.y).top !== undefined) {
                roomOK = false;
            }
        } else if (door.side === "right") {
            if (usedSpace.get(door.absPos.x + ", " + door.absPos.y).right !== undefined) {
                roomOK = false;
            }
        } else if (door.side === "bottom") {
            if (usedSpace.get(door.absPos.x + ", " + door.absPos.y).bottom !== undefined) {
                roomOK = false;
            }
        } else if (door.side === "left") {
            if (usedSpace.get(door.absPos.x + ", " + door.absPos.y).left !== undefined) {
                roomOK = false;
            }
        }
    });
    return roomOK;
}
var checkNeighborCells = (newRoom, usedSpace) => {
    var roomOK = true;
    newRoom.walls.forEach(wall => {
        if (wall.side === "top") {
            if (usedSpace.get(wall.absPos.x + ", " + (wall.absPos.y + 1)).bottom instanceof Door) {
                roomOK = false;
            }
        } else if (wall.side === "right") {
            if (usedSpace.get((wall.absPos.x + 1) + ", " + wall.absPos.y).left instanceof Door) {
                roomOK = false;
            }
        } else if (wall.side === "bottom") {
            if (usedSpace.get(wall.absPos.x + ", " + (wall.absPos.y - 1)).top instanceof Door) {
                roomOK = false;
            }
        } else if (wall.side === "left") {
            if (usedSpace.get((wall.absPos.x - 1) + ", " + wall.absPos.y).right instanceof Door) {
                roomOK = false;
            }
        }
    });
    newRoom.doors.forEach(door => {
        if (door.side === "top") {
            if (usedSpace.get(door.absPos.x + ", " + (door.absPos.y + 1)).bottom instanceof Wall) {
                roomOK = false;
            }
        } else if (door.side === "right") {
            if (usedSpace.get((door.absPos.x + 1) + ", " + door.absPos.y).left instanceof Wall) {
                roomOK = false;
            }
        } else if (door.side === "bottom") {
            if (usedSpace.get(door.absPos.x + ", " + (door.absPos.y - 1)).top instanceof Wall) {
                roomOK = false;
            }
        } else if (door.side === "left") {
            if (usedSpace.get((door.absPos.x - 1) + ", " + door.absPos.y).right instanceof Wall) {
                roomOK = false;
            }
        }
    });
    return roomOK;
}
var closeNewDoor = (room, newDoor) => {
    var newRoom = new Room(room.walls, room.doors, room.absPos);
    newRoom.doors.forEach(door => {
        if (door.absPos.x === newDoor.absPos.x && door.absPos.y === newDoor.absPos.y && door.side === newDoor.side) {
            door.state = false;
        }
    });
    return newRoom;
}
var closeNeighborDoors = (usedSpace, newRoom) => {
    var newUsedSpace = new Map(usedSpace);
    newRoom.doors.forEach(door => {
        if (door.side === "top" && newUsedSpace.get(door.absPos.x + ", " + (door.absPos.y + 1)).bottom instanceof Door) {
            door.state = false;
            newUsedSpace.get(door.absPos.x + ", " + (door.absPos.y + 1)).bottom.state = false;
        } else if (door.side === "right" && newUsedSpace.get((door.absPos.x + 1) + ", " + door.absPos.y).left instanceof Door) {
            door.state = false;
            newUsedSpace.get((door.absPos.x + 1) + ", " + door.absPos.y).left.state = false;
        } else if (door.side === "bottom" && newUsedSpace.get(door.absPos.x + ", " + (door.absPos.y - 1)).top instanceof Door) {
            door.state = false;
            newUsedSpace.get(door.absPos.x + ", " + (door.absPos.y - 1)).top.state = false;
        } else if (door.side === "left" && newUsedSpace.get((door.absPos.x - 1) + ", " + door.absPos.y).right instanceof Door) {
            door.state = false;
            newUsedSpace.get((door.absPos.x - 1) + ", " + door.absPos.y).right.state = false;
        }
    });
    return newUsedSpace;
}

//START

var run = (worldData, Display) => {
    var display = new Display(document.body, generateWorld(worldData));
    display.draw();
}