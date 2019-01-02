function sendGET() {
    var request = new XMLHttpRequest()

    request.open("GET", "http://192.168.1.75:8000", false)
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.send()

    if (request.status == 200) {
        return JSON.parse(request.responseText)
    }
}

function sendPOST(data) {
    var req = new XMLHttpRequest()
    req.open("POST", "http://192.168.1.75:8000", false)
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.setRequestHeader("Content-Type", "text/plain")
    req.send("SET"+JSON.stringify(data))

    if (req.status == 200) {
        return req.responseText
    }
}

var lastPktTime = performance.now() - 101
var needsUpdate = false

function handlePacket(message) {
    if (message[0] == "LOAD") {
        postMessage(["RCVD-GET", sendGET()])
    } else if (message[0] == "SEND") {
        postMessage(["RCVD-POST", sendPOST(message[1])])
    }
}

onmessage = function(msg) {
    var message = msg.data
    if (performance.now() - lastPktTime > 100) {
        handlePacket(message)
    } else if (needsUpdate) {
        needsUpdate = false
        while (performance.now() - lastPktTime < 100) {
            // 
        }

        handlePacket(message)
    } else {
        needsUpdate = true
    }

    lastPktTime = performance.now()
}
