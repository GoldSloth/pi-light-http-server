from Server import *
# from LightHandler import LightStrip
# lights = LightStrip(30)
from Animations import *
from queue import Queue

animations = {
    "mSinWave": {
        "func": progressiveSinWave,
        "title": "Moving sin wave",
        "arguments": {
            "speed": {
                "name": "Speed",
                "type": "number",
                "min": 0.001,
                "max": 0.1,
            },
            "saturation": {
                "name": "Saturation",
                "type": "number",
                "min": 0,
                "max": 1,
            },
            "value": {
                "name": "Value",
                "type": "number",
                "min": 0,
                "max": 1,
            }
        },
        "defaultArgs": {
            "speed": 0.05,
            "saturation": 1,
            "value": 1
        }
    },
    "tSinWave": {
        "func": totalSinWave,
        "title": "Whole strip sin wave",
        "arguments": {
            "speed": {
                "name": "Speed",
                "type": "number",
                "min": 0.001,
                "max": 0.1,
            },
            "saturation": {
                "name": "Saturation",
                "type": "number",
                "min": 0,
                "max": 1,
            },
            "value": {
                "name": "Value",
                "type": "number",
                "min": 0,
                "max": 1,
            }
        },
        "defaultArgs": {
            "speed": 0.05,
            "saturation": 1,
            "value": 1
        }
    },
    "constantColour": {
        "func": constantColour,
        "title": "Constant Colour",
        "arguments": {
            "colour": {
                "type": "colour",
                "name": "Colour"
            }
        },
        "defaultArgs": {
            "colour": (0.5, 0.5, 0.5)
        }
    },
    "default": {
        "func": defaultAnim,
        "title": "Default Program",
        "arguments": {

        },
        "defaultArgs": {

        }
    },
    "hoveringColour": {
        "func": hoveringColour,
        "title": "Hovering sin wave",
        "arguments":
        {       
            "colour": {
                "type": "colour",
                "name": "Colour"
            },
            "speed": {
                "name": "Speed",
                "type": "number",
                "min": 0.001,
                "max": 0.1,
            },
            "variation": {
                "name": "Variation",
                "type": "number",
                "min": 0,
                "max": 1,
            }
        },
        "defaultArgs": {
            "colour": (0.5, 0.5, 0.5),
            "speed": 0.05,
            "variation": 0.05
        }
    }
}

instructions = Queue()

# instructions.put(("UPANIM", totalSinWave, ))

run(instructions, animations, defaultAnim)
