import os

def getTemp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return str(list(temp.replace("temp=","")[0]))


def getRAM():
    result = str(list(os.popen('free'))[0]).split("\n")
    rmem = result[1]
    rswap = rmem = result[2]
    return {"mem": rmem, "swap": rswap}


def getCPU():
    return(str(os.popen("top -n1 | awk '/Cpu\(s\):/ {print}'").readline().strip()))
