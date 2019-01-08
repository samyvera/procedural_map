const bossRoom = new Room (
    [
        new Wall(new V2D(0, 1), 'top', new V2D(0, 1)),
        new Wall(new V2D(1, 1), 'top', new V2D(1, 1)),
        new Wall(new V2D(2, 1), 'top', new V2D(2, 1)),
        new Wall(new V2D(2, 0), 'right', new V2D(2, 0)),
        new Wall(new V2D(2, 1), 'right', new V2D(2, 1)),
        new Wall(new V2D(0, 0), 'bottom', new V2D(0, 0)),
        new Wall(new V2D(1, 0), 'bottom', new V2D(1, 0)),
        new Wall(new V2D(2, 0), 'bottom', new V2D(2, 0)),
        new Wall(new V2D(0, 1), 'left', new V2D(0, 1)),
    ],
    [
        new Door(new V2D(0, 0), 'left', false, new V2D(0, 0))
    ],
    new V2D(0, 0)
);

//room 00 --> 0f

const room00 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'bottom'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    []
);
const room01 = new Room (
    [
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'bottom'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'top')
    ]
);
const room02 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'bottom'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'right')
    ]
);
const room03 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'bottom')
    ]
);
const room04 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'bottom'),
    ],
    [
        new Door(new V2D(0, 0), 'left')
    ]
);
const room05 = new Room (
    [
        new Wall(new V2D(0, 0), 'bottom'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'right')
    ]
);
const room06 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'bottom')
    ]
);
const room07 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'right'),
    ],
    [
        new Door(new V2D(0, 0), 'bottom'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room08 = new Room (
    [
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'bottom'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room09 = new Room (
    [
        new Wall(new V2D(0, 0), 'right'),
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'bottom')
    ]
);
const room0a = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'bottom'),
    ],
    [
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room0b = new Room (
    [
        new Wall(new V2D(0, 0), 'left'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'bottom')
    ]
);
const room0c = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
    ],
    [
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'bottom'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room0d = new Room (
    [
        new Wall(new V2D(0, 0), 'right'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'bottom'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room0e = new Room (
    [
        new Wall(new V2D(0, 0), 'bottom'),
    ],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'left')
    ]
);
const room0f = new Room (
    [],
    [
        new Door(new V2D(0, 0), 'top'),
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'bottom'),
        new Door(new V2D(0, 0), 'left')
    ]
);

//room 10 --> 1f

const room10 = new Room (
    [
        new Wall(new V2D(0, 1), 'top'),
        new Wall(new V2D(1, 1), 'top'),
        new Wall(new V2D(1, 0), 'right'),
        new Wall(new V2D(1, 1), 'right'),
        new Wall(new V2D(0, 0), 'bottom'),
        new Wall(new V2D(1, 0), 'bottom'),
        new Wall(new V2D(0, 0), 'left'),
        new Wall(new V2D(0, 1), 'left')
    ],
    []
);
const room11 = new Room (
    [
        new Wall(new V2D(0, 0), 'top'),
        new Wall(new V2D(0, 0), 'bottom')
    ],
    [
        new Door(new V2D(0, 0), 'right'),
        new Door(new V2D(0, 0), 'left')
    ]
);

const worldData01 = new WorldData (
    bossRoom,
    [],
    [
        room00, room01, room02, room03, room04, room05, room06, room07,
        room08, room09, room0a, room0b, room0c, room0d, room0e, room0f,
        room10, room11
    ],
    16
);