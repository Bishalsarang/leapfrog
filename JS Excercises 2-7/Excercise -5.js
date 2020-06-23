//

var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  transformedCollection = [];
  for (var element of collection) {
    transformedCollection.push(tranFunc(element));
  }
  return transformedCollection;
}

var output = transform(numbers, function (num) {
  return num * 2;
});

console.log(output);
