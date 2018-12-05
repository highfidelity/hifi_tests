vec3 getSkyboxColor() {
	return vec3(0.5 * sin(iGlobalTime) + 0.5);
}