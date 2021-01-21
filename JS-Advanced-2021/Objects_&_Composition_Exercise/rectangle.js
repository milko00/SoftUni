function rectangle (width, height, color) {
    return {
        width, 
        height, 
        color,
        calcArea() {
            return this.width * this.height;
        }
    }  
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
