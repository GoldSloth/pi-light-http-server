from dotstar import Adafruit_DotStar

class LightStrip:
    def __init__(self, numpixels=30):
        self.numpixels = numpixels
        self.lstrip = Adafruit_DotStar(numpixels, 12000000)
        self.lstrip.begin()

        self.brightness = 16

        self.lstrip.setBrightness(self.brightness)

        self.state = {
            "colour": {
                "red": 0.0,
                "green": 0.0,
                "blue": 0.0
            },
            "brightness": 0.0
        }

        self.changed = False

    def getState(self, imp):
        if self.changed or imp:
            return self.state
        else:
            return False

    def setState(self, state):
        self.state = state
        self.changed = True

    def update(self):
        for pixel in range(self.numpixels):
            self.lstrip.setPixelColor(pixel, int(float(self.state["colour"]["green"]) * 255), int(float(self.state["colour"]["red"]) * 255), int(float(self.state["colour"]["blue"]) * 255))
        
        self.lstrip.setBrightness(int(float(self.state["brightness"]) * 255))
        self.lstrip.show()

    def stop(self):
        self.lstrip.clear()
        self.lstrip.show()
        self.lstrip.close()