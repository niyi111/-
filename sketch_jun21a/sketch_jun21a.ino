#include<SoftwareSerial.h>
#include<string.h>
SoftwareSerial mySerial(10, 11);
 
const int in1 = 2;
const int in2 = 3;
char cmd[20];
char cmd1[10];
bool valid_cmd = false;
 
void setup() {
  Serial.begin(115200);
  delay(10);
  mySerial.begin(115200);
  delay(10);
  mySerial.print("AT+CIPMUX=1\r\n");
  delay(10);
  mySerial.print("AT+CIPSERVER=1,10500\r\n");
  delay(10);
  pinMode(13, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
}
 //Arduino接收信号，控制彩色LED的闪烁。
void loop() {
  int i;
  //如果串口收到有数据
  if (mySerial.available() > 0)
  {
    for (i = 0; i < 20; i++)
    {
      cmd[i] = '\0';
    }
 
    for (i = 0; i < 19; i++)
    {
      if (mySerial.available() > 0)
      {
        cmd[i] = mySerial.read();
      }
 
      else
      {
        break;
      }
    }
 
    for (i = 0; i < 10; i++)
    {
      cmd1[i] = cmd[i + 11];
    }
 
    valid_cmd = true;
  }
 
  //判断变量cmd的值，开始处理
  if (valid_cmd)
  {
    //如果变量cmd的前2位的值是on
    if (0 == strncmp(cmd1, "on", 2))
    {
 
      if (cmd1[2] != '\0') {
        int mytime = (cmd1[2] - '0') * 1000 + (cmd1[3] - '0') * 100;
        Serial.println(mytime);
        int ys = (cmd1[5] - '0') * 100 + (cmd1[6] - '0') * 10;
        Serial.println(ys);
 
       void bln(int num)
{
int brightness = 0; //LED的亮度
int fadeAmount = 5; //亮度变化增量
do {
analogWrite(num, brightness); //点亮LED
brightness = brightness + fadeAmount;
if (brightness >= 255)
fadeAmount = -fadeAmount ; //亮度翻转
delay(30); //延时30毫秒
} while( brightness>=0);
      }
      else {
 
        digitalWrite(13, HIGH);
        digitalWrite(in1, HIGH);
        digitalWrite(in2, LOW);
        Serial.println("Open");
        delay(2700);
        digitalWrite(in1, LOW);
        digitalWrite(in2, HIGH);
        delay(2350);
        digitalWrite(in1, LOW);
        digitalWrite(in2, LOW);
        digitalWrite(13, LOW);
      }
    }
 
    else
    {
      Serial.println("wrong order");
      digitalWrite(13, LOW);
    }
    valid_cmd = false;
  }
bln(3); 
bln(6); 
bln(10);
}
  delay(100);
}

