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


    def run(self):
        self.checkForUpdates()
        if not self.shouldStop:
            for pixelNum in range(self.numpixels):
                colour = self.animation(pixelNum, self.waitTime)
                r = int(colour["red"] * 255)
                g = int(colour["green"] * 255)
                b = int(colour["blue"] * 255)
                self.strip.setPixelColor(pixelNum, g, r, b)
            self.strip.show()
            time.sleep(self.waitTime)
            self.run()

    def checkForUpdates(self):
        if self.instructionQueue.qsize() != 0:
            instruction = self.instructionQueue.get()
            print(instruction)
            if instruction[0] == "UPANIM":
                self.animation = instruction[1]
            elif instruction[0] == "CHANGESPEED":
                self.waitTime = 1 / instruction[1]
            elif instruction[0] == "STOP":
                self.shouldStop = True
                self.stop()
    
    def stop(self):
        print("STOPPING")
        self.strip.clear()
        self.strip.show()
        self.strip.close()
        self.join()
                
