function sendGET() {
    var request = new XMLHttpRequest()
    try {

        request.open("GET", "http://192.168.1.75:8000", false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.send()
        
        if (request.status == 200) {
            return JSON.parse(request.responseText)
        }
    } catch (e) {
        return "ERR"
    }
}

function sendPOST(data) {
    var req = new XMLHttpRequest()
    try {
        req.open("POST", "http://192.168.1.75:8000", false)
        req.setRequestHeader("Access-Control-Allow-Origin", "*")
        req.setRequestHeader("Content-Type", "text/plain")
        req.send("SET"+JSON.stringify(data))

        if (req.status == 200) {
            return req.responseText
        }
    } catch (e) {
        return "ERR"
    }
}

function handlePacket(message) {
    if (message[0] == "LOAD") {
        var resp = sendGET()
        if (resp == "ERR") {
            postMessage(["ERR", "XHR ERROR"])
        } else {
            postMessage(["RCVD-GET", resp])
        }
    } else if (message[0] == "SEND") {
        var resp = sendPOST(message[1])
        if (resp == "ERR") {
            postMessage(["ERR", "XHR ERROR"])
        } else {
            postMessage(["RCVD-POST", resp])
        }
    }
}

onmessage = function(msg) {
    var message = msg.data
    handlePacket(message)
}
