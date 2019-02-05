class PacketHandler {
    constructor() {
        this.ip = ""
        this.lastProgram = ""
    }

    linkPageHandler(PageHandler) {
        this.PageHandler = PageHandler
    }

    start(ip) {
        this.ip = ip
        let request = new XMLHttpRequest()
        request.open("GET", this.ip+"/fetchAnimations", false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.send()

        if (request.status == 200) {
            let status = JSON.parse(request.responseText)
            console.log(request.responseText)
            this.PageHandler.animations = status["animations"]
            this.PageHandler.updatePage(status["program"])
            this.lastProgram = status["program"]
            this.PageHandler.updateProgram(status["program"])
            this.PageHandler.updateArgs(status["arguments"])
        }

        // setInterval(this._getData.bind(this), 2000)
        setInterval(this._sendData.bind(this), 500)
    }

    _sendData() {
        if (this.PageHandler.animationIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETPROG"+JSON.stringify({"newProg": this.PageHandler.currentAnimation}))
            this.PageHandler.animationIsChanged = false
        }

        if (this.PageHandler.refreshIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETRFSH"+JSON.stringify({"refresh": this.PageHandler.refreshRate}))
            this.PageHandler.refreshIsChanged = false
        }

        if (this.PageHandler.brightnessIsChanged) {
            let request = new XMLHttpRequest()
            request.open("POST", this.ip, false)
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
            request.setRequestHeader("Content-Type", "text/plain")
            request.send("SETBRIT"+JSON.stringify({"brightness": this.PageHandler.brightness}))
            this.PageHandler.brightnessIsChanged = false
        }
        this.PageHandler.updateData()
        let request = new XMLHttpRequest()
        request.open("POST", this.ip, false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.setRequestHeader("Content-Type", "text/plain")
        request.send("SETARGS"+JSON.stringify(this.PageHandler.inputStatus))
        this.PageHandler.brightnessIsChanged = false
    }

    _getData() {
        let request = new XMLHttpRequest()
        request.open("GET", this.ip, false)
        request.setRequestHeader("Access-Control-Allow-Origin", "*")
        request.send()

        if (request.status == 200) {
            let status = JSON.parse(request.responseText)
            this.PageHandler.animationData = status
            if (status["program"] != this.lastProgram) {
                this.PageHandler.updateProgram(status["program"])
            }
            this.PageHandler.updateArgs(status["arguments"])
            this.lastProgram = status["program"]
        }
    }
}