import math
import colorsys

def clamp(min_val, value, max_val): return min(max(min_val, value), max_val)

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

def hoveringColour(x, t, args):
    d = (math.sin((t + x) * float(args["speed"])) * float(args["variation"]))
    r, g, b = args["colour"]
    col = list(colorsys.rgb_to_hsv(r, g, b))
    col[0] += d
    col[0] = clamp(0, col[0], 255)
    col[1] = clamp(0, col[1], 255)
    col[2] = clamp(0, col[2], 255)

    h, s, v = col
    return colorsys.hsv_to_rgb(h, s, v)