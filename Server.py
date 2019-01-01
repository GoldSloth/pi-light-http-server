from http.server import BaseHTTPRequestHandler, HTTPServer
from ast import literal_eval

class Server(BaseHTTPRequestHandler):
    def __init__(self, lights, *args):
        self.lights = lights
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
        self.wfile.write(str(self.lights.getState()).encode("UTF-8"))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode("UTF-8")
        print(post_data)

        self._set_headers()
        if post_data[0:3] == "SET":
            self.lights.setState(literal_eval(post_data[3:]))
            self.lights.update()
            self.wfile.write("STATUS OK".encode("UTF-8"))
        else:
            self.wfile.write("BAD STATUS".encode("UTF-8"))

def run(lights, server_class=HTTPServer, port=8000):
    def makeHandler(*args):
        Server(lights, *args)
    server_address = ('', port)
    httpd = server_class(server_address, makeHandler)
    print('Starting httpd...')
    try:
        httpd.serve_forever()
    except:
        httpd.server_close()
        print("Closing server")
        lights.stop()
