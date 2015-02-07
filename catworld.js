var container;
var camera, controls, scene, renderer;

function render()
{
	renderer.render( scene, camera );
}

function animate()
{
	requestAnimationFrame(animate);
	controls.update();
}

function onWindowResize()
 {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

function init()
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 500, 800, 1300 );

	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
	controls.addEventListener( 'change', render );
	
	// grid
	var size = 500, step = 30;
	var geometry = new THREE.Geometry();
	for ( var i = - size; i <= size; i += step ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
	}
	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
	var line = new THREE.Line( geometry, material, THREE.LinePieces );
	scene.add( line );
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}

function catworld()
{
	init();
	render();
}