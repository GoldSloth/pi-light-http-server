function rgbToHex(r, g, b) {
    let re = Math.floor(r * 255).toString(16).padStart(2, "0")
    let ge = Math.floor(g * 255).toString(16).padStart(2, "0")
    let be = Math.floor(b * 255).toString(16).padStart(2, "0")
    return "#" + re + ge + be
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
