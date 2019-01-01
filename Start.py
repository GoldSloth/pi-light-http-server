from LightHandler import LightStrip
from Server import *

global numPixels
numPixels = 30

global lights
lights = LightStrip(numpixels = numPixels)

run()