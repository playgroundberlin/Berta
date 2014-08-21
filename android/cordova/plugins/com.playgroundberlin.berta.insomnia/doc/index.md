# com.playgroundberlin.berta.insomnia

This plugin prevents the device from going to sleep while the application is
running.

## Installation

    plugman install --platform android --project ../../android --plugin .

## Supported Platforms

- Android

### Example

    Insomnia.enable();  // prevent device screen from going to sleep
    Insomnia.disable(); // allow device screen to go to sleep
