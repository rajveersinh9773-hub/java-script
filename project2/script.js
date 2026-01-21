
function fibonacci(n) {
    let a = 0, b = 1;
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push(a);
        let next = a + b;
        a = b;
        b = next;
    }

    console.log(result.join(", "));
}


fibonacci(9); 

function sumOfDigits(num) {
    let sum = 0;

    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }

    return sum;
}

console.log(sumOfDigits(123));


function isPalindrome(num) {
    let original = num;
    let reverse = 0;

    while (num > 0) {
        reverse = reverse * 10 + (num % 10);
        num = Math.floor(num / 10);
    }

    if (original === reverse) {
        console.log("Palindrome");
    } else {
        console.log("Not Palindrome");
    }
}


isPalindrome(121);



function factorial(num) {
    let fact = 1;

    for (let i = 1; i <= num; i++) {
        fact *= i;
    }

    return fact;
}


console.log(factorial(5));



function reversenumber(num) {
    let reverse = 0;

    while (num > 0) {
        reverse = reverse * 10 + (num % 10);
        num = math.floor(num / 10);
    }

    return reverse;
}


console.log(reversenumber(123));
