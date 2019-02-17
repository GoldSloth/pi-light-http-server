from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from PiUtils import *
from LightThreadWorker import LightWorker
from LightState import LightState

class StoppableHTTPServer(HTTPServer):
    def serve_forever(self):
        self.stop = False
        while not self.stop:
            self.handle_request()
        raise KeyboardInterrupt


class CustomHandler(BaseHTTPRequestHandler):
    def __init__(self, lights, animations, instructions, ls, *args):
        # Important: A new handler is created for every request.
        self.lights = lights
        self.animations = animations
        self.instructionQueue = instructions
        self.ls = ls
        # *laughs in pass by reference*
        super().__init__(*args)
        
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        self._set_headers()
        ne = {
            "arguments": self.ls.args,
            "CPU": getCPU(),
            "RAM": getRAM(),
            "TEMP": getTemp(),
            "program": self.ls.program,
            "brightness": self.ls.brightness,
            "refresh": self.ls.refreshRate
        }
        if self.path.endswith("fetchAnimations"):
            ne["animations"] = self.animations

        rn = json.dumps(ne, default= lambda o: '<->')
        self.wfile.write(rn.encode("UTF-8"))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode("UTF-8")

        self._set_headers()
        try:
            retData = json.loads(post_data[7:])
            verb = post_data[0:7]
            status = ""
            if verb == "SETPROG":
                if retData["newProg"] in self.animations:
                    self.ls.program = retData["newProg"]
                    self.ls.args = self.animations[retData["newProg"]]["defaultArgs"]
                    self.instructionQueue.put(
                        ("UPANIM", self.animations[retData["newProg"]]["func"], self.ls.args)
                    )
                    status = "OK"  
                else:
                    status = "INVALID PROGRAM"
            elif verb == "SETARGS":
                self.instructionQueue.put(
                    ("CHANGEARGS", retData)
                )
                self.ls.args = retData
                status = "OK"
            elif verb == "SETRFSH":
                self.instructionQueue.put(
                    ("CHANGERFSH", int(retData["refresh"]))
                )
                self.ls.refreshRate = int(retData["refresh"])
            elif verb == "SETBRIT":
                self.instructionQueue.put(
                    ("CHANGEBRIT", int(retData["brightness"]))
                )
                self.ls.brightness = int(retData["brightness"])
            elif verb == "STOPSRV":
                self.server.stop = True
            else:
                status = "BAD"
        except:
            status = "Data Invalid"
        self.wfile.write(status.encode("UTF-8"))

def run(instructions, animations, defaultAnim, server_class=StoppableHTTPServer, port=8000):
    # Some funny buisiness with defining everything here, but sure.
    lights = LightWorker(instructions, defaultAnim, 60)
    lights.start()
    ls = LightState(program="default")
    def makeHandler(*args):
        CustomHandler(lights, animations, instructions, ls, *args)
    server_address = ('', port)
    httpd = server_class(server_address, makeHandler)
    print('Starting httpd...')
    try:
        httpd.serve_forever()
    except:
        httpd.server_close()
        print("Closing server")
        instructions.put(("STOP", None))
