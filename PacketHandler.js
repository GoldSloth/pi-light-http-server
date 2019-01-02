function sendGET() {
    var request = new XMLHttpRequest()

    request.addEventListener("load", updatePage)
    request.open("GET", "http://192.168.1.75:8000", false)
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.send()

    if (request.status == 200) {
        return request.responseText
    }
}

function sendPOST(data) {
    var req = new XMLHttpRequest()
    req.addEventListener("load", updateLog)
    req.open("POST", "http://192.168.1.75:8000", false)
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.setRequestHeader("Content-Type", "text/plain")
    req.send("SET"+JSON.stringify(status))

    if (request.status == 200) {
        return request.responseText
    }
}

var lastPktTime = performance.now()

function onmessage(message) {
    if (performance.now() - lastPktTime > 500) {
        if (message[0] == "LOAD") {
            postMessage(["RCVD-GET", sendGET()])
        } else if (message[0] == "SEND") {
            postMessage(["RCVD-POST", sendPOST(data)])
        }
    }

    lastPktTime = performance.now()
}
