// Write a program to sort an array of object by a target key. The original array should remain unchanged.

var arr = [
  {
    id: 1,
    name: "z",
  },
  {
    id: 2,
    name: "a",
  },
  {
    id: 3,
    name: "p",
  },
];

function sortBy(array, key) {
  return array.slice().sort(function (a, b) {
    if(a[key] < b[key])
      return -1;
    else if(b[key] < a[key]){
      return 1;
    }
    return 0;
  });
}

var sorted = sortBy(arr, "name");
console.log("Sorted Array: ", sorted);
console.log("Original Array: ", arr);
