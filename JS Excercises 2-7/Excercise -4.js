// Q. Write a function that searches for an object by a specific key value in an array of objects:

function searchByName(container, value) {
  for (var element of container) {
    if (
      element.name.toString().toUpperCase() == value.toString().toUpperCase()
    ) {
      return element;
    }
  }
  return {};
}

function searchByKey(container, key, value) {
  value = value.toString();
  for (var element of container) {
    if (
      element[key].toString().toUpperCase() == value.toString().toUpperCase()
    ) {
      return element;
    }
  }
  return {};
}

var fruits = [{
    id: 1,
    name: "Banana",
    color: "Yellow"
  },
  {
    id: 2,
    name: "Apple",
    color: "Red"
  },
];

// console.log(searchByName(fruits, 'apple'));
console.log(searchByKey(fruits, "name", "apple"));
console.log(searchByKey(fruits, "id", 2));
console.log(searchByKey(fruits, "name", "apple"));
console.log(searchByKey(fruits, "name", "apple"));