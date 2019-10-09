# Delete protocol sanity - TEST REQUIRES SERVER
## Run this script URL: [Manual](./test.js?raw=true)   [Auto](./testAuto.js?raw=true)(from menu/Edit/Open and Run scripts from URL...).

## Preconditions
- In an empty region of a domain with editing rights.

## Steps
Press 'n' key to advance step by step

### Step 1
- Create parentEntity
### Step 2
- Verify parentEntity
### Step 3
- Create childEntity1 of 3
### Step 4
- Verify childEntity1
### Step 5
- Create childEntity2 of 3
### Step 6
- Verify childEntity2
### Step 7
- Create childEntity3 of 3
### Step 8
- Verify childEntity3
### Step 9
- Delete childEntity1 --> it and all subsequent children should be deleted
### Step 10
- Verify parent not deleted but all children are
### Step 11
- Clean up after test
