class PacketHandler {
    constructor(PageHandler) {
        this.PageHandler = PageHandler
        this.ip = ""
        this.lastProgram = ""
    }

    start(ip) {
        this.ip = ip
        let request = new XMLHttpRequest()
        request.open("GET", this.ip+"/fetchanimations", false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.send()

        if (request.status = 200) {
            let status = JSON.parse(request.responseText)
            PageHandler.animationData = status["animations"]
            PageHandler.updatePage()
            this.lastProgram = status["program"]
            PageHandler.updateProgram(status["program"])
            PageHandler.updateArgs(status["arguments"])
        }

        window.setInterval(500, this._getData.bind(this))
        window.setInterval(500, this._setData.bind(this))
    }

    _sendData() {
        if (PageHandler.animationIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETPROG"+JSON.stringify({"newProg": PageHandler.currentAnimation}))
            PageHandler.animationIsChanged = false
        }

        if (PageHandler.refreshIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETRFSH"+JSON.stringify({"refresh": PageHandler.refreshRate}))
            PageHandler.refreshIsChanged = false
        }

        if (PageHandler.brightnessIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETBRIT"+JSON.stringify({"brightness": PageHandler.brightness}))
            PageHandler.brightnessIsChanged = false
        }

        let request = new XMLHttpRequest()
        request.open("POST", this.ip, false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.setRequestHeader("Content-Type", "text/plain")
        request.send("SETARGS"+JSON.stringify(PageHandler.inputStatus))
        PageHandler.brightnessIsChanged = false
    }

    _getData() {
        let request = new XMLHttpRequest()
        request.open("GET", this.ip, false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.send()

        if (request.status = 200) {
            let status = JSON.parse(request.responseText)
            PageHandler.animationData = status
            if (status["program"] != this.lastProgram) {
                PageHandler.updateProgram(status["program"])
            }
            PageHandler.updateArgs(status["arguments"])
            this.lastProgram = status["program"]
        }
    }
}