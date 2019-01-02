var needsUpdate = false
var firstChange = true

var colourPicker = document.getElementById("colourPicker")
var brightnessControl = document.getElementById("brightness")
var consoleOutput = document.getElementById("consoleOutput")

var PcktHandler = new Worker("PacketHandler.js")

colourPicker.addEventListener("input", flagChange)
brightnessControl.addEventListener("input", flagChange)

PcktHandler.onmessage = messageResponder

updateClient()

var cUpdate = window.setInterval(updateClient, 2000)
var sUpdate = window.setInterval(updateServer, 100)
