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
    if (needsUpdate) {
        var newStatus = makeNewStatus()
        PcktHandler.postMessage(["SEND", newStatus])
        updateLog("SENT", "POST " + JSON.stringify(newStatus))
        needsUpdate = false
    }
}

function updateClient() {
    PcktHandler.postMessage(["LOAD"])

    updateLog("SENT", "GET")
}

function flagChange() {
    needsUpdate = true
}

function messageResponder(msg) {
    var message = msg.data
    if (message[0] == "RCVD-GET") {
        var newStatus = message[1]
        var lightData = newStatus.lights
        colourPicker.value = rgbToHex(lightData.colour.red, lightData.colour.green, lightData.colour.blue)
        brightnessControl.value = lightData.brightness
        cpuMeter.innerText = newStatus.CPU + "%"
        ramMeter.innerText = JSON.stringify(newStatus.RAM)
        cpuTempMeter.innerText = newStatus.TEMP
        updateLog(message[0], JSON.stringify(message[1]))

    } else if (message[0] == "RCVD-POST") {
        updateLog(message[0], message[1])
    } else if (message[0] == "ERR") {
        updateLog(message[0], message[1])
    } else {
        updateLog("ERR", "Message type not supported: " + message[0])
    }
}