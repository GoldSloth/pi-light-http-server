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
                "red": 0.5,
                "green": 0.5,
                "blue": 0.5
            },
            "brightness": 0.5
        }

    def getState(self):
        return self.state

    def setState(self, state):
        self.state = state

    def update(self):
        for pixel in range(self.numpixels):
            self.lstrip.setPixelColor(pixel, int(self.state["colour"]["red"] * 255), int(self.state["colour"]["green"] * 255), int(self.state["colour"]["blue"] * 255))
        self.lstrip.show()

    def stop(self):
        self.lstrip.clear()
        self.lstrip.show()
        self.lstrip.close()