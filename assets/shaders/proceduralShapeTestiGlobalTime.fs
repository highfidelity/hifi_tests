float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
    diffuse = vec3(0.5 * sin(iGlobalTime) + 0.5);
    return 0.0;
}