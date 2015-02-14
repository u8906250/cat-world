var container;
var camera, controls, scene, renderer, grid;
var mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
var isMouseDown = false;
var onMouseDownPosition = new THREE.Vector2(), onMouseDownPhi = 60, onMouseDownTheta = 45;
var radius = 1600, theta = 90, phi = 60;
var target = new THREE.Vector3( 0, 200, 0 );

function render()
{
	camera.lookAt( target );
	renderer.render( scene, camera );
}

function onWindowResize()
 {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

 function onDocumentMouseDown( event ) {
    event.preventDefault();
    isMouseDown = true;
    onMouseDownTheta = theta;
    onMouseDownPhi = phi;
    onMouseDownPosition.x = event.clientX;
    onMouseDownPosition.y = event.clientY;
}
function onDocumentMouseUp( event ) {
	event.preventDefault();
	isMouseDown = false;
	onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
	onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;
	if ( onMouseDownPosition.length() > 5 )
		return;
	render();
}
  function onDocumentMouseMove( event ) {
    event.preventDefault();
	
    if (isMouseDown) {
      theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
      phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
      phi = Math.min( 180, Math.max( 0, phi ) );
      camera.position.x = radius * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
      camera.position.y = radius * Math.sin( phi * Math.PI / 360 );
      camera.position.z = radius * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
      camera.updateMatrix();
    }
    mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	render();
}

function init()
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 )
    camera.position.x = radius * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 )
    camera.position.y = radius * Math.sin( phi * Math.PI / 360 )
    camera.position.z = radius * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 )
	
	// grid
	var size = 500, step = 50;
	var geometry = new THREE.Geometry();
	for ( var i = - size; i <= size; i += step ) {
		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
	}
	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
	var line = new THREE.Line( geometry, material, THREE.LinePieces );
	grid = line
	scene.add( line );
	
	
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	
	window.addEventListener( 'resize', onWindowResize, false );
}

function catworld()
{
	init();
	render();
}