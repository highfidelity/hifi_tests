# Test pick parenting on server
## Run this script URL: [Manual](./testStory.js?raw=true)

## Preconditions
- In a complicated test domain such as engine-dev, with permission to create objects
- Physics engine is loaded
- HMD mode and keyboard available

## Terminology
- "Colliding" - Throughout this test, you should see 3-dimensional objects are supposed to change color between green and red, depending on whether they are colliding with something or not. Green indicates no collision and red indicates collision. The objects are also allowed to be green when colliding but only by a small amount proportional to the size of the thing being collided with (this is due to an optimization in the physics engine which makes corners and edges more rounded). However, if the objects are green while deep inside an object, or red when not colliding, that is considered a failure. The object is considered colliding with an entity when its visualization overlaps with the entity's collision mesh. A visualization standing on the ground may also be colliding on some parts of the ground if the ground is not flat.
- "Collision Mesh" - Collision meshes can be visualized by temporarily enabling Developer -> Physics -> Show Bullet Collision.
- "Contact points" - At some points of the test, when the 3d visualization object is red, you will see additional visualizations of the contact points. These points are either inside or near the red visualization (ideally they should be inside; this behavior will be improved in the future). The number of points and their positions can vary depending on the nature of the collision.

### Step 1 - Mouse Parenting
- Be in desktop mode
- Assuming the script has just loaded and "n" has not been pressed yet, press "n" twice to advance to first step
- Move the mouse around and turn the camera. A visualization should follow the mouse.
- The visualization is a capsule, however it should look circular when the mouse and camera are still, due to the capsule's orientation. Verify the capsule visualization updates its position and orientation so that it appears circular when the mouse and camera come to rest.

### Step 2 - Joint Parenting
- Be in HMD mode
- Press "n" twice to advance to the next step
- Move your dominant controller around.
- Verify a cube-shaped visualization follows the controller.
- Verify the cube is red when colliding with things or near things, but green otherwise.
- Verify contact points appear when the cube is red.

### Step 3 - Entity Parenting
- Be in desktop mode
- Press "n" twice to advance to the next step
- Back away, and you should see a new object placed in the environment, with a cylinder-shaped visualization attached to it.
- Open the create menu (accessible by clicking the "Create" button on the toolbar), select the object, and move it around. Verify the cylinder follows the object.
- Verify the cylinder is red when colliding or near things, but green otherwise.
- Verify contact points appear when the cylinder is red.
- With the create menu open, select the created object and delete it. If the object does not go away, you can force the removal of the object by selecting the object, going to the "Properties" tab of the "Create Tools" window, and setting the lifetime of the object to 0.

### Step 4 - RayPick Parenting
- Be in HMD mode
- Press "n" twice to advance to the next step
- Move your dominant hand controller around. Verify a capsule-shaped visualization follows where the controller is pointing.
- Verify the capsule is red when colliding or near things, but green otherwise. This collision check has been made less sensitive, so the capsule will need to be overlapping more deeply with a collision mesh to be considered colliding.
- Verify contact points appear when the capsule is red.

### Step 5
- Press "n" to advance the test to completion. This will clean up the test.