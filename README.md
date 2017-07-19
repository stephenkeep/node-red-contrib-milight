# node-red-contrib-milight

A Node Red nodes to control all bulb types Milight LED bulbs and OEM equivalents such as Rocket LED, Limitless LED Applamp, Easybulb, s'luce, iLight, iBulb, and Kreuzer. 

## Install

```npm i node-red-contrib-milight```

## Example Flow

    [{"id":"703feba3.f74ba4","type":"MiLight","z":"cedb2490.c23188","name":"White Milight Bulb","bulbtype":"white","zone":1,"ip":"192.168.0.21","broadcast":true,"x":602.5,"y":175,"wires":[]},{"id":"ea754d8b.c0a0a","type":"MiLight","z":"cedb2490.c23188","name":"Color Milight Bulb","bulbtype":"white","zone":1,"ip":"192.168.0.21","broadcast":true,"x":625.5,"y":488,"wires":[]},{"id":"9aa84473.6753f8","type":"inject","z":"cedb2490.c23188","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":148.5,"y":432,"wires":[["ea754d8b.c0a0a"]]},{"id":"ee46f786.9dfcd8","type":"inject","z":"cedb2490.c23188","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":152.5,"y":485,"wires":[["ea754d8b.c0a0a"]]},{"id":"994c5f75.f75a5","type":"inject","z":"cedb2490.c23188","name":"white","topic":"","payload":"white","payloadType":"str","repeat":"","crontab":"","once":false,"x":149.5,"y":539,"wires":[["ea754d8b.c0a0a"]]},{"id":"f6ea5afe.d758b8","type":"inject","z":"cedb2490.c23188","name":"Brightness","topic":"","payload":"10","payloadType":"num","repeat":"","crontab":"","once":false,"x":145.5,"y":610,"wires":[["44621f47.abc8f"]]},{"id":"44621f47.abc8f","type":"function","z":"cedb2490.c23188","name":"","func":"msg.command = 'brightness';\nreturn msg;","outputs":1,"noerr":0,"x":320.5,"y":610,"wires":[["ea754d8b.c0a0a"]]},{"id":"d2630aff.f36b38","type":"inject","z":"cedb2490.c23188","name":"Color","topic":"","payload":"20","payloadType":"num","repeat":"","crontab":"","once":false,"x":138.5,"y":668,"wires":[["1341915.7fd236f"]]},{"id":"1341915.7fd236f","type":"function","z":"cedb2490.c23188","name":"","func":"msg.command = 'color';\nreturn msg;","outputs":1,"noerr":0,"x":319.5,"y":669,"wires":[["ea754d8b.c0a0a"]]},{"id":"8ea9e947.32c7c8","type":"inject","z":"cedb2490.c23188","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":141.5,"y":36,"wires":[["703feba3.f74ba4"]]},{"id":"9d1a4225.3a926","type":"inject","z":"cedb2490.c23188","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":141,"y":78,"wires":[["703feba3.f74ba4"]]},{"id":"ddc3d3e9.af25","type":"inject","z":"cedb2490.c23188","name":"Warmer","topic":"","payload":"warmer","payloadType":"str","repeat":"","crontab":"","once":false,"x":144.5,"y":128,"wires":[["703feba3.f74ba4"]]},{"id":"6d5e9f9d.72a17","type":"inject","z":"cedb2490.c23188","name":"Cooler","topic":"","payload":"cooler","payloadType":"str","repeat":"","crontab":"","once":false,"x":146,"y":176,"wires":[["703feba3.f74ba4"]]},{"id":"9ef7721c.7ae64","type":"inject","z":"cedb2490.c23188","name":"Bright Up","topic":"","payload":"bright_up","payloadType":"str","repeat":"","crontab":"","once":false,"x":157.5,"y":224,"wires":[["703feba3.f74ba4"]]},{"id":"88a65d6.31e7ba","type":"inject","z":"cedb2490.c23188","name":"Bright Down","topic":"","payload":"bright_down","payloadType":"str","repeat":"","crontab":"","once":false,"x":166.5,"y":271,"wires":[["703feba3.f74ba4"]]},{"id":"701d5fcc.86432","type":"inject","z":"cedb2490.c23188","name":"Bright Max","topic":"","payload":"bright_max","payloadType":"str","repeat":"","crontab":"","once":false,"x":158.5,"y":314,"wires":[["703feba3.f74ba4"]]},{"id":"e103214f.25c99","type":"inject","z":"cedb2490.c23188","name":"Night","topic":"","payload":"night","payloadType":"str","repeat":"","crontab":"","once":false,"x":152.5,"y":357,"wires":[["703feba3.f74ba4"]]}]

The following bulb types are supported:
 - WW/CW, aka. "white"
 - RGB WW, aka. "color"
 - RGB WW/CW, aka. "full color" (iBox1/iBox2 bridges)
 - RGB CW bridge light (iBox1 bridge) 

To control the bulb pass the command to `msg.payload` as follows:
   
 - 'on' - Turns the bulb on (all bulb types)
 - 'off' - Turns the bulb off (all bulb types)
 - 'night' - Turn the night mode (all bulb types)
 - 'white' - Sets a color bulb to white (color bulb types only)
 - 'disco' - Cycles a bulb through all the colors (color bulb types, only)
 - 'mode' - Cycles through the effect modes (color bulb types only)
 - 'speed_up' - Increase the speed of effect mode (color bulb types, only)
 - 'speed_down' - Decrease the speed of effect mode (color bulb types, only)
 - 'bright_up' - Increase the brightness of the bulb (white bulb, only)
 - 'bright_down' - Decrease the brightness of the bulb (white bulb, only)
 - 'cooler' - Make the bulb cooler (white bulb, only)
 - 'warmer' - Make the bulb warmer (white bulb, only)
 - 'bright_max' - Make the bulb brightness maximum (white bulb, only)
 - *Number* - If a number is provided the brightness, color, or saturation value of the color bulb can be controlled
    by assigning a command verb to `msg.command` or `msg.topic` as follows
     - 'brightness' - Set brightness, `msg.payload` must contain a number in 0 - 100
     - 'color' - Set color, `msg.payload` must contain a number in 0 - 255
     - 'saturation' - Set color saturation (full color bulb type, only), `msg.payload` must contain a number in 0 - 100
 - *Color String* - If a color string, e.g. "blue" or "rgb(255, 128, 128)" is provided and the command verb "rgb" is 
    assigned to `msg.command` or `msg.topic` the RGB color can be set. Note, however, for "color" and "bridge" type
    bulbs the Milight hue will be set, only. For "full color" bulbs the saturation and brightness will be also set.

