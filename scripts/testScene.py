import json
import random

def randomColor(): 
  return { "red" : random.randrange(0, 255), "green" : random.randrange(0, 255), "blue" : random.randrange(0, 255) };

def makeVector(x, y = None, z = None):
  if y is None: 
    y = x
  if z is None:
    z = x
  return { "x": x, "y": y, "z": z }

def makeExport(entities):
  return { "Entities": entities, "Version": 62 };

def makeBox(position, size):
  return {
    "type": "Box",
    "shape": "Cube",
    "color": randomColor(),
    "dimensions": makeVector(size),
    "position": position 
  };
            
def makeBoxes():
  entities = [];
  for x in list(range(3)):
    for y in list(range(2)):
      for z in list(range(2)):
        position = makeVector(x, y, -z)
        entities.append(makeBox(position, 0.5))
  return makeExport(entities)

f = open('../pytest.json', 'w')
json.dump(makeBoxes(), f, sort_keys=True, indent=2);
f.close()
