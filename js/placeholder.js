window.onload = function() {
	setPlaceholder();
}

function setPlaceholder() {

	if (elementSupportsAttribute('input', 'placeholder')) return;

	var elements = document.querySelectorAll('[placeholder]');

	for (var i = 0; i < elements.length; i++) {
		var placeholder = elements[i].getAttribute('placeholder');
		elements[i].setAttribute('value', placeholder);

		elements[i].onfocus = function() {
			this.setAttribute('value', '');
		};

		elements[i].onblur = function() {
			var placeholder = this.getAttribute('placeholder');
			this.setAttribute('value', placeholder);
		};
	};
};

function elementSupportsAttribute(element, attribute) {
	var test = document.createElement(element);
	return (attribute in test);
};