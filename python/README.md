# Berta - Hardware Control through a Raspberry Pi

A Raspberry Pi is used to control an attached servomotor turning a "compass needle" and lead people during the tour. The Berta Android app communicates with the Pi through a simple protocol over UDP.

## Prerequisites

- [Python](https://www.python.org/) (should be available on your Pi out-of-the-box)
- [ServoBlaster](https://github.com/richardghirst/PiBits/tree/master/ServoBlaster) (to drive servos from the Pi via its GPIO pins)

## Running

To start the server, simply run the included python script:

    python berta.py

## Commands

The server understands the following commands sent via UDP:

- `<integer>`: set the attached servo to this value
- `stop`: stops the server
