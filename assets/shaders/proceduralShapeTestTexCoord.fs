float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
    diffuse = vec3(_texCoord0, 0.0);
    return 0.0;
}