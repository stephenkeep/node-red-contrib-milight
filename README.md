# node-red-contrib-milight

A Node Red node to control Milight LED bulbs and their OEM equivalents such as Rocket LED, Limitless LED Applamp, Easybulb, s'luce, iLight, iBulb, and Kreuzer. 

## Install

```npm i node-red-contrib-milight```

## Example Flow

    [{"id":"16adbb3a.8ad3ad","type":"inject","z":"f01695c3.ab1ba","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":531.0000152587891,"y":781.0000228881836,"wires":[["738394f0.59cf84"]]},{"id":"e757aaf3.890c38","type":"inject","z":"f01695c3.ab1ba","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":531.0000305175781,"y":835.0000152587891,"wires":[["738394f0.59cf84"]]},{"id":"22cde3fa.effee4","type":"inject","z":"f01695c3.ab1ba","name":"white","topic":"","payload":"white","payloadType":"str","repeat":"","crontab":"","once":false,"x":533,"y":890.9999933242798,"wires":[["738394f0.59cf84"]]},{"id":"b404d6bd.188b08","type":"inject","z":"f01695c3.ab1ba","name":"Brightness 10%","topic":"","payload":"10","payloadType":"num","repeat":"","crontab":"","once":false,"x":565,"y":960,"wires":[["8d9398ee.0ee478"]]},{"id":"8d9398ee.0ee478","type":"function","z":"f01695c3.ab1ba","name":"","func":"msg.command = 'brightness';\nreturn msg;","outputs":1,"noerr":0,"x":738.0000228881836,"y":985.0000553131104,"wires":[["738394f0.59cf84"]]},{"id":"75f80511.fbae4c","type":"inject","z":"f01695c3.ab1ba","name":"Color","topic":"","payload":"20","payloadType":"num","repeat":"","crontab":"","once":false,"x":533.0000057220459,"y":1071.00004196167,"wires":[["5df96996.a266f8"]]},{"id":"5df96996.a266f8","type":"function","z":"f01695c3.ab1ba","name":"","func":"msg.command = 'color';\nreturn msg;","outputs":1,"noerr":0,"x":735.0000839233398,"y":1073.000057220459,"wires":[["738394f0.59cf84"]]},{"id":"20a9ec26.7dc7f4","type":"inject","z":"f01695c3.ab1ba","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":537.0000076293945,"y":396.00000381469727,"wires":[["57f0004d.fff538"]]},{"id":"b7037298.7eb108","type":"inject","z":"f01695c3.ab1ba","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":536.5000133514404,"y":443.00000190734863,"wires":[["57f0004d.fff538"]]},{"id":"a1dd0f97.ba3938","type":"inject","z":"f01695c3.ab1ba","name":"Warmer","topic":"","payload":"warmer","payloadType":"str","repeat":"","crontab":"","once":false,"x":534.9999961853027,"y":486.00000381469727,"wires":[["57f0004d.fff538"]]},{"id":"360fcfc7.32a18","type":"inject","z":"f01695c3.ab1ba","name":"Cooler","topic":"","payload":"cooler","payloadType":"str","repeat":"","crontab":"","once":false,"x":538.5000152587891,"y":531.0000152587891,"wires":[["57f0004d.fff538"]]},{"id":"55b56789.5d9b5","type":"inject","z":"f01695c3.ab1ba","name":"Bright Up","topic":"","payload":"bright_up","payloadType":"str","repeat":"","crontab":"","once":false,"x":545.0000305175781,"y":574.0000267028809,"wires":[["57f0004d.fff538"]]},{"id":"fb1e6779.d598c8","type":"inject","z":"f01695c3.ab1ba","name":"Bright Down","topic":"","payload":"bright_down","payloadType":"str","repeat":"","crontab":"","once":false,"x":554.0000076293945,"y":620.9999980926514,"wires":[["57f0004d.fff538"]]},{"id":"e935e537.f48198","type":"inject","z":"f01695c3.ab1ba","name":"Bright Max","topic":"","payload":"bright_max","payloadType":"str","repeat":"","crontab":"","once":false,"x":544.0000133514404,"y":666.0000286102295,"wires":[["57f0004d.fff538"]]},{"id":"1f2f032a.0d65ad","type":"inject","z":"f01695c3.ab1ba","name":"Night","topic":"","payload":"night","payloadType":"str","repeat":"","crontab":"","once":false,"x":536.0000286102295,"y":713.000020980835,"wires":[["57f0004d.fff538"]]},{"id":"da306d7b.551c2","type":"inject","z":"f01695c3.ab1ba","name":"Brightness 100%","topic":"","payload":"100","payloadType":"num","repeat":"","crontab":"","once":false,"x":565.0000305175781,"y":1006.750057220459,"wires":[["8d9398ee.0ee478"]]},{"id":"57f0004d.fff538","type":"milight","z":"f01695c3.ab1ba","name":"White Bulb / Legacy Bridge","bridgetype":"legacy","bulbtype":"white","zone":1,"ip":"255.255.255.255","broadcast":true,"x":998,"y":564,"wires":[]},{"id":"738394f0.59cf84","type":"milight","z":"f01695c3.ab1ba","name":"Color Bulb / Legacy Bridge","bridgetype":"legacy","bulbtype":"rgbw","zone":1,"ip":"255.255.255.255","broadcast":true,"x":1016,"y":887,"wires":[]}]

The following bulb types are supported:
 - WW/CW, aka. "white"
 - RGB WW, aka. "color"
 - RGB WW/CW, aka. "full color" (iBox1/iBox2 bridges)
 - RGB CW bridge light (iBox1 bridge) 

To control the bulb pass one of the following commands in `msg.payload`:
   
 - 'on' - Turns the bulb on (all bulb types)
 - 'off' - Turns the bulb off (all bulb types)
 - 'night' - Turn the night mode (all bulb types)
 - 'white' - Sets a color bulb to white (color bulb types only)
 - 'disco' - Cycles a bulb through all the colors (color bulb types, only)
 - 'modenext' - Cycles through the effect modes (color bulb types only)
 - 'candleflicker' - Starts the candle flicker effect mode. (full color bulb only)
 - 'rainbowfade' - Starts the rainbow fade effect, which fades between colors. (color bulbs only)
 - 'whitefade' - Fades from full on white to off then back again. On full color bulbs fades smoothly between warm and cool white. (color bulbs only)
 - 'rgbwfade' - Fades smoothly between colors. (color bulbs only)
 - 'rainbow' - Changes the color of the bulb through a sequence of colors. (color bulbs only)
 - 'random' - Randomly changes the color of the bulb. (color bulbs only)
 - 'redflash' - Fades the bulb from off to full red, then flashes red three times. (color bulbs only)
 - 'greenflash' - Fades the bulb from off to full green, then flashes green three times. (color bulbs only)
 - 'blueflash' - Fades the bulb from off to full blue, then flashes blue three times. (color bulbs only)
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
     - 'temperature' - Set white color temperature (full color bulb only), `msg.paylod` contains a value between 0 - 100, where 0 is 2700 K and 100 is 6500 K.
 - *Color String* - If a color string, e.g. "blue" or "rgb(255, 128, 128)" is provided and the command verb "rgb" is 
    assigned to `msg.command` or `msg.topic` the RGB color can be set. Note, however, for "color" and "bridge" type
    bulbs the Milight hue will be set, only. For "full color" bulbs the saturation and brightness will be also set.

