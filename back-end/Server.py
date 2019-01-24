from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from PiUtils import *
from LightThreadWorker import LightWorker

class Server(BaseHTTPRequestHandler):
    def __init__(self, lights, animations, instructions,*args):
        self.lights = lights
        self.animations = animations
        self.args = {}
        self.instructionQueue = instructions
        self.currentProgram = ""
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
        ns = self.args
        ns = ""
        ne = {"arguments": ns, "CPU": getCPU(), "RAM": getRAM(), "TEMP": getTemp(), "PROGRAM": self.currentProgram}
        if self.path.endswith("fetchAnimations"):
            ne["animations"] = self.animations

        rn = json.dumps(ne)
        self.wfile.write(rn.encode("UTF-8"))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode("UTF-8")

        self._set_headers()
        try:
            retData = json.loads(post_data[7:])

            status = ""
            if post_data[0:7] == "SETPROG":
                if retData["newProg"] in self.animations:
                    self.currentProgram = retData["newProg"]
                    self.instructionQueue.put(("UPANIM", self.animations[retData["newProg"]["func"]], self.args))
                    status = "OK"  
            elif post_data[0:7] == "SETARGS":
                self.instructionQueue.put(("CHANGEARGS", retData))
                status = "OK"
            elif post_data[0:7] == "SETRFSH":
                self.instructionQueue.put(("CHANGERFSH", int(retData["refresh"])))
            else:
                status = "BAD"
        except:
            status = "Data Invalid"
        self.wfile.write(status.encode("UTF-8"))

def run(instructions, animations, defaultAnim, server_class=HTTPServer, port=8000):
    lights = LightWorker(instructions, defaultAnim, 60)
    lights.start()
    def makeHandler(*args):
        Server(lights, animations, instructions,*args)
    server_address = ('', port)
    httpd = server_class(server_address, makeHandler)
    print('Starting httpd...')
    try:
        httpd.serve_forever()
    except:
        httpd.server_close()
        print("Closing server")
        instructions.put(("STOP", None))
