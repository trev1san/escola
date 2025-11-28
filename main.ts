function girar90Graus () {
    pins.digitalWritePin(MOTOR_LEFT_FORWARD, 1)
    pins.digitalWritePin(MOTOR_LEFT_BACKWARD, 0)
    pins.digitalWritePin(MOTOR_RIGHT_FORWARD, 0)
    pins.digitalWritePin(MOTOR_RIGHT_BACKWARD, 1)
    basic.pause(800)
    parar()
}
function parar () {
    pins.digitalWritePin(MOTOR_LEFT_FORWARD, 0)
    pins.digitalWritePin(MOTOR_LEFT_BACKWARD, 0)
    pins.digitalWritePin(MOTOR_RIGHT_FORWARD, 0)
    pins.digitalWritePin(MOTOR_RIGHT_BACKWARD, 0)
}
function moverFrente () {
    pins.digitalWritePin(MOTOR_LEFT_FORWARD, 1)
    pins.digitalWritePin(MOTOR_LEFT_BACKWARD, 0)
    pins.digitalWritePin(MOTOR_RIGHT_FORWARD, 1)
    pins.digitalWritePin(MOTOR_RIGHT_BACKWARD, 0)
}
function medirDistancia () {
    pins.digitalWritePin(TRIG, 0)
    basic.pause(50)
    pins.digitalWritePin(TRIG, 1)
    basic.pause(10)
    pins.digitalWritePin(TRIG, 0)
    while (pins.digitalReadPin(ECHO) == 0) {
        pulseStart = input.runningTime()
    }
    while (pins.digitalReadPin(ECHO) == 1) {
        pulseEnd = input.runningTime()
    }
    pulseDuration = pulseEnd - pulseStart
    distanciaCm = pulseDuration * 34300 / 2000000
    return distanciaCm
}
let distancia = 0
let distanciaCm = 0
let pulseDuration = 0
let pulseEnd = 0
let pulseStart = 0
let MOTOR_RIGHT_BACKWARD = 0
let MOTOR_RIGHT_FORWARD = 0
let MOTOR_LEFT_BACKWARD = 0
let MOTOR_LEFT_FORWARD = 0
let ECHO = 0
let TRIG = 0
TRIG = DigitalPin.P0
ECHO = DigitalPin.P1
MOTOR_LEFT_FORWARD = DigitalPin.P2
MOTOR_LEFT_BACKWARD = DigitalPin.P8
MOTOR_RIGHT_FORWARD = DigitalPin.P12
MOTOR_RIGHT_BACKWARD = DigitalPin.P16
basic.forever(function () {
    distancia = medirDistancia()
    basic.clearScreen()
    if (distancia < 30) {
        basic.showIcon(IconNames.No)
        parar()
        girar90Graus()
        basic.pause(500)
    } else {
        basic.showIcon(IconNames.Happy)
        moverFrente()
        basic.pause(100)
    }
})
