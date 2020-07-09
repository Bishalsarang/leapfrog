import { Rectangle } from './Components/Rectangle.js';
import { RoundRectangle } from './Components/RoundRectangle.js';


class SV {
	constructor(selector) {
		this.sv = document.querySelector(selector);
		this.sv.style.height = SVG_HEIGHT;
		this.sv.style.width = SVG_WIDTH;
		this.sv.setAttributeNS(null, 'viewBox',"0 0 " + SVG_WIDTH + " " + SVG_HEIGHT )
		this.shapeList = [];
		this.ShapesConstruct = {
			Rectangle: Rectangle,
			RoundRectangle: RoundRectangle,
		};

		this.eventHandler();
	}

	eventHandler() {}
}

let sv;
window.onload = function () {
	sv = new SV('#drawing-area');
	makeDraggable();
};

let allShapesBtn = document.querySelectorAll('.sidebar-shape');
// Add event handler for each button
allShapesBtn.forEach((button, index) => {
	button.addEventListener('click', () => {
		let clickedShape = button.getAttribute('title');

		let elem = new sv.ShapesConstruct[clickedShape]();
		elem.create();

		sv.shapeList.push(elem.getElement());
		sv.sv.appendChild(elem.getElement());
	});
});

function makeDraggable() {
    sv.sv.addEventListener('mousedown', startDrag);
    sv.sv.addEventListener('mousemove', drag);
    sv.sv.addEventListener('mouseup', endDrag);
    sv.sv.addEventListener('mouseleave', endDrag);
    sv.sv.addEventListener('touchstart', startDrag);


    function getMousePosition(evt) {
      var CTM = sv.sv.getScreenCTM();
      if (evt.touches) { evt = evt.touches[0]; }
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }

    var selectedElement, offset, transform;

    function initialiseDragging(evt) {
        offset = getMousePosition(evt);

        // Make sure the first transform on the element is a translate transform
        var transforms = selectedElement.transform.baseVal;

        if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
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
      if (evt.target.classList.contains('draggable')) {
        selectedElement = evt.target;
        initialiseDragging(evt);
      } else if (evt.target.parentNode.classList.contains('draggable-group')) {
        selectedElement = evt.target.parentNode;
        initialiseDragging(evt);
      }
    }

    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        var coord = getMousePosition(evt);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }

    function endDrag(evt) {
      selectedElement = false;
    }
  }


let selectedShape = null;
// Kunai shape select agrey vaney RIGHT sidebar ma tesko property aunu paryo
function listenDrawingArea() {
	document.querySelectorAll('#drawing-area > g').forEach((shape, index) => {
		shape.addEventListener('click', () => {
			// Uncheck if previously selected shapes if any
			if (selectedShape) {
				// Draw Bounding box
				let boundingBox = selectedShape.firstChild;
				boundingBox.setAttributeNS(null, 'x', 0);
				boundingBox.setAttributeNS(null, 'y', 0);
				boundingBox.setAttributeNS(null, 'width', 0);
				boundingBox.setAttributeNS(null, 'height', 0);
				
			}

			selectedShape = shape;
			let { x, y, width, height } = selectedShape.getBBox();

			// Draw Bounding box
			let boundingBox = selectedShape.firstChild;
			boundingBox.setAttributeNS(null, 'x', x);
			boundingBox.setAttributeNS(null, 'y', y);
			boundingBox.setAttributeNS(null, 'width', width);
			boundingBox.setAttributeNS(null, 'height', height);
			// Populate RIGHT ko sidebar
			let filledCheck = document.getElementById('fill-status');
			let pickedColor = document.getElementById('color-picker');

			// Change fill check box and color picker color
			filledCheck.checked = shape.getAttributeNS(null, 'fill');
			pickedColor.value = shape.getAttributeNS(null, 'fill');
		});
	});
}

// Listen to chaanges on drawing area every 100ms
setInterval(listenDrawingArea, 100);

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
			console.log('checked');
		} else {
			console.log('none');
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
