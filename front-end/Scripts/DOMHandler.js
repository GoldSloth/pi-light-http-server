class DOMHandler {
    constructor() {
        // Connection box
        this.urlEntry = document.getElementById("ipInput") // Input
        this.urlSubmit = document.getElementById("connectButton") // Button
        this.connectionStatus = document.getElementById("connectionStatus") // Output

        // Animations box
        this.animationSelector = document.getElementById("animationSelector") // Input
        this.animationRefreshInput = document.getElementById("refreshRateSelection") // Input

        // Arguments box
        this.argumentsContainer = document.getElementById("argContainer") // Container

        this.inputStatus = {}

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

    _furnishAnimations(animationData) {
        this._removeChildren(this.animationSelector)
        for (var animation in animationData) {
            let x = document.createElement("option")
            x.value = animation
            x.innerText = animationData[animation].title
            this.animationSelector.appendChild(x)
        }
    }

    _furnishArguments(aData) {
        let currentAnimation = this.animationSelector.value
        let args = aData[currentAnimation].arguments
        this._removeChildren(this.argumentsContainer)
        for (const [key, value] of Object.entries(args)) {
            let f = document.createElement("form")
            let l = document.createElement("label")
            l.innerText = value.name
            let i = document.createElement("input")
            i.type = this.fieldRelations[value.type]
            if (i.type == "range") {
                i.min = value.min
                i.max = value.max
                i.step = 0.001
            }

            i.value = aData[currentAnimation].defaultArgs[key]
            console.log(aData[currentAnimation].defaultArgs[key])

            f.appendChild(l)
            f.appendChild(i)

            this.argumentsContainer.appendChild(f)
        }
    }
}