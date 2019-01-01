function updatePage() {
    console.log(this.responseText)
}

var request = new XMLHttpRequest()

request.addEventListener("load", updatePage)
request.open("GET", "http://192.168.1.75:8000")
request.setRequestHeader("Access-Control-Allow-Origin", "*")
request.send()