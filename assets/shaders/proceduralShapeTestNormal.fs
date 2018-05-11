float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
    diffuse = 0.5 * (_modelNormal + vec3(1.0));
    return 0.0;
}