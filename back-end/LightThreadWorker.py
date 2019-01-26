from dotstar import Adafruit_DotStar
import threading
import time
import sys

class LightWorker(threading.Thread):
    def __init__(self, instructions, animation, updateFrequency):
        super().__init__()
        self.numpixels = 30
        self.strip = Adafruit_DotStar(self.numpixels, 12000000)
        self.strip.begin()

        self.animation = animation

        self.waitTime = 1 / updateFrequency

        self.instructionQueue = instructions

        self.shouldStop = False

        self.frame = 0

        self.args = {}

    def run(self):
        while not self.shouldStop:
            self.checkForUpdates()
            for pixelNum in range(self.numpixels):
                colour = self.animation(pixelNum, self.frame, self.args)
                r = int(colour[0] * 255)
                g = int(colour[1] * 255)
                b = int(colour[2] * 255)
                self.strip.setPixelColor(pixelNum, g, r, b)
            self.strip.show()
            self.frame += 1
            time.sleep(self.waitTime)

    def checkForUpdates(self):
        if self.instructionQueue.qsize() != 0:
            instruction = self.instructionQueue.get()
            print(instruction)
            if instruction[0] == "UPANIM":
                self.animation = instruction[1]
                self.args = instruction[2]
            elif instruction[0] == "CHANGERFSH":
                self.waitTime = 1 / instruction[1]
            elif instruction[0] == "CHANGEARGS":
                self.args = instruction[1]
            elif instruction[0] == "STOP":
                self.shouldStop = True
                self.stop()
            elif instruction[0] == "CHANGEBRIT":
                self.strip.setBrightness(instruction[1])
                self.strip.show()
    
    def stop(self):
        print("STOPPING")
        self.strip.clear()
        self.strip.show()
        self.strip.close()
