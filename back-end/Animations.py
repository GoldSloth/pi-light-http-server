import math
import colorsys

def progressiveSinWave(x, t, args):
    d = (math.sin((t + x) * float(args["speed"])) + 1) / 2
    col = colorsys.hsv_to_rgb(d, float(args["saturation"]), float(args["value"]))
    return col

def totalSinWave(x, t, args):
    d = (math.sin(t  * float(args["speed"])) + 1) / 2
    col = colorsys.hsv_to_rgb(d, float(args["saturation"]), float(args["value"]))
    return col

def defaultAnim(x, t, args):
    return (0.5, 0.5, 0.5)

def constantColour(x, t, args):
    return args["colour"]