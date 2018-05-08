# zone - ambient light inheritance
## Run this script URL: [Manual](./test.js?raw=true)   [Auto](./testAuto.js?raw=true)(from menu/Edit/Open and Run scripts from URL...).

## Preconditions
- In an empty region of a domain with editing rights.

## Steps
Press space bar to advance step by step

### Step 1
- Zone not rotated - keylight at zenith
- ![](./ExpectedImage_00000.png)
### Step 2
- Pitch zone 45 degrees up, light should come from behind, 45 degrees above horizon
- ![](./ExpectedImage_00001.png)
### Step 3
- Add yaw zone 90 degrees clockwise, light should come from left, 45 degrees above horizon
- ![](./ExpectedImage_00002.png)
### Step 4
- Add roll zone 45 degrees clockwise, light should come from left
- ![](./ExpectedImage_00003.png)
### Step 5
- Zone not rotated - sun straight ahead on purple background (sphere is hidden)
- ![](./ExpectedImage_00004.png)
### Step 6
- Yaw zone 15 degrees right, sun should move right
- ![](./ExpectedImage_00005.png)
### Step 7
- Pitch zone 15 degrees up, yaw zone 15 degrees right, sun should move right and up
- ![](./ExpectedImage_00006.png)
### Step 8
- Pitch zone 15 degrees up, yaw zone 15 degrees right and roll 45 degrees, sun should move straight up
- ![](./ExpectedImage_00007.png)
### Step 9
- Zone not rotated - diffuse sphere and metallic object visible (skybox still enabled as a visual aid)
- ![](./ExpectedImage_00008.png)
### Step 10
- Yaw 90 degrees - blue is now behind
- ![](./ExpectedImage_00009.png)
### Step 11
- Yaw 180 degrees - purple is now behind
- ![](./ExpectedImage_00010.png)
### Step 12
- Yaw 270 degrees - red is now behind
- ![](./ExpectedImage_00011.png)
### Step 13
- Pitch 90 - green is now behind
- ![](./ExpectedImage_00012.png)
### Step 14
- Roll 45 degrees - green top-left, red top-right, yellow bottom-right, blue bottom-left
- ![](./ExpectedImage_00013.png)
