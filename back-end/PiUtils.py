import os
import psutil

def getTemp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return str(temp).replace("temp=","")


def getRAM():
    result = os.popen('free').readlines()
    rmem = str(result[1])
    rswap = str(result[2])
    return {"mem": rmem, "swap": rswap}


def getCPU():
    return(psutil.cpu_percent())
