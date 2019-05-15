const room00: Array<string> = [];
const room01: Array<string> = ['top'];
const room02: Array<string> = ['right'];
const room03: Array<string> = ['bottom'];
const room04: Array<string> = ['left'];
const room05: Array<string> = ['top', 'right'];
const room06: Array<string> = ['right', 'bottom'];
const room07: Array<string> = ['bottom', 'left'];
const room08: Array<string> = ['left', 'top'];
const room09: Array<string> = ['top', 'bottom'];
const room0a: Array<string> = ['right', 'left'];
const room0b: Array<string> = ['top', 'right', 'bottom'];
const room0c: Array<string> = ['right', 'bottom', 'left'];
const room0d: Array<string> = ['bottom', 'left', 'top '];
const room0e: Array<string> = ['left', 'top', 'right'];
const room0f: Array<string> = ['top', 'right', 'bottom', 'left'];

const rooms00_0f: Array<Array<string>> = [room00, room01, room02, room03, room04, room05, room06, room07, room08, room09, room0a, room0b, room0c, room0d, room0e, room0f];

window.onload = () => new Canvas(document.body, new World(16, rooms00_0f)).draw();