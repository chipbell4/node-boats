var Spark = require('spark-io');

var board = new Spark({
	token: process.env.SPARK_TOKEN,
	deviceId: process.env.SPARK_DEVICE_ID
});

var Boat = function(leftMotorPins, rightMotorPins) {
	this.left_pin_1 = leftMotorPins[0];
	this.left_pin_2 = leftMotorPins[1];
	this.right_pin_1 = rightMotorPins[0];
	this.right_pin_2 = rightMotorPins[1];
};

var pinDifferential = function(pin1, pin2, differential) {
	board.pinMode(pin1, board.MODES.OUTPUT);
	board.pinMode(pin2, board.MODES.OUTPUT);

	if(differential > 0) {
		board.analogWrite(pin1, differential);
		board.analogWrite(pin2, 0);
	}
	else {
		board.analogWrite(pin2, differential);
		board.analogWrite(pin1, 0);
	}
};

/**
 * Takes a value in the range 0 to 1 to control the left engine speed
 */
Boat.prototype.leftMotor = function(speed) {
	pinDifferential(this.left_pin_1, this.left_pin_2, Math.round(255 * speed));
};

/**
 * Takes a value in the range 0 to 1 to control the left engine speed
 */
Boat.prototype.rightMotor = function(speed) {
	pinDifferential(this.right_pin_1, this.right_pin_2, Math.round(255 * speed));
};

/**
 * Moves the boat forward at an angle and speed (in radians)
 */
Boat.prototype.forward = function(speed, angle) {

	var slow_speed = (1 - 2 * Math.abs(angle) / Math.PI) * speed;
	console.log('SLOW SPEED: ' + slow_speed);

	if(angle < 0) {
		this.leftMotor(1 * speed);
		this.rightMotor( slow_speed );
	}
	else {
		this.rightMotor(1 * speed);
		this.leftMotor( slow_speed );
	}
};

module.exports = Boat;
