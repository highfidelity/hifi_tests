# Engine Render Shadows

### Preconditions
Interface is running, logged in the 'Dev-Welcome' domain at the initial position with avatar in first person view.

### Steps

The steps can be run manually or by executing the [shadows.js script](./shadows.js?raw=true) (from menu/Edit/Open and Run scripts From URL...) in which case each step is played in sequence by pressing the [SPACE] key.

#### Step 1
- With the avatar at the domain's initial position, looking back towards the back of the hangar.
- Expected: ![](./init.jpg)

#### Step 2
- Open the 'Create' window and select the 'Zone' entity in the 'List' tab. Switch to the 'Properties' tab of that same 'Create' window and uncheck at the top right of the window the 'Locked' and then 'Visible' checkboxes, to disable this particular zone and activate the default zone.
- Expected: ![](./defaultzone.jpg)

#### Step 3
- In the 'Create' window, select the 'Zone' entity in the 'List' tab. Switch to the 'Properties' tab and check the 'Visible' checkbox. In the 'Key Light' section in that same tab, set the 'Light Altitude' to 10 and 'Light Azimuth' to 30
- Expected: ![](./newlightpos.jpg)

#### Step 4
- Turn view 180°
- Expected: ![](./behind.jpg)
