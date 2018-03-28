# Zone - Ambient Light Inheritance
## Preconditions
In an empty region of a domain with editing rights.

## Automatic Test
Load script <https://raw.githubusercontent.com/HighFidelity/hifi_tests/master/tests/content/entity/zone/ambientLightInheritance/testAuto.js>

## Manual Test
Load script <https://raw.githubusercontent.com/HighFidelity/hifi_tests/master/tests/content/entity/zone/ambientLightInheritance/test.js>

## Steps
Press space bar to advance step by step

1. Red zone, bright ambient light
![](./ExpectedImage_00000.png)
2. Green zone, medium ambient light
![](./ExpectedImage_00001.png)
3. Blue zone, dark ambient light
![](./ExpectedImage_00002.png)
4. Blue off,  no ambient light
![](./ExpectedImage_00003.png)
5. Blue inherit, medium ambient light
![](./ExpectedImage_00004.png)
6. Green off,  no ambient light
![](./ExpectedImage_00005.png)
7. Green inherit, bright ambient light
![](./ExpectedImage_00006.png)
8. Red off,  no ambient light
![](./ExpectedImage_00007.png)
9. Green zone, still no ambient light
![](./ExpectedImage_00008.png)
10. Red on, bright ambient light
![](./ExpectedImage_00009.png)
11. Delete entities
![](./ExpectedImage_00010.png)
