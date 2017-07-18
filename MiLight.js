module.exports = function (RED) {
    "use strict";

    var Milight = require('node-milight-promise').MilightController;
    var whiteCommands = require('node-milight-promise').commands;
    var rgbwCommands = require('node-milight-promise').commands2;
    var v6Commands = require('node-milight-promise').commandsV6;
    var packageFile = require('./package.json');

    function node(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        // backwards compatibility with previous versions
        if (config.bridgetype == null || config.bridgetype === '') {
            config.bridgetype = 'legacy'
        }
        var light = new Milight({
                ip: config.ip,
                delayBetweenCommands: (config.bulbtype === 'rgbw' && config.bridgetype !== 'v6') ? 50 : 100,
                commandRepeat: config.bulbtype === 'white' ? 1 : 2,
                type: config.bridgetype,
                broadcastMode: config.broadcast
            }),
            zone = Number(config.zone),
            bulb = config.bulbtype;

        if (config.bridgetype === 'v6') {
            rgbwCommands = v6Commands;
        }

        this.on('input', function (msg) {

            light.ready().then(function () {
                var command = msg.command ? msg.command : msg.topic;

                if (bulb !== 'white') {
                    if (rgbwCommands[bulb] == null) {
                        node.error("Selected combination of bridge type and bulb type is not supported");
                        return;
                    }
                    switch (msg.payload) {
                        case 'off':
                            light.sendCommands(rgbwCommands[bulb].off(zone));
                            break;
                        case 'on':
                            light.sendCommands(rgbwCommands[bulb].on(zone));
                            break;
                        case 'disco':
                            light.sendCommands(rgbwCommands[bulb].on(zone));
                            for (var x = 0; x < 256; x += 5) {
                                if (config.bridgetype === 'v6') {
                                    light.sendCommands(rgbwCommands[bulb].hue(zone, x));
                                }
                                else {
                                    light.sendCommands(rgbwCommands[bulb].hue(x));
                                }
                                light.pause(100);
                            }
                            break;
                        case 'mode':
                            light.sendCommands(rgbwCommands[bulb].on(zone), rgbwCommands[bulb].effectModeNext(zone));
                            break;
                        case 'speed_up':
                            light.sendCommands(rgbwCommands[bulb].on(zone), rgbwCommands[bulb].effectSpeedUp(zone));
                            break;
                        case 'speed_down':
                            light.sendCommands(rgbwCommands[bulb].on(zone), rgbwCommands[bulb].effectSpeedDown(zone));
                            break;
                        case 'white':
                            if (config.bridgetype === 'v6') {
                                light.sendCommands(rgbwCommands[bulb].on(zone), rgbwCommands[bulb].brightness(zone, 100), rgbwCommands[bulb].whiteMode(zone));
                            }
                            else {
                                light.sendCommands(rgbwCommands[bulb].on(zone), rgbwCommands[bulb].brightness(100), rgbwCommands[bulb].whiteMode(zone));
                            }
                            break;
                        case 'night':
                            light.sendCommands(rgbwCommands[bulb].nightMode(zone));
                            break;
                        default:
                            var value = Number(msg.payload);
                            if (!isNaN(value)) {
                                if (config.bridgetype === 'v6') {
                                    if (command === 'brightness')
                                        light.sendCommands(rgbwCommands[bulb].brightness(zone, value));
                                    else if (command === 'color')
                                        light.sendCommands(rgbwCommands[bulb].hue(zone, value, true));
                                    else if (command === 'saturation' && bulb === 'fullColor')
                                        light.sendCommands(rgbwCommands[bulb].saturation(zone, value, true));
                                }
                                else {
                                    if (command === 'brightness')
                                        light.sendCommands(rgbwCommands[bulb].brightness(value));
                                    else if (command === 'color')
                                        light.sendCommands(rgbwCommands[bulb].hue(value));
                                }
                            }
                            break;
                    }
                } else {
                    switch (msg.payload) {
                        case 'off':
                            light.sendCommands(whiteCommands[bulb].off(zone));
                            break;
                        case 'on':
                            light.sendCommands(whiteCommands[bulb].on(zone));
                            break;
                        case 'bright_up':
                            light.sendCommands(whiteCommands[bulb].brightUp(zone));
                            break;
                        case 'bright_down':
                            light.sendCommands(whiteCommands[bulb].brightDown(zone));
                            break;
                        case 'cooler':
                            light.sendCommands(whiteCommands[bulb].cooler(zone));
                            break;
                        case 'warmer':
                            light.sendCommands(whiteCommands[bulb].warmer(zone));
                            break;
                        case 'bright_max':
                            light.sendCommands(whiteCommands[bulb].maxBright(zone));
                            break;
                        case 'night':
                            light.sendCommands(whiteCommands[bulb].nightMode(zone));
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