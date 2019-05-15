class World {
    constructor(size, possibleRooms) {
        this.rooms = new Map();
        this.generate = (pos) => {
            var posNum = pos.split(',', 2);
            var nextPositions = new Map()
                .set('top', this.rooms.get((+posNum[0] + 0) + ',' + (+posNum[1] + 1)))
                .set('right', this.rooms.get((+posNum[0] + 1) + ',' + (+posNum[1] + 0)))
                .set('bottom', this.rooms.get((+posNum[0] + 0) + ',' + (+posNum[1] + -1)))
                .set('left', this.rooms.get((+posNum[0] + -1) + ',' + (+posNum[1] + 0)));
            var dreamRoom = new Map();
            if (nextPositions.get('top'))
                (nextPositions.get('top').indexOf('bottom') > -1) ? dreamRoom.set('top', 'top-door') : dreamRoom.set('top', 'top-wall');
            if (nextPositions.get('right'))
                (nextPositions.get('right').indexOf('left') > -1) ? dreamRoom.set('right', 'right-door') : dreamRoom.set('right', 'right-wall');
            if (nextPositions.get('bottom'))
                (nextPositions.get('bottom').indexOf('top') > -1) ? dreamRoom.set('bottom', 'bottom-door') : dreamRoom.set('bottom', 'bottom-wall');
            if (nextPositions.get('left'))
                (nextPositions.get('left').indexOf('right') > -1) ? dreamRoom.set('left', 'left-door') : dreamRoom.set('left', 'left-wall');
            if (+posNum[1] === this.size / 2 - 1)
                dreamRoom.set('top', 'top-wall');
            if (+posNum[0] === this.size / 2 - 1)
                dreamRoom.set('right', 'right-wall');
            if (+posNum[1] === -this.size / 2)
                dreamRoom.set('bottom', 'bottom-wall');
            if (+posNum[0] === -this.size / 2)
                dreamRoom.set('left', 'left-wall');
            var possibleRooms = [];
            this.possibleRooms.forEach(possibleRoom => {
                if ((!dreamRoom.get('top') || dreamRoom.get('top') === 'top-door' && (possibleRoom.indexOf('top') > -1) ||
                    dreamRoom.get('top') === 'top-wall' && !(possibleRoom.indexOf('top') > -1)) &&
                    (!dreamRoom.get('right') || dreamRoom.get('right') === 'right-door' && (possibleRoom.indexOf('right') > -1) ||
                        dreamRoom.get('right') === 'right-wall' && !(possibleRoom.indexOf('right') > -1)) &&
                    (!dreamRoom.get('bottom') || dreamRoom.get('bottom') === 'bottom-door' && (possibleRoom.indexOf('bottom') > -1) ||
                        dreamRoom.get('bottom') === 'bottom-wall' && !(possibleRoom.indexOf('bottom') > -1)) &&
                    (!dreamRoom.get('left') || dreamRoom.get('left') === 'left-door' && (possibleRoom.indexOf('left') > -1) ||
                        dreamRoom.get('left') === 'left-wall' && !(possibleRoom.indexOf('left') > -1)))
                    possibleRooms.push(possibleRoom);
            });
            var room = possibleRooms[Math.floor(Math.random() * possibleRooms.length)];
            if (room) {
                this.rooms.set(pos, room);
                room.forEach(door => {
                    if (door === 'top' && !nextPositions.get('top'))
                        this.generate((+posNum[0] + 0) + ',' + (+posNum[1] + 1));
                    else if (door === 'right' && !nextPositions.get('right'))
                        this.generate((+posNum[0] + 1) + ',' + (+posNum[1] + 0));
                    else if (door === 'bottom' && !nextPositions.get('bottom'))
                        this.generate((+posNum[0] + 0) + ',' + (+posNum[1] + -1));
                    else if (door === 'left' && !nextPositions.get('left'))
                        this.generate((+posNum[0] + -1) + ',' + (+posNum[1] + 0));
                });
            }
        };
        this.size = size;
        this.possibleRooms = possibleRooms;
        this.generate('0,0');
    }
}
