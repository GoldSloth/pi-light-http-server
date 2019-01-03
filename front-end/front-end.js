var needsUpdate = false
var firstChange = true

var colourPicker = document.getElementById("colourPicker")
var brightnessControl = document.getElementById("brightness")
var consoleOutput = document.getElementById("consoleOutput")
var cpuMeter = document.getElementById("cpuUsage")
var ramMeter = document.getElementById("ramUsage")
var cpuTempMeter = document.getElementById("cpuTemp")

var PcktHandler = new Worker("PacketHandler.js")

colourPicker.addEventListener("input", flagChange)
brightnessControl.addEventListener("input", flagChange)

PcktHandler.onmessage = messageResponder

updateClient()

var cUpdate = window.setInterval(updateClient, 500)
var sUpdate = window.setInterval(updateServer, 60)
