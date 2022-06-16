import { BLOCK_TYPES, 
            PORT_TYPES, 
            DIRECTIONS, 
            VALUES_FORMAT } from "../constants.js";

export let blocksData = [
    {
        fileName: '',
        hash: 0,
        moduleName: 'adder',
        label: 'ADDER',
        id: 'adder',
        type: BLOCK_TYPES.rect,
        size: {
            width: 2,
            height: 3
        },
        parameters: [],
        ports: []
    }
]

export let blocksDataOld = [
    {
        id: 0,
        name: "and",
        label: "AND",
        type: BLOCK_TYPES.rect,
        pos: {
            x: 0,
            y: 0
        },
        size: {
            width: 3,
            height: 4
        },
        ports: [
            {
                name: "a",
                type: PORT_TYPES.in,
                connect: "",
                direction: DIRECTIONS.left,
                draw_index: 1,
                focus: false
            },
            {
                name: "b",
                type: PORT_TYPES.in,
                connect: "",
                direction: DIRECTIONS.left,
                draw_index: 3,
                focus: false
            },
            {
                name: "out",
                type: PORT_TYPES.out,
                connect: "",
                direction: DIRECTIONS.right,
                draw_index: 2,
                focus: false
            }
        ]
    },
    {
        id: 0,
        name: "or",
        label: "OR",
        type: BLOCK_TYPES.rect,
        pos: {
            x: 0,
            y: 0
        },
        size: {
            width: 3,
            height: 5
        },
        ports: [
            {
                name: "a",
                type: PORT_TYPES.in,
                connect: "",
                direction: DIRECTIONS.left,
                draw_index: 1
            },
            {
                name: "b",
                type: PORT_TYPES.in,
                connect: "",
                direction: DIRECTIONS.left,
                draw_index: 3
            },
            {
                name: "out",
                type: PORT_TYPES.out,
                connect: "",
                direction: DIRECTIONS.right,
                draw_index: 2
            }
        ]
    },
    {
        id: 0,
        name: "switch",
        label: "SWITCH",
        type: BLOCK_TYPES.switch,
        size: {
            width: 3,
            height: 2
        },
        active: false,
        ports: [
            {
                name: "out",
                type: PORT_TYPES.out,
                connect: "out_and_0",
                direction: DIRECTIONS.right,
                draw_index: 1
            }
        ]
    },
    {
        id: 0,
        name: "in_value",
        label: "IN_VALUE",
        type: BLOCK_TYPES.inValue,
        size: {
            width: 6,
            height: 2
        },
        bit_width: 8,
        data_format: VALUES_FORMAT.binary,
        data: "",
        ports: [
            {
                name: "out",
                type: PORT_TYPES.out,
                connect: "out_and_0",
                direction: DIRECTIONS.right,
                draw_index: 1
            }
        ]
    }
];