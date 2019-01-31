dh = new DOMHandler()
ph = new PacketHandler()
dh.linkConnectionHandler(ph)
ph.linkPageHandler(dh)
