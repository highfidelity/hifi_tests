# High Fidelity Test Suite
The HiFi test suite consists of a set of (JavaScript) scripts, assets and tools for regression testing and development support of the High Fidelity virtual world infrastructure.

Where appropriate, sub-folders contain `readme` files describing the contents in greater detail.

# Assets
This folder contains the various entities used by many of the tests.  These include models, textures, shaders and so on..  See [README.md](./assets/README.md)
# Benchmarks
The benchmarks folder contains scripts for performance testing.  These tests often require large domains; these are stored in the assets/scene folder.  See [README.md](./benchmarks/README.md)
# Tests
This folder is the root of the test hierarchy and contains both test and utility scripts, used by the tests.  See [README.md](./tests/readme).

Instructions for creating tests and using the utility scripts, are provided in this [README.md](./tests/utils/README.md)

# Tools
Various tools are provided for automatic execution and validation of the tests.The tools are described in their specific README.md files.
