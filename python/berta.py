import socket
import os
from time import sleep

#UDP_IP = "192.168.2.190"
UDP_IP = "0.0.0.0" # Listen to all adresses
UDP_PORT = 50000

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.bind((UDP_IP, UDP_PORT))

os.system("sudo /home/pi/PiBits/ServoBlaster/user/servod") # init ServoBlaster

while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    if data=="shutdown": # Shutdown PI from Android app
        os.system("sudo shutdown now")
    if data.isdigit(): # Set servo to position
        print "Set servo to:", data
        os.system("echo 'Set servo to ...' | wall")
        os.system("echo 2="+data+" > /dev/servoblaster")
        sleep(0.1)
        os.system("echo 2=0 > /dev/servoblaster")