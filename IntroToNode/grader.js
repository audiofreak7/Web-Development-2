// Return the rounded average of an array of numbers.

//METHOD 1
function average(scores) {
    var totalScore = 0;
    scores.forEach(function(score) {
        totalScore += score;
    });
    var averageGrade = Math.round(totalScore / scores.length);
    return averageGrade;
}

// METHOD 2
function average2(scores) {
    var sum = 0;

    if (scores.length) {
        sum = scores.reduce(function(a, b) { return a + b; });
        return Math.round(sum / scores.length);
    }   
    return 0;
}

// METHOD 3
const average3 = scores => Math.round(scores.reduce((a,b) => a + b, 0) / scores.length);


var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
console.log(average2(scores));
console.log(average3(scores));


var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
console.log(average2(scores2));
console.log(average3(scores2));