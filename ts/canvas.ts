class Canvas {
    public canvas: HTMLCanvasElement = document.createElement('canvas');
    public cx: CanvasRenderingContext2D = this.canvas.getContext("2d", { alpha: false });
    public zoom: number = 4;
    public world: World;

    constructor(parent: HTMLElement, world: World) {
        this.canvas.width = world.size * 8 * this.zoom;
        this.canvas.height = world.size * 8 * this.zoom;
        parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, -this.zoom);
        this.cx.translate(0, -world.size * 8);
        this.cx.imageSmoothingEnabled = false;
        this.world = world;
    }

    public draw = () => {
        this.cx.fillStyle = '#033';
        this.cx.strokeStyle = "#0f0";
        this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.world.size; x++) for (let y = 0; y < this.world.size; y++) this.cx.strokeRect(x * 8 + 0.5, y * 8 + 0.5, 7, 7);

        this.cx.fillStyle = "#888";
        this.cx.strokeStyle = "#fff";
        this.world.rooms.forEach((room, pos) => {
            var posNum: Array<string> = pos.split(',', 2);
            var posX: number = (+posNum[0]) * 8 + this.world.size / 2 * 8;
            var posY: number = (+posNum[1]) * 8 + this.world.size / 2 * 8;
            this.cx.fillRect(posX, posY, 8, 8);
            this.cx.strokeRect(posX + 0.5, posY + 0.5, 7, 7);
            room.forEach(door => {
                if (door === "top") this.cx.fillRect(posX + 3, posY + 7, 2, 1);
                if (door === "right") this.cx.fillRect(posX + 7, posY + 3, 1, 2);
                if (door === "bottom") this.cx.fillRect(posX + 3, posY, 2, 1);
                if (door === "left") this.cx.fillRect(posX, posY + 3, 1, 2);
            });
        });
    }
}