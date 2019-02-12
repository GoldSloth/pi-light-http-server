function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class DOMHandler {
    constructor() {
        // Connection box
        this.urlEntry = document.getElementById("ipInput") // Input
        this.urlSubmit = document.getElementById("connectButton") // Button
        this.connectionStatus = document.getElementById("connectionStatus") // Output

        // Animations box
        this.animationSelector = document.getElementById("animationSelector") // Input
        this.animationRefreshInput = document.getElementById("refreshRateSelection") // Input
        this.brightnessInput = document.getElementById("brightnessSelection") // Input

        // Arguments box
        this.argumentsContainer = document.getElementById("argContainer") // Container

        this.refreshRate = 30
        this.brightness = 255
        this.animations = {}
        this.status = {}

        this.refreshIsChanged = true;
        this.brightnessIsChanged = true;
        this.animationIsChanged = true;
        this.argumentsAreChanged = true;

        this.currentAnimation = animationSelector.value

        this.animationRefreshInput.addEventListener("input", function() {
            this.refreshIsChanged = true;
            this.refreshRate = this.animationRefreshInput.value
        }.bind(this))

        this.brightnessInput.addEventListener("input", function() {
            this.brightnessIsChanged = true;
            this.brightness = this.brightnessInput.value
        }.bind(this))

        this.animationSelector.addEventListener("input", function() {
            this.animationIsChanged = true
            this.currentAnimation = this.animationSelector.value
            this._furnishArguments()
        }.bind(this))

        this.fieldRelations = {
            "number": "range",
            "colour": "color"
        }

        this.urlSubmit.addEventListener("click", function() {
            this.ConnectionHandler.start(this.urlEntry.value)
        }.bind(this))

        this.argumentsContainer.addEventListener("click", function () {
            this.argumentsAreChanged = true;
            this.updateData()
        }.bind(this))
    }

    linkConnectionHandler(ConnectionHandler) {
        this.ConnectionHandler = ConnectionHandler
    }

    _removeChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
    }

    _furnishAnimations(program) {
        console.log(this.animations)
        if (!isEmpty(this.animations)) {
            this._removeChildren(this.animationSelector)
            for (var animation in this.animations) {
                let x = document.createElement("option")
                x.value = animation
                x.innerText = this.animations[animation].title
                this.animationSelector.appendChild(x)
            }
        }
        this.animationSelector.value = program
        this.currentAnimation = program
    }

    _furnishArguments() {
        let args = this.animations[this.currentAnimation].arguments
        this.argumentFields = {}
        this._removeChildren(this.argumentsContainer)
        for (const [key, value] of Object.entries(args)) {
            let f = document.createElement("form")
            let l = document.createElement("label")
            l.innerText = value.name
            let i = document.createElement("input")
            i.type = this.fieldRelations[value.type]
            i.addEventListener("input", this.updateData.bind(this))
            if (i.type == "range") {
                i.min = value.min
                i.max = value.max
                i.step = 0.001
            }

            i.value = this.animations[this.currentAnimation].defaultArgs[key]

            this.argumentFields[key] = i

            f.appendChild(l)
            f.appendChild(i)

            this.argumentsContainer.appendChild(f)
        }
    }

    // Should be called on initialisation => Connection to server
    updatePage(program) {
        this._furnishAnimations(program)
        this._furnishArguments()
        this.updateData()
    }
    // Should be called by packet handler when data sent back
    updateArgs(data) {
        for (var input in this.argumentFields) {
            if (input in data) {
                this.argumentFields[input].value = data[input]
            }
        }
    }

    updateProgram(newProgram) {
        this.animationSelector.value = newProgram
    }

    // Should be called to update the inputStatus property of the object
    updateData() {
        this.inputStatus = {}
        for (var key in this.argumentFields) {
            let value = this.argumentFields[key]
            if (this.argumentFields[key].type == "color") {
                this.inputStatus[key] = hexToRGB(value.value)
            } else {
                this.inputStatus[key] = value.value
            }
        }
    }
}