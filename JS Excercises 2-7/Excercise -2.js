function printPattern(numRows){
    for(var i = 0; i < numRows; i++){
        currentRow = "";
        for(var j = i; j < numRows; j++){
            currentRow += "*";
        }
        console.log(currentRow);
    }
}
