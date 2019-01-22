from Server import *
# from LightHandler import LightStrip
# lights = LightStrip(30)
from Animations import *
from queue import Queue

animations = [
    progressiveSinWave,
    totalSinWave
]

instructions = Queue()

instructions.put("UPANIM", progressiveSinWave)

run(instructions, animations, defaultAnim)
