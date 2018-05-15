uniform float mipf = 0.0;

vec2 getBoxUv() {
    vec2 uv = _position.xy + 0.5;
    uv.y = 1.0 - uv.y;
    return uv;
}

vec2 getTextureMipDimensions(int mip) {
    vec2 texSize = iChannelResolution[0].xy;
    texSize /= float(1 << mip);
    return texSize;
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
    int mip = int(floor(mipf));
    
    vec2 uv = getBoxUv();
    vec2 mipSize = getTextureMipDimensions(mip);
    vec2 pixel = floor(mipSize * uv);

    diffuse = texelFetch(iChannel0, ivec2(pixel), mip).rgb;
    specular = vec3(1.0, 1.0, 1.0); 
    return 1.0;
}