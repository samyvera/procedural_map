class CanvasDisplay {
	constructor (parent, world) {
        this.canvas = document.createElement('canvas');
        this.gridLength = world.size;
        this.scale = 512 / world.size;
		this.canvas.width = this.scale * this.gridLength;
		this.canvas.height = this.scale * this.gridLength;
		parent.appendChild(this.canvas);
		this.cx = this.canvas.getContext("2d");
		this.cx.imageSmoothingEnabled = false;
        this.world = world;

        this.cx.translate(0, this.canvas.height/2);
        this.cx.scale(1, -1);
        this.cx.translate(0, -this.canvas.height/2);
	}
}

CanvasDisplay.prototype.draw = function() {
    this.drawGrid();
    this.drawRooms();
};

CanvasDisplay.prototype.drawGrid = function() {
    this.cx.fillStyle = '#033';
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let x = 0; x < this.canvas.width; x += this.scale) {
        for (let y = 0; y < this.canvas.height; y += this.scale) {
            this.cx.strokeStyle = "lime";
            this.cx.strokeRect(x, y, this.scale, this.scale);
        }
    }
};

CanvasDisplay.prototype.drawRooms = function() {
    this.world.grid.forEach(cell => {
        var posX = cell.pos.x*this.scale + this.canvas.width/2;
        var posY = cell.pos.y*this.scale + this.canvas.width/2;

        var color = "grey";
        // if (cell.type === 0) { color = "red"; }
        // else if (cell.type === 1) { color = "blue"; }
        // else { color = "grey"; }

        //floor
        if (cell.top || cell.right || cell.bottom || cell.left) {
            this.cx.fillStyle = color;
            this.cx.fillRect(posX, posY, this.scale, this.scale);
        }
        //walls && doors
        if (cell.top) {
            this.cx.fillStyle = "#fff";
            this.cx.fillRect(posX, posY + 0.875*this.scale, this.scale, this.scale/8);
            if (cell.top instanceof Door) {
                this.cx.fillStyle = color;
                this.cx.fillRect(posX + 0.375*this.scale, posY + 0.875*this.scale, this.scale/4, this.scale/8);
            }
        }
        if (cell.right) {
            this.cx.fillStyle = "#fff";
            this.cx.fillRect(posX + 0.875*this.scale, posY, this.scale/8, this.scale);
            if (cell.right instanceof Door) {
                this.cx.fillStyle = color;
                this.cx.fillRect(posX + 0.875*this.scale, posY + 0.375*this.scale, this.scale/8, this.scale/4);
            }
        }
        if (cell.bottom) {
            this.cx.fillStyle = "#fff";
            this.cx.fillRect(posX, posY, this.scale, this.scale/8);
            if (cell.bottom instanceof Door) {
                this.cx.fillStyle = color;
                this.cx.fillRect(posX + 0.375*this.scale, posY, this.scale/4, this.scale/8);
            }
        }
        if (cell.left) {
            this.cx.fillStyle = "#fff";
            this.cx.fillRect(posX, posY, this.scale/8, this.scale);
            if (cell.left instanceof Door) {
                this.cx.fillStyle = color;
                this.cx.fillRect(posX, posY + 0.375*this.scale, this.scale/8, this.scale/4);
            }
        }
    });
};