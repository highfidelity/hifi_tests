# Test capsule CollisionPick on server
## Run this script URL: [Manual](./testStory.js?raw=true)

## Preconditions
- In a domain with various physical objects to interact with.
- Physics engine is loaded.

## Steps
Press 'n' key to advance step by step, and move the collision pick representation to observe behavior.

### Step 1
- Visualize pick without collision points
- You should see a capsule-shaped wire overlay which follows where you point. The capsule overlay should also rotate if in HMD mode. Green indicates no collision and red indicates collision.
### Step 2
- Visualize pick with collision points
- You should see the same overlay as before, but with additional blue and orange spheres which represent contact points within the pick and the intersected objects.
- Expect temporary script unresponsiveness when interacting with objects with more complicated collision meshes. This is a known issue with the contact point visualization; contact points are still calculated in both steps.
- ![](./capsule_on_server1.png)
- ![](./capsule_on_server2.png)
### Step 3
- Clean up after test
