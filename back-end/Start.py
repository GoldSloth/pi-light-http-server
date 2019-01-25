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
            "speed": "number",
            "saturation": "number",
            "value": "number"
        },
        "defaultArgs": {
            "speed": 30,
            "saturation": 0.5,
            "value": 0.5
        }
    },
    "tSinWave": {
        "func": totalSinWave,
        "title": "Whole strip sin wave",
        "arguments": {
            "speed": "number",
            "saturation": "number",
            "value": "number"
        },
        "defaultArgs": {
            "speed": 30,
            "saturation": 0.5,
            "value": 0.5
        }
    },
    "constantColour": {
        "func": constantColour,
        "arguments": {
            "colour": "colour"
        },
        "defaultArgs": {
            "colour": (0.5, 0.5, 0.5)
        }
    }
}

instructions = Queue()

# instructions.put(("UPANIM", totalSinWave, ))

run(instructions, animations, defaultAnim)
