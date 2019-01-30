let dh = new DOMHandler()
let test = {
    "mSinWave": {
        "title": "Moving sin wave",
        "arguments": {
            "speed": {
                "name": "Speed",
                "type": "number",
                "min": 0.001,
                "max": 10,
            },
            "saturation": {
                "name": "Saturation",
                "type": "number",
                "min": 0,
                "max": 1,
            },
            "value": {
                "name": "Value",
                "type": "number",
                "min": 0,
                "max": 1,
            }
        },
        "defaultArgs": {
            "speed": 0.05,
            "saturation": 1,
            "value": 1
        }
    },
    "tSinWave": {
        "title": "Whole strip sin wave",
        "arguments": {
            "speed": {
                "name": "Speed",
                "type": "number",
                "min": 0.001,
                "max": 10,
            },
            "saturation": {
                "name": "Saturation",
                "type": "number",
                "min": 0,
                "max": 1,
            },
            "value": {
                "name": "Value",
                "type": "number",
                "min": 0,
                "max": 1,
            }
        },
        "defaultArgs": {
            "speed": 0.05,
            "saturation": 1,
            "value": 1
        }
    },
    "constantColour": {
        "title": "Constant Colour",
        "arguments": {
            "colour": {
                "type": "colour",
                "name": "Colour"
            }
        },
        "defaultArgs": {
            "colour": (0.5, 0.5, 0.5)
        }
    }
}

dh.animationData = test
console.log(dh)
dh.updatePage()