class LightState:
    def __init__(self, args={}, program="", refreshRate=30, brightness=255):
        self.args = args
        self.program = program
        self.refreshRate = refreshRate
        self.brightness = brightness