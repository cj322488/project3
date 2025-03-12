let scene, camera, renderer, model, controls;

// Initialize the scene
function init() {
    // Create the scene
    scene = new THREE.Scene();

    // Set the background color of the scene to light gray
    scene.background = new THREE.Color(0xf0f0f0); // Light gray background

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5); // Adjust camera to look at the model properly

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    // Add ambient light (soft light)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1); // White light with intensity of 1
    scene.add(ambientLight);

    // Add directional light (stronger light, better for casting shadows)
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1); // White light
    directionalLight.position.set(5, 5, 5); // Position the light
    scene.add(directionalLight);

    // Load the 3D model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load("assets/3d-models/vaz.glb", (gltf) => {
        model = gltf.scene;

        // Adjust the model scale and orientation
        model.scale.set(2, 2, 2); // Scale the model for visibility
        model.rotation.set(0, Math.PI, 0); // Reset initial rotation to prevent it from falling
        scene.add(model);
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    // Set up the orbit controls (allows user to interact with the model)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Resize event listener
    window.addEventListener('resize', onWindowResize, false);
}

// Handle window resize to adjust camera and renderer
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // No rotation applied unless required
    if (model) {
        // model.rotation.x += 0.01; // Uncomment if you want the model to rotate
        // model.rotation.y += 0.01;
    }

    controls.update(); // Update controls on each frame
    renderer.render(scene, camera);
}

// Start the app
init();
animate();
