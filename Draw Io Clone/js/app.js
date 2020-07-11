import { Circle } from './components/Circle.js';
import { Square } from './components/Square.js';
import { Ellipse } from './components/Ellipse.js';
import { Rectangle } from './components/Rectangle.js';
import { Diamond } from './components/Diamond.js';
import { RoundRectangle } from './components/RoundRectangle.js';
import { Line } from './components/Line.js';

class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		this.sv.style.height = SVG_HEIGHT;
		this.sv.style.width = SVG_WIDTH;
		this.sv.setAttributeNS(
			null,
			'viewBox',
			'0 0 ' + SVG_WIDTH  + ' ' + SVG_HEIGHT 
		);
		this.shapeList = [];
		this.ShapesConstruct = {
			Rectangle: Rectangle,
			RoundRectangle: RoundRectangle,
			Ellipse: Ellipse,
			Square: Square,
			Circle: Circle,
			Diamond: Diamond,
			Line: Line,
		};
	}

}

let sv;
window.onload = function () {
	sv = new SV('#drawing-area');
	addEventListenerLeftSideBar();
	makeDraggable();
	shapeDeleteEventListener();
};

/**
 * addEventListenerLeftSideBar
 * Add Event Lsitener to left sidebar buttons used to create shape
 */
function addEventListenerLeftSideBar() {
	let allShapesBtn = document.querySelectorAll('.sidebar-shape');
	// Add event handler for each button
	allShapesBtn.forEach((button, index) => {
		button.addEventListener('click', () => {
			let clickedShape = button.getAttribute('title');

			let elem = new sv.ShapesConstruct[clickedShape]({sv: sv.sv});
			// console.log("create", elem.getElement().getBBox());
			elem.create();

			// Add event listener to shape to change property by and on right sidebar
			shapeEventListener(elem.getElement());
			sv.shapeList.push(elem.getElement());
			// sv.sv.appendChild(elem.getElement());

		});
	});
}

/**
 * makeDraggable
 * Add draggable property to shapes drawn
 */
function makeDraggable() {
	sv.sv.addEventListener('mousedown', startDrag);
	sv.sv.addEventListener('mousemove', drag);
	sv.sv.addEventListener('mouseup', endDrag);
	sv.sv.addEventListener('mouseleave', endDrag);

	function getMousePosition(evt) {
		let CTM = sv.sv.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d,
		};
	}

	let selectedElement, offset, transform;

	function initialiseDragging(evt) {
		offset = getMousePosition(evt);

		// Make sure the first transform on the element is a translate transform
		var transforms = selectedElement.transform.baseVal;

		if (
			transforms.length === 0 ||
			transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
		) {
			// Create an transform that translates by (0, 0)
			var translate = sv.sv.createSVGTransform();
			translate.setTranslate(0, 0);
			selectedElement.transform.baseVal.insertItemBefore(translate, 0);
		}

		// Get initial translation
		transform = transforms.getItem(0);
		offset.x -= transform.matrix.e;
		offset.y -= transform.matrix.f;
	}

	function startDrag(evt) {
		// FOr group <g></g> tag, the mouse selects the child node.
		// SO we find the parent
		if (evt.target.parentNode.classList.contains('draggable-group')) {
			selectedElement = evt.target.parentNode;
			initialiseDragging(evt);
		}
	}

	function drag(evt) {
		if (selectedElement) {
			evt.preventDefault();
			let coord = getMousePosition(evt);
			transform.setTranslate(coord.x - offset.x, coord.y - offset.y);

			selectedElement.setAttributeNS(
				null,
				'translate',
				coord.x - offset.x + ' ' + (coord.y - offset.y)
			);
		}
	}

	function endDrag(evt) {
		if (selectedElement) {
			let newTransformation = selectedElement.getAttributeNS(
				null,
				'transform'
			);

			selectedElement.removeAttributeNS(null, 'transform');

			selectedElement.setAttribute('transform', newTransformation);
		}
		// console.log(selectedElement);
		//
		selectedElement = false;
	}
}



let selectedShape = null;
function drawControls(x, y, width, height){
	// let points = [[x + 5 , y + 5], // NW
   //                   [x + width / 2, y + 5], // N
   //                   [x + width - 5, y + 5], // NE

   //                   [x + 5, y + height / 2], // W
   //                   [x + width - 5, y + height / 2], // E

   //                   [x + 5, y + height - 5], // SW
   //                   [x + width / 2, y + height - 5], // S
   //                   [x + width - 5, y + height - 5] // SE
	//                ]
	
	let points = [[x - 10, y - 10], // NW
                     [x + width / 2, y - 10], // N
                     [x + width + 10, y - 10], // NE

                     [x - 10, y + height / 2], // W
                     [x + width + 10, y + height / 2], // E

                     [x - 10, y + height + 10], // SW
                     [x + width / 2, y + height + 10], // S
                     [x + width + 10, y + height + 10] // SE
                  ]
	// Draw controls
	let controlButtons = selectedShape.querySelectorAll('.handle-button');
	for(let i = 0; i < 8; i++){
		let controlButton = controlButtons[i];
		let [x, y] = points[i];
		controlButton.setAttributeNS(null, 'cx', x);
		controlButton.setAttributeNS(null, 'cy', y);
		controlButton.setAttributeNS(null, 'rx', '5');
		controlButton.setAttributeNS(null, 'ry', '5');

	}	
}

function resetControls(){
	// Draw controls
	let controlButtons = selectedShape.querySelectorAll('.handle-button');
	for(let i = 0; i < 8; i++){
		let controlButton = controlButtons[i];
		controlButton.removeAttributeNS(null, 'cx');
		controlButton.removeAttributeNS(null, 'cy');
		controlButton.removeAttributeNS(null, 'rx');
		controlButton.removeAttributeNS(null, 'ry');
	}

}

// Kunai shape select garey vaney RIGHT sidebar ma tesko property aunu paryo
function shapeEventListener(shape) {
	shape.addEventListener('click', () => {
		// Uncheck if previously selected shapes if any
		if (selectedShape) {
			// Draw Bounding box
			let boundingBox = selectedShape.firstChild;
			boundingBox.setAttributeNS(null, 'x', 0);
			boundingBox.setAttributeNS(null, 'y', 0);
			boundingBox.setAttributeNS(null, 'width', 0);
			boundingBox.setAttributeNS(null, 'height', 0);

			resetControls();
		}

		selectedShape = shape;
		let { x, y, width, height } = selectedShape.getBBox();
		console.log(selectedShape);
		// console.log(x, y, width, height);
		// Draw Bounding box
		let boundingBox = selectedShape.firstChild;
		boundingBox.setAttributeNS(null, 'x', x);
		boundingBox.setAttributeNS(null, 'y', y);
		boundingBox.setAttributeNS(null, 'width', width);
		boundingBox.setAttributeNS(null, 'height', height);

		
		drawControls(x, y, width, height);

		// Populate RIGHT ko sidebar
		let filledCheck = document.getElementById('fill-status');
		let pickedColor = document.getElementById('color-picker');

		// Change fill check box and color picker color
		filledCheck.checked = shape.getAttributeNS(null, 'fill');
		pickedColor.value = shape.getAttributeNS(null, 'fill');
	});
}


function shapeDeleteEventListener(){
	
	window.addEventListener('keydown', (e) =>{
		if(selectedShape){
			if(e.code == 'Delete' || e.code == 'Backspace'){
				sv.sv.removeChild(selectedShape);
			}
		}
	});
}
// Right Side ko kunai property ma click garera chnage garey left side ko selected object ma change hunu paryo
let pickedColor = document.getElementById('color-picker');
pickedColor.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
	}
});

let filledCheck = document.getElementById('fill-status');
filledCheck.addEventListener('change', (e) => {
	// If selected shape xa vaney change the property
	if (selectedShape) {
		if (filledCheck.checked) {
			selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
		} else {
			selectedShape.setAttributeNS(null, 'fill', 'none');
		}
	}
});

let gradientStatus = document.getElementById('gradient-status');
let gradientDirection = document.getElementById('gradient-direction');
let gradientColorPicker = document.getElementById('gradient-color-picker');

let lineStatus = document.getElementById('line-status');
let lineType = document.getElementById('line-type');
let lineWidth = document.getElementById('line-width');
lineWidth.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(null, 'stroke-width', lineWidth.value);
	}
});

let opacity = document.getElementById('opacity');
opacity.addEventListener('change', (e) => {
	if (selectedShape) {
		selectedShape.setAttributeNS(
			null,
			'fill-opacity',
			parseInt(opacity.value) / 100
		);
	}
});

let rotation = document.getElementById('rotate');
rotation.addEventListener('change', (e) => {
	if (selectedShape) {
		let translate = selectedShape.getAttributeNS(null, 'translate');
		let scale = selectedShape.getAttributeNS(null, 'scale');
		let rotate = rotation.value;

		let newTransformation = `translate(${translate}) rotate(${rotate})`;

		selectedShape.setAttributeNS(null, 'translate', translate);
		selectedShape.setAttributeNS(null, 'rotate', rotate);

		selectedShape.setAttributeNS(null, 'transform', newTransformation);
	}
});
