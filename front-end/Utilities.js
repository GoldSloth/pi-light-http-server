function rgbToHex(r, g, b) {
    let re = Math.floor(r * 255).toString(16).padStart(2, "0")
    let ge = Math.floor(g * 255).toString(16).padStart(2, "0")
    let be = Math.floor(b * 255).toString(16).padStart(2, "0")
    return "#" + re + ge + be
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
    if (needsUpdate) {
        var newStatus = makeNewStatus()
        PcktHandler.postMessage(["SEND", newStatus])
        updateLog("SENT", "POST " + JSON.stringify(newStatus))
        needsUpdate = false
    }
}

function updateClient() {
    if (firstChange) {
        PcktHandler.postMessage(["FLOAD"])
        firstChange = false
    } else {
        PcktHandler.postMessage(["LOAD"])
    }
    updateLog("SENT", "GET")
}

function flagChange() {
    needsUpdate = true
}

function messageResponder(msg) {
    var message = msg.data
    if (message[0] == "RCVD-GET") {
        var newStatus = message[1]
        if (newStatus != "c") {
            colourPicker.value = rgbToHex(newStatus.colour.red, newStatus.colour.green, newStatus.colour.blue)
            brightnessControl.value = newStatus.brightness
            updateLog(message[0], JSON.stringify(message[1]))
        } else {
            updateLog(message[0], "NO CHANGE")
        }
    } else if (message[0] == "RCVD-POST") {
        updateLog(message[0], message[1])
    } else if (message[0] == "ERR") {
        updateLog(message[0], message[1])
    } else {
        updateLog("ERR", "Message type not supported: " + message[0])
    }
}