# com.playgroundberlin.berta.udp

This plugin provides a UDP client interface, which allows applications to send
UDP requests, e.g. in order to communicate with other hardware devices on the
local network (such as a Raspberry Pi).

## Installation

    plugman install --platform android --project ../../android --plugin .

## Supported Platforms

- Android

## Objects (Read-Only)

- UDPClient

## UDPClient

A `UDPClient` instance can be used to send UDP packets to a specified
destination.

### Properties

- __address__: A host name or IP address. _(String)_
- __port__: A port number. _(Number)_

### Example

    var client = new UDPClient('192.168.42.10', 50000);
    client.send('120');
    client.send('stop');
