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

var colourPicker = document.getElementById("colourPicker")
var brightness = document.getElementById("brightness")
var consoleOutput = document.getElementById("consoleOutput")

function updatePage() {
    resp = this.responseText.replace(/'/g, "\"")
    consoleOutput.innerHTML += "Recieved packet: " + resp
    console.log(resp)
    var status = JSON.parse(resp)
    console.log(status)
    colourPicker.value = rgbToHex(status.colour.red, status.colour.green, status.colour.blue)
    brightness.value = status.brightness
}

function sendPacket(status) {
    var req = new XMLHttpRequest()
    console.log(JSON.stringify(status))
    req.addEventListener("load", updateLog)
    req.open("POST", "http://192.168.1.75:8000")
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.setRequestHeader("Content-Type", "text/plain")
    req.send("SET"+JSON.stringify(status))
}

function updateLog() {
    consoleOutput.innerHTML += "Recieved" + this.responseText
}

function changeStatus() {
    var newColour = hexToRgb(colourPicker.value) 
    console.log(JSON.stringify(status))
    var status = {
        "colour": 
        {
            "red": (newColour.r / 255),
            "green": (newColour.g / 255),
            "blue": (newColour.b / 255)
        },
        "brightness": brightness.value
    }
    console.log(JSON.stringify(status))
    sendPacket(status)
}

var request = new XMLHttpRequest()

request.addEventListener("load", updatePage)
request.open("GET", "http://192.168.1.75:8000")
request.setRequestHeader("Access-Control-Allow-Origin", "*")
request.send()

