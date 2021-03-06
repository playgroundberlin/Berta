# Berta - Der kleene Musikkompass

## [Prerequisites](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide_install_cordova_shell_tools)

Berta is built using [Apache Cordova](http://cordova.apache.org/). For development, there are a few things you'll need.

- Requires Java JDK 1.5 or greater
- Apache Ant 1.8.0 or greater
- Download and install [Android SDK](http://developer.android.com/sdk/index.html)
- Download and install [ADT Plugin](http://developer.android.com/tools/sdk/eclipse-adt.html)
- Download a copy of the [Cordova Android Developer Tools](https://github.com/apache/cordova-android/releases)

These can be checked using `./bin/check_reqs` from the cordova-android developer tools directory.

*For detailed information, see Cordova's [Android Platform Guide](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_index.md.html#Platform%20Guides_android).*

*Hint: You may have to `export ANDROID_HOME="/path/to/android-sdk"` or add a `local.properties` file with `sdk.dir=/path/to/android-sdk` to the `android/` and `android/CordovaLib` folders.*

## [Building](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_tools.md.html#Android%20Shell%20Tool%20Guide_build)

To build the application, run:

    ./cordova/build [--debug|--release]

## [Running](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_tools.md.html#Android%20Shell%20Tool%20Guide_run_the_app)

First, [configure an emulator](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide_configure_an_emulator), e.g. running `android avd` from the command-line or open the Android SDK Manager from within Eclipse or IntelliJ IDEA.

To run a on a device or a configured emulator, use:

    ./cordova/run [--device|--emulator|--target=<TARGET-ID>] [--debug|--release|--nobuild]

*Hint: The emulator window can be rotated to landscape mode and back by pressing `Ctrl + F12`.*

## Debugging

### Using Google Chrome Developer Tools

1. Launch the application via `./cordova/run --debug`
2. In Google Chrome, open [chrome://inspect/#devices](chrome://inspect/#devices)
3. Select your application to open the Chrome DevTools

### Emulator and Android Device Monitor

1. Launch your application (using emulator)
2. Launch the [Android Device Monitor (DDMS)](http://developer.android.com/tools/debugging/ddms.html)
3. Select your device/emulator
4. Go to "Emulator Control"
5. Here you can send location events etc.

### Using the Emulator Console

1. Launch your application (using emulator)
2. Connect to the console: `telnet localhost 5554`
3. For a a list of available commands, type `help` and/or see the [online documentation](http://developer.android.com/tools/devices/emulator.html#console)

For one-off commands to the emulator console, you can use `netcat`, e.g.:

    echo "geo fix 13.3982 52.55462" | nc localhost 5554

## More

The Cordova developer tools support a few more useful commands:

    ./cordova/log     # streams device or emulator logs to STDOUT
    ./cordova/clean   # cleans the project
    ./cordova/version # returns the cordova-android version of the current project

You can refer to the [cordova-android readme](https://github.com/apache/cordova-android/blob/master/README.md) for further explanation.

## Plugins

Additional Cordova plugins can be added using [Plugman](http://cordova.apache.org/docs/en/3.5.0/plugin_ref_plugman.md.html#Using%20Plugman%20to%20Manage%20Plugins).

    plugman install --platform android --project . --plugin <PLUGIN-NAME>

The following plugins are installed and used by Berta:

    org.apache.cordova.console
    org.apache.cordova.geolocation
    org.apache.cordova.device-orientation
    org.apache.cordova.media

These local plugins are used as well:

    ../plugins/udp
    ../plugins/insomnia

## Upgrading

Here's a guide on [how to upgrade Android projects from older versions of Cordova](http://cordova.apache.org/docs/en/3.5.0/guide_platforms_android_upgrade.md.html#Upgrading%20Android).

## License
