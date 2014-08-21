import socket

from os import system
from time import sleep

# expects servod to be running already (e.g. via /etc/init.d/servoblaster)

# for servod configuration and usage instructions, please see:
# https://github.com/richardghirst/PiBits/blob/master/ServoBlaster/README.txt

HOST = "0.0.0.0" # receive from any address
PORT = 50000

BUFSIZE = 1024 # maximum amount of data to be received at once

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

while True:
    data, addr = sock.recvfrom(BUFSIZE)
    if data == "stop": # stop the server
        break
    elif data.isdigit(): # set the servo
        system("echo 2=" + data + " > /dev/servoblaster")
        sleep(0.1)
        system("echo 2=0 > /dev/servoblaster")
