function rgbToHex(r, g, b) {
    return "#" + Math.floor(r * 255).toString(16) + Math.floor(g * 255).toString(16) + Math.floor(b * 255).toString(16)
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function updateLog(action, text) {
    consoleOutput.innerHTML += action + " " + text + "<br>"
}

function makeNewStatus() {
    var status = {
        "colour": 
        {
            "red": (newColour.r / 255),
            "green": (newColour.g / 255),
            "blue": (newColour.b / 255)
        },
        "brightness": brightness.value
    }
    return status
}

function updateServer() {
    var newStatus = makeNewStatus()
    PcktHandler.postMessage(["SEND", newStatus])
}

function updateClient() {
    PcktHandler.postMessage(["LOAD"])
}

var colourPicker = document.getElementById("colourPicker")
var brightnessControl = document.getElementById("brightness")
var consoleOutput = document.getElementById("consoleOutput")

var PcktHandler = new Worker("PacketHandler.js")

colourPicker.addEventListener("input", updateServer)
brightnessControl.addEventListener("input", updateServer)

PcktHandler.onmessage = function(message) {
    if (message[0] == "RCVD-GET") {
        var newStatus = message[1]
        colourPicker.value = rgbToHex(newStatus.colour.red, newStatus.colour.green, newStatus.colour.blue)
        brightnessControl.value = newStatus.brightness
        updateLog(message[0], message[1])
    } else if (mesage[0] == "RCVD-POST") {
        updateLog(message[0], message[1])
    } else {
        updateLog("ERR", "Message type not supported: " + message[0])
    }
}
