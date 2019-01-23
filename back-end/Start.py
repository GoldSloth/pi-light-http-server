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
        }
    },
    "tSinWave": {
        "func": totalSinWave,
        "title": "Whole strip sin wave",
        "arguments": {
            "speed": "number",
            "saturation": "number",
            "value": "number"
        }
    },
    "constantColour": {
        "func": constantColour,
        "arguments": {
            "colour": "colour"
        }
    }
}

instructions = Queue()

# instructions.put(("UPANIM", totalSinWave, ))

run(instructions, animations, defaultAnim)
