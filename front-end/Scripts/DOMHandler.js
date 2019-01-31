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
        this.animationData = {}

        this.refreshIsChanged = true;
        this.brightnessIsChanged = true;
        this.animationIsChanged = true;

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
    }

    _removeChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
    }

    _furnishAnimations() {
        if (!isEmpty(this.animationData)) {
            console.log("eek")
            this._removeChildren(this.animationSelector)
            for (var animation in this.animationData) {
                let x = document.createElement("option")
                x.value = animation
                x.innerText = this.animationData[animation].title
                this.animationSelector.appendChild(x)
            }
        }
    }

    _furnishArguments() {
        if (!isEmpty(this.animationData)) {
            let currentAnimation = this.animationSelector.value
            let args = this.animationData[currentAnimation].arguments
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

                i.value = this.animationData[currentAnimation].defaultArgs[key]

                this.argumentFields[key] = i

                f.appendChild(l)
                f.appendChild(i)

                this.argumentsContainer.appendChild(f)
            }
        }
    }
    // Should be called on initialisation => Connection to server
    updatePage() {
        this._furnishAnimations()
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

    // Should be called to update the inputStatus property of the object
    updateData() {
        this.inputStatus = {}
        for (var key in this.argumentFields) {
            let value = this.argumentFields[key]
            this.inputStatus[key] = value.value
        }
    }
}