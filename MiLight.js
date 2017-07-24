module.exports = function (RED) {
    "use strict";

    var Milight = require('node-milight-promise');
    var packageFile = require('./package.json');
    var Color = require('color');

    function node(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        // backwards compatibility with previous versions
        if (config.bridgetype == null || config.bridgetype === '') {
            config.bridgetype = 'legacy'
        }
        var light = new Milight.MilightController({
                ip: config.ip,
                delayBetweenCommands: 100,
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
                        case 'mode':
                            light.sendCommands(commands.on(zone), commands.effectModeNext(zone));
                            break;
                        case 'speed_up':
                            light.sendCommands(commands.on(zone), commands.effectSpeedUp(zone));
                            break;
                        case 'speed_down':
                            light.sendCommands(commands.on(zone), commands.effectSpeedDown(zone));
                            break;
                        case 'white':
                            light.sendCommands(commands.whiteMode(zone));
                            break;
                        case 'night':
                            light.sendCommands(commands.nightMode(zone));
                            break;
                        default:
                            var value = Number(msg.payload);
                            if (command === 'rgb') {
                                var color = new Color(msg.payload);
                                var args = argsHelper.apply(node, color.rgb().array());
                                light.sendCommands(commands.on(zone),
                                    commands.rgb.apply(commands, args));
                            }
                            else if (!isNaN(value)) {
                                if (command === 'brightness')
                                    light.sendCommands(
                                        commands.brightness.apply(commands, argsHelper(value)));
                                else if (command === 'color')
                                    light.sendCommands(
                                        commands.hue.apply(commands, argsHelper(value, true)));
                                else if (command === 'saturation' && bulb === 'fullColor')
                                    light.sendCommands(commands.saturation(zone, value, true));
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

    RED.nodes.registerType("MiLight", node);
    RED.log.info(packageFile.name + '@' + packageFile.version + ' started');
};