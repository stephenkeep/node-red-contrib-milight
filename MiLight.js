var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands;

module.exports = function(RED) {
    function node (config) {
        
        RED.nodes.createNode(this, config);
        var node = this;
                        
        this.on('input', function(msg) {
            
            var light = new Milight({
                    ip: config.ip,
                    delayBetweenCommands: 70,
                    commandRepeat: config.bulbtype === 'rgbw' ? 2 : 1
                }),
                zone = config.zone,
                bulb = config.bulbtype;

            //i know this is private but its the only way i could get it to work
            light._broadcastMode = config.broadcast;
            
            if (msg.payload === 'off') light.sendCommands(commands[bulb].off(zone));
            if (msg.payload === 'on') light.sendCommands(commands[bulb].on(zone));
            
            if (bulb === 'rgbw') {
                
                if (msg.payload === 'disco') {
                    
                    light.sendCommands(commands.rgbw.on(zone));
                    for (var x = 0; x < 256; x += 5) {
                        light.sendCommands(commands.rgbw.hue(x));
                        light.pause(100);
                    }
                }
                
                if (msg.payload === 'white') light.sendCommands(commands.rgbw.on(zone), commands.rgbw.brightness(100), commands.rgbw.whiteMode(zone));
                
                if (!isNaN(msg.payload)) {
                    light.sendCommands(commands.rgbw.hue(msg.payload));
                }
            }
            
            light.close().then(function () {
                
            });
        });
    };
 
    RED.nodes.registerType("MiLight",node);
}