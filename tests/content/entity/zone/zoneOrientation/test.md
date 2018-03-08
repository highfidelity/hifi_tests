# Keylight Zone Inheritance
## General
This test will build the following zone hierarchy:

![](./hierarchy.png) 

The tests consist of setting keylight component parameters and moving through the zones.  In each zone, the keylight modes are changed.

## Preconditions
In an empty region of a domain with editing rights
## Test
The test images are named ExpectedImage_00001 and up.
**runTestStepByStep** will produce each of these images, stepping is performed by hitting the space bar.

**runTest** will perform all steps to completion, creating a sequence of snapshots.  These snapshots should match the expected images.

