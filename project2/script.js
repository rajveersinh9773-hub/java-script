function fibonacci(n) {
    let a = 0, b = 1;

    for (let i = 1; i <= n; i++) {
        console.log(a);
        let next = a + b;
        a = b;
        b = next;
    }
}
function sum(num) {
    let sum = 0;

    while (num > 0) {
        sum = sum + (num % 10);
        num = (num - (num % 10)) / 10;
    }

    return sum;
}


function isPalindrome(num) {
    let original = num;
    let reverse = 0;

    while (num > 0) {
        let digit = num % 10;
        reverse = reverse * 10 + digit;
        num = (num - digit) / 10;
    }

    if (original === reverse) {
        console.log("Palindrome");
    } else {
        console.log("Not Palindrome");
    }
}

function factorial(n) {
    let fact = 1;

    for (let i = 1; i <= n; i++) {
        fact = fact * i;
    }

    return fact;
}



function reversenumber(num) {
    let reverse = 0;

    while (num > 0) {
        let digit = num % 10;
        reverse = reverse * 10 + digit;
        num = (num - digit) / 10;
    }

    return reverse;
}


