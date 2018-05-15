# Zone - Ambient Light Inheritance
## Run this script URL: [Manual](./test.js?raw=true)   [Auto](./testAuto.js?raw=true)(from menu/Edit/Open and Run scripts from URL...).

## Preconditions
- In an empty region of a domain with editing rights.

## Steps
Press 'n' key to advance step by step

### Step 1
- Setup zones and sphere
### Step 2
- Red zone, bright ambient light
- ![](./ExpectedImage_00000.png)
### Step 3
- Move to green zone
### Step 4
- Green zone, medium ambient light
- ![](./ExpectedImage_00001.png)
### Step 5
- Move to blue zone
### Step 6
- Blue zone, dark ambient light
- ![](./ExpectedImage_00002.png)
### Step 7
- Diable ambient light in blue zone
### Step 8
- Blue off,  no ambient light
- ![](./ExpectedImage_00003.png)
### Step 9
- Inherit ambient light
### Step 10
- Blue zone, medium ambient light (from green)
- ![](./ExpectedImage_00004.png)
### Step 11
- Disable green ambient light
### Step 12
- Green off,  no ambient light
- ![](./ExpectedImage_00005.png)
### Step 13
- Set green ambient light to inherit
### Step 14
- Green inherit, bright ambient light (from red)
- ![](./ExpectedImage_00006.png)
### Step 15
- Set red ambient light to off
### Step 16
- Red off,  no ambient light
- ![](./ExpectedImage_00007.png)
### Step 17
- Move to green zone
### Step 18
- Green zone, still no ambient light
- ![](./ExpectedImage_00008.png)
### Step 19
- Set red ambient light to on
### Step 20
- Red on, bright ambient light
- ![](./ExpectedImage_00009.png)
### Step 21
- Delete entities
