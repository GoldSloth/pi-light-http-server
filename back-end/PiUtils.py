import os

def getTemp():
    temp = os.popen("vcgencmd measure_temp").readlines()
    return str(list(temp.replace("temp=","")[0]))


def getRAM():
    result = os.popen('free').readlines()
    rmem = str(result[1])
    rswap = str(result[2])
    return {"mem": rmem, "swap": rswap}


def getCPU():
    return(str(os.popen("top -n1 | awk '/Cpu\(s\):/ {print}'").readline().strip()))
