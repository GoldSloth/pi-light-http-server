import os
import psutil

def condenseString(x, target):
    out = ""
    tfound = False
    for char in x:
        if char == target:
            if not tfound:
                out += char
                tfound = True
        else:
            out += char
            tfound = False
    return out


def getTemp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return str(temp).replace("temp=","")


def getRAM():
    result = os.popen('free').readlines()
    mem = str(result[1]).replace("\n", "")[5:]
    swap = str(result[2]).replace("\n", "")[6:]
    rmem = condenseString(mem, " ")
    rswap = condenseString(swap, " ")
    rimem = rmem.split(" ")
    riswap = rswap.split(" ")
    print(list(rmem))
    return {"mem": rimem, "swap": riswap}


def getCPU():
    return(psutil.cpu_percent())
