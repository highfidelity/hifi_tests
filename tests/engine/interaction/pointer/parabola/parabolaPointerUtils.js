START_DIMENSIONS = { x: 0.1, y: 0.1, z: 0.1 };
END_DIMENSIONS = { x: 0.25, y: 0.25, z: 0.25 };

COLOR1 = { red: 255, green: 0, blue: 0 };
COLOR2 = { red: 0, green: 255, blue: 0 };
COLOR3 = { red: 0, green: 0, blue: 255 };
COLOR4 = { red: 0, green: 255, blue: 255 };
COLOR5 = { red: 255, green: 0, blue: 255 };

start1 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR1,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

path1 = {
    color: COLOR1,
    alpha: 1,
    width: 0.025,
    isVisibleInSecondaryCamera: true
}

end1 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR1,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

start2 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR2,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

path2 = {
    color: COLOR2,
    alpha: 0.5,
    width: 0.01,
    isVisibleInSecondaryCamera: true
}
end2 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR2,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true,
    drawInFront: true
};

start3 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR3,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

path3 = {
    color: COLOR3,
    alpha: 0.75,
    width: 0.05,
    isVisibleInSecondaryCamera: true
};

end3 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR3,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

start4 = {
    type: "sphere",
    dimensions: START_DIMENSIONS,
    color: COLOR4,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

path4 = {
    color: COLOR4,
    alpha: 0.75,
    width: 0.025,
    isVisibleInSecondaryCamera: true
};

end4 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR4,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

end5 = {
    type: "cube",
    dimensions: END_DIMENSIONS,
    color: COLOR1,
    solid: true,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

end6 = {
    type: "sphere",
    dimensions: {x:0.5, y:0.5, z:0.5},
    color: COLOR1,
    ignoreRayIntersection: true,
    isVisibleInSecondaryCamera: true
};

path7 = {
    color: COLOR5,
    alpha: 1,
    width: 0.025,
    isVisibleInSecondaryCamera: true
};

end7 = {
    type: "sphere",
    dimensions: END_DIMENSIONS,
    color: COLOR5,
    ignoreRayIntersection: true,
    drawHUDLayer: true,
    isVisibleInSecondaryCamera: true
};

end8 = {
    type: "cube",
    dimensions: {x:0.05, y:0.05, z:0.2},
    color: COLOR1,
    solid: true,
    ignoreRayIntersection: true,
    drawHUDLayer: true,
    isVisibleInSecondaryCamera: true
};

renderStates = [
    {name: "one", start: start1, path: path1, end: end1},
    {name: "two", start: start2, path: path2, end: end2},
    {name: "three", start: start3, path: path3, end: end3},
    {name: "four", start: start4, path: path4, end: end4},
    {name: "five", start: start1, path: path1, end: end5}
];

DEFAULT_DISTANCE = 10;

defaultRenderStates = [
    {name: "one", start: start1, path: path1, distance: DEFAULT_DISTANCE},
    {name: "two", start: start1, path: path1, distance: DEFAULT_DISTANCE},
    {name: "three", start: start1, path: path1, distance: DEFAULT_DISTANCE},
    {name: "four", start: start1, path: path1, distance: DEFAULT_DISTANCE}
];

// Data that needs to be initialized for each test
orientation = { x: 0.0, y: 0.0, z: 0.0, w: 1.0 };
dir = { x: 0.0, y: 0.0, z: 0.0 };
pos = { x: 0.0, y: 0.0, z: 0.0 };
right = { x: 0.0, y: 0.0, z: 0.0 };
initializeTestData = function (originFrame) {
    var q0 = Quat.fromPitchYawRollDegrees(0.0, 0.0, 0.0);
    orientation = q0;
    dir = Quat.getForward(orientation);
    dir.y = 0.0;
    var shiftedPosition = originFrame;
    shiftedPosition.y += 1.0;
    pos = Vec3.sum(Vec3.sum(shiftedPosition, Vec3.multiply(2.0, Vec3.normalize(dir))), { x: 0.0, y: 0.5, z: 0.0 });
    right = Quat.getRight(orientation);

    Camera.setOrientation(q0);
    Camera.setPosition(originFrame);
}
