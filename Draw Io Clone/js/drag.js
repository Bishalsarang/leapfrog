/**
 * makeDraggable
 * @param {SV} sv SVG drawing area
 * Add draggable property to shapes drawn
 */
function makeDraggable(sv) {
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
    console.log("Mouse down")
		// FOr group <g></g> tag, the mouse selects the child node.
		// SO we find the parents
		if (evt.target.parentNode.classList.contains('draggable-group')) {
			selectedElement = evt.target.parentNode;
			initialiseDragging(evt);
		}
		// Sometimes we may select the actual path or shape of svg.
		// In that case we check for grandparent
		else if (
			evt.target.parentNode.parentNode.classList.contains('draggable-group')
		) {
			selectedElement = evt.target.parentNode.parentNode;
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
			// let newTransformation = selectedElement.getAttributeNS(
			// 	null,
			// 	'transform'
			// );
			let translate = selectedShape.getAttributeNS(null, 'translate');
			let rotate = selectedShape.getAttributeNS(null, 'rotate');
			let newTransformation = `translate(${translate}) rotate(${rotate})`;
			console.log(newTransformation);
			console.log(selectedElement.getAttributeNS(null, 'translate'));
			selectedElement.removeAttributeNS(null, 'transform');

			selectedElement.setAttribute('transform', newTransformation);
		}
		selectedElement = null;
	}
}
