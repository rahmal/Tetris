
export const getElement = (id) => {
  return document.getElementById(id);
}

export const getElementByClass = (cls) => {
  return document.getElementsByClassName(cls)[0];
}

export const createElement = (tag, {id = null, cls = null}) => {
  var $element = document.createElement(tag);
  if (id !== null) $element.setAttribute('id', id);
  if (cls !== null) $element.classList.add(cls);
  return $element;
}

export const appendElement = ($parent, tag, opts = {id: null, cls: null}) => {
  var $child = createElement(tag, opts);
  $parent.appendChild($child);
  return $child;
}

export const addEvent = ($element, event, callback) => {
  $element.addEventListener(event, callback);
}
