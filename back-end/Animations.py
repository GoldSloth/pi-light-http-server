import math
import colorsys

def progressiveSinWave(x, t):
    d = (math.sin((t + x) / 10) + 1) / 2
    col = colorsys.hsv_to_rgb(d, 1, 1)
    colObj = {"red": col[0], "green": col[1], "blue": col[2]}
    print(colObj)
    return colObj

def totalSinWave(x, t):
    d = (math.sin(t / 1000) + 1) / 2
    col = colorsys.hsv_to_rgb(d, 1, 1)
    return {"red": col[0], "green": col[1], "blue": col[2]}

def defaultAnim(x, t):
    return {"red": 0.5, "green": 0.5, "blue": 0.5}