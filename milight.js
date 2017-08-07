module.exports = function (RED) {
    "use strict";

    var Milight = require('node-milight-promise');
    var packageFile = require('./package.json');
    var Color = require('tinycolor2');

    function node(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        // backwards compatibility with previous versions
        if (config.bridgetype == null || config.bridgetype === '') {
            config.bridgetype = 'legacy'
        }
        var light = new Milight.MilightController({
                ip: config.ip,
                delayBetweenCommands: (config.bridgetype !== 'v6') ? 200 : 100,
                commandRepeat: 1,
                type: config.bridgetype,
                broadcastMode: config.broadcast
            }),
            zone = Number(config.zone),
            bulb = config.bulbtype;

        if (config.bridgetype === 'v6') {
            var commands = Milight.commandsV6[bulb];
        }
        else if (bulb === 'white') {
            var commands = Milight.commands[bulb];
        }
        else {
            var commands = Milight.commands2[bulb];
        }

        this.on('input', function (msg) {
            function argsHelper(vargs) {
                var argsArray = [].slice.call(arguments);
                if (config.bridgetype === 'v6' && bulb !== 'bridge') {
                    return [zone].concat(argsArray);
                }
                return argsArray;
            }
            function getSelectedObjectValues(sourceObject, keys) {
                var values = [];
                keys.forEach(function(key) { values.push(sourceObject[key]) });
                return values;
            }

            light.ready().then(function () {
                var command = msg.command ? msg.command : msg.topic;
                if (commands == null) {
                    node.error("Selected combination of bridge type and bulb type is not supported");
                    return;
                }
                if (bulb !== 'white') {
                    switch (msg.payload) {
                        case 'off':
                            light.sendCommands(commands.off(zone));
                            break;
                        case 'on':
                            light.sendCommands(commands.on(zone));
                            break;
                        case 'disco':
                            light.sendCommands(commands.on(zone));
                            for (var x = 0; x < 256; x += 5) {
                                light.sendCommands(
                                    commands.hue.apply(commands, argsHelper(x)));
                                light.pause(100);
                            }
                            break;      
                        case 'modenext':
                            light.sendCommands(commands.on(zone), commands.effectModeNext(zone));
                            break;
                        case 'speed_up':
                            light.sendCommands(commands.on(zone), commands.effectSpeedUp(zone));
                            break;
                        case 'speed_down':
                            light.sendCommands(commands.on(zone), commands.effectSpeedDown(zone));
                            break;
                        case 'white':
                            light.sendCommands(commands.on(zone), commands.whiteMode(zone));
                            break;
                        case 'night':
                            // nightMode command needs to be sent twice with some bulb types
                            light.sendCommands(commands.nightMode(zone), commands.nightMode(zone));
                            break;
                        case 'candleflicker':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 1));
                            }
                            break;
                        case 'rainbowfade':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 2));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 8));
                            }
                            break;
                        case 'whitefade':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 3));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 1));
                            }
                            break;
                        case 'rgbwfade':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 4));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 2));
                            }
                            break;
                        case 'rainbow':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 5));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 3));
                            }
                            break;
                        case 'random':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 6));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 4));
                            }
                            break;
                        case 'redflash':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 7));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 5));
                            }
                            break;
                        case 'greenflash':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 8));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 6));
                            }
                            break;
                        case 'blueflash':
                            if (bulb === 'fullColor') {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 9));
                            } else {
                                light.sendCommands(commands.on(zone), commands.effectMode(zone, 7));
                            }
                            break;
                        default:
                            var value = Number(msg.payload);
                            if (command === 'rgb') {
                                var color = new Color(msg.payload);
                                if (color.isValid()) {
                                    var args = argsHelper.apply(
                                        node,
                                        getSelectedObjectValues(color.toRgb(), ['r', 'g', 'b']));
                                    light.sendCommands(commands.on(zone),
                                        commands.rgb.apply(commands, args));
                                }
                                else {
                                    throw(new Error("Invalid color value: " + msg.payload))
                                }
                            }
                            else if (!isNaN(value)) {
                                if (command === 'brightness')
                                    light.sendCommands(
                                        commands.on(zone),
                                        commands.brightness.apply(commands, argsHelper(value)));
                                else if (command === 'color')
                                    light.sendCommands(
                                        commands.on(zone),
                                        commands.hue.apply(commands, argsHelper(value, true)));
                                else if (command === 'saturation' && bulb === 'fullColor')
                                    light.sendCommands(
                                        commands.on(zone),
                                        commands.saturation(zone, value, true));
                                else if (command === 'temperature' && bulb === 'fullColor')
                                    light.sendCommands(
                                        commands.on(zone),
                                        commands.whiteTemperature(zone, value));      
                            }
                            break;
                    }
                } else {
                    switch (msg.payload) {
                        case 'off':
                            light.sendCommands(commands.off(zone));
                            break;
                        case 'on':
                            light.sendCommands(commands.on(zone));
                            break;
                        case 'bright_up':
                            light.sendCommands(commands.brightUp(zone));
                            break;
                        case 'bright_down':
                            light.sendCommands(commands.brightDown(zone));
                            break;
                        case 'cooler':
                            light.sendCommands(commands.cooler(zone));
                            break;
                        case 'warmer':
                            light.sendCommands(commands.warmer(zone));
                            break;
                        case 'bright_max':
                            light.sendCommands(commands.maxBright(zone));
                            break;
                        case 'night':
                            light.sendCommands(commands.nightMode(zone));
                            break;
                    }
                }
            }).catch(function (error) {
                node.error('Milight error: ' + error);
            });
        });

        this.on('close', function (done) {
            light.close()
                .catch(function (error) {
                    // just log the error as a normal log message 
                    // as it is safe to ignore the error at this point
                    node.log(error)
                })
                .finally(function () {
                    done()
                });
        });
    }

    RED.nodes.registerType("milight", node);
    RED.log.info(packageFile.name + '@' + packageFile.version + ' started');
};