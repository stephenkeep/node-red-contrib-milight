var Milight = require('node-milight-promise').MilightController;
var whiteCommands = require('node-milight-promise').commands;
var rgbwCommands = require('node-milight-promise').commands2;

module.exports = function (RED) {
    function node(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {

            var light = new Milight({
                    ip: config.ip,
                    delayBetweenCommands: config.bulbtype === 'rgbw' ? 50 : 100,
                    commandRepeat: config.bulbtype === 'rgbw' ? 2 : 1
                }),
                zone = config.zone,
                bulb = config.bulbtype;

            //i know this is private but its the only way i could get it to work
            light._broadcastMode = config.broadcast;
            var command = msg.command;

            if (bulb === 'rgbw') {
                switch (msg.payload) {
                    case 'off':
                        light.sendCommands(rgbwCommands[bulb].off(zone));
                        break;
                    case 'on':
                        light.sendCommands(rgbwCommands[bulb].on(zone));
                        break;
                    case 'disco':
                        light.sendCommands(rgbwCommands.rgbw.on(zone));
                        for (var x = 0; x < 256; x += 5) {
                            light.sendCommands(rgbwCommands.rgbw.hue(x));
                            light.pause(100);
                        }
                        break;
                    case  'white':
                        light.sendCommands(rgbwCommands.rgbw.on(zone), rgbwCommands.rgbw.brightness(100), rgbwCommands.rgbw.whiteMode(zone));
                        break;
                    default:
                        if (!isNaN(msg.payload)) {
                            if (command === 'brightness')
                                light.sendCommands(rgbwCommands.rgbw.brightness(msg.payload));
                            else if (command === 'color')
                                light.sendCommands(rgbwCommands.rgbw.hue(msg.payload));
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

            light.close().then(function () {

            });
        });
    }

    RED.nodes.registerType("MiLight", node);
};