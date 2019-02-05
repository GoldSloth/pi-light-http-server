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
                "max": 1.0,
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
                "max": 1.0,
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
    }
}

instructions = Queue()

# instructions.put(("UPANIM", totalSinWave, ))

run(instructions, animations, defaultAnim)
