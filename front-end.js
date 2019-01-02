function rgbToHex(r, g, b) {
    return "#" + Math.floor(r * 255).toString(16) + Math.floor(g * 255).toString(16) + Math.floor(b * 255).toString(16)
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function updateScroll() {
    consoleOutput.scrollTop = consoleOutput.scrollHeight
}

function updateLog(action, text) {
    consoleOutput.innerHTML += action + " " + text + "<br>"
    updateScroll()
}

function makeNewStatus() {
    var newColour = hexToRGB(colourPicker.value)

    var status = {
        "colour": 
        {
            "red": (newColour.r / 255),
            "green": (newColour.g / 255),
            "blue": (newColour.b / 255)
        },
        "brightness": brightnessControl.value
    }
    return status
}

function updateServer() {
    var newStatus = makeNewStatus()
    PcktHandler.postMessage(["SEND", newStatus])
    updateLog("SENT", "POST " + JSON.stringify(newStatus))
}

function updateClient() {
    PcktHandler.postMessage(["LOAD"])
    updateLog("SENT", "GET")
}

var colourPicker = document.getElementById("colourPicker")
var brightnessControl = document.getElementById("brightness")
var consoleOutput = document.getElementById("consoleOutput")

var PcktHandler = new Worker("PacketHandler.js")

updateClient()

colourPicker.addEventListener("input", updateServer)
brightnessControl.addEventListener("input", updateServer)

PcktHandler.onmessage = function(msg) {
    var message = msg.data
    if (message[0] == "RCVD-GET") {
        var newStatus = message[1]
        colourPicker.value = rgbToHex(newStatus.colour.red, newStatus.colour.green, newStatus.colour.blue)
        brightnessControl.value = newStatus.brightness
        updateLog(message[0], JSON.stringify(message[1]))
    } else if (message[0] == "RCVD-POST") {
        updateLog(message[0], message[1])
    } else {
        updateLog("ERR", "Message type not supported: " + message[0])
    }
}
