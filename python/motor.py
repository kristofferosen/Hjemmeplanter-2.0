# A program to control the movement of a single motor using the RTK MCB!
# Composed by The Raspberry Pi Guy to accompany his tutorial!

# Let's import the modules we will need!
import time
import RPi.GPIO as GPIO

# Next we setup the pins for use!
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17,GPIO.OUT)
GPIO.setup(18,GPIO.OUT)

print('Starting motor sequence!')


# Makes the motor spin one way for 3 seconds
time.sleep(3)
GPIO.output(17, False)
GPIO.output(18, True)
time.sleep(10)
GPIO.output(17, False)
GPIO.output(18, False)
quit()
