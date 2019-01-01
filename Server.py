from http.server import BaseHTTPRequestHandler, HTTPServer
from LightHandler import LightStrip

class Server(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super(Server, self).__init__(*args, **kwargs)
        global lights
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        self.wfile.write(str(lights.getState()).encode("UTF-8"))
        
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode("UTF-8")
        print(post_data)

        self._set_headers()
        if post_data[0:2] == "SET":
            lights.setState(dict(post_data[3:]))
            lights.update()
            self.wfile.write("STATUS OK".encode("UTF-8"))
        else:
            self.wfile.write("BAD STATUS".encode("UTF-8"))
        
def run(server_class=HTTPServer, handler_class=Server, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd...')
    try:
        httpd.serve_forever()
    except:
        httpd.server_close()
        print("Closing server")
        lights.stop()
