# Ambient Light Inheritance
## General

The tests consist of setting zone component parameters and moving through the zones.

## Preconditions
Run interface and delete all content

## Steps

### Step 1
* Remove all scripts (Edit->Stop All Scripts)
* Run this [script URL](./test.js?raw=true) (from menu: Edit->Open and Run Script File...).
  * **Immediately** move mouse cursor out of Interface window (so that cursor does not appear in snapshots).
* The test runs automatically and creates 5 snapshots.  Takes about 12 seconds.
  
### Step 2
Verify that the 5 snapshots match "ExpectedImage_1" till "ExpectedImage_5".