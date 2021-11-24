#include <SoftwareSerial.h>

SoftwareSerial BTSerial(9,10); // RX | TX

void setup()
{
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(57600);  // Bluetooth serial port data rate (change if needed)
}

void loop()
{
  // Keep reading from HC-06 and send to Arduino Serial Monitor
  if (BTSerial.available())
  Serial.write(BTSerial.read());

  // Keep reading from Arduino Serial Monitor and send to HC-06
  if (Serial.available())
  BTSerial.write(Serial.read());
}
