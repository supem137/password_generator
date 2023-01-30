let txtPassword = document.getElementById('txtPassword');
let btnGenerate = document.getElementById('btngenerate');
let txtpasswordLength = document.getElementById('passLength');
let passwordLengthSlider = document.getElementById('sliderPassLen');

let symbolInclude = document.getElementById('symbols');
let upperCaseInclude = document.getElementById('uppercase');
let lowerCaseInclude = document.getElementById('lowercase');
let numberInclude = document.getElementById('number');

let passStrengthBar = document.getElementById('passStrengthBar');


function generateCharactors(sym, uc, lc, num, passLen) {

    let passwordCharactors = [];
    let functionArr = [];

    let symbol = () => {
        const symbolChar = '`!@#$%^&*()_+?~';
        let randomSymbolSelect = Math.floor(Math.random() * symbolChar.length);
        passwordCharactors.push(symbolChar[randomSymbolSelect]);
    }

    let upperCase = () => {
        const upperCaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomULSelect = Math.floor(Math.random() * upperCaseLetter.length);
        passwordCharactors.push(upperCaseLetter[randomULSelect]);
    }

    let lowerCase = () => {
        const lowerCaseLetter = 'abcdefghijklmnopqrstuvwxyz';
        let randomLCSelect = Math.floor(Math.random() * lowerCaseLetter.length);
        passwordCharactors.push(lowerCaseLetter[randomLCSelect]);
    }

    let number = () => {
        const numbers = '0123456789';
        let randomNumberSelect = Math.floor(Math.random() * numbers.length);
        passwordCharactors.push(numbers[randomNumberSelect]);
    }

    if (sym) {
        functionArr.push(symbol);
    }
    if (uc) {
        functionArr.push(upperCase);
    }
    if (lc) {
        functionArr.push(lowerCase);
    }
    if (num) {
        functionArr.push(number);
    }

    let shuffledFunc = functionArr.map((value, index, array) => {

        let i = Math.floor(Math.random() * (array.length - index)) + index;

        let t = array[i];
        array[i] = value;
        return t;

    })

    for (let i = 0; i < passLen; i++) {

        shuffledFunc.forEach((prop) => {

            if (passwordCharactors.length < passLen) {
                return prop();
            }
        })
    }

    let txtpassword = document.getElementById('txtPassword');
    txtpassword.value = passwordCharactors.join('');

}

function checkingCheckBoxChecked() {
    let symbol = symbolInclude.checked;
    let uppercase = upperCaseInclude.checked;
    let lowercase = lowerCaseInclude.checked;
    let number = numberInclude.checked;

    let cb = [symbol, uppercase, lowercase, number];

    return cb;
}

let passLength;

passwordLengthSlider.addEventListener('input', (e) => {
    txtpasswordLength.value = e.target.value;
    passLength = e.target.value;
    pwLengthBar();
    generateCharactors(checkingCheckBoxChecked()[0], checkingCheckBoxChecked()[1], checkingCheckBoxChecked()[2], checkingCheckBoxChecked()[3], passLength);
});

txtpasswordLength.addEventListener('input', (e) => {
    passwordLengthSlider.value = e.target.value;
    passLength = e.target.value;
    pwLengthBar();
    generateCharactors(checkingCheckBoxChecked()[0], checkingCheckBoxChecked()[1], checkingCheckBoxChecked()[2], checkingCheckBoxChecked()[3], passLength);
});

btnGenerate.addEventListener('click', () => {
    pwLengthBar();
    generateCharactors(checkingCheckBoxChecked()[0], checkingCheckBoxChecked()[1], checkingCheckBoxChecked()[2], checkingCheckBoxChecked()[3], passLength);
})


function pwLengthBar() {

    if (passLength == 0) {
        passStrengthBar.style.width = '0';
    }
    else if (passLength <= 6) {

        passStrengthBar.style.backgroundColor = '#ef4444';
        passStrengthBar.style.width = '20%';
        passStrengthBar.classList.remove('bar')
        passStrengthBar.classList.add('bar1')
    }
    else if (passLength > 6 && passLength <= 8) {

        passStrengthBar.style.backgroundColor = '#f97316';
        passStrengthBar.style.width = '40%';
        passStrengthBar.classList.remove('bar')
        passStrengthBar.classList.add('bar1')
    }
    else if (passLength > 8 && passLength <= 10) {

        passStrengthBar.style.backgroundColor = '#ca8a04';
        passStrengthBar.style.width = '60%';
        passStrengthBar.classList.remove('bar')
        passStrengthBar.classList.add('bar1')
    }
    else {
        passStrengthBar.style.backgroundColor = '#65a30d';
        passStrengthBar.style.width = '100%';
        passStrengthBar.classList.remove('bar1')
        passStrengthBar.classList.add('bar');
    }
}

// copy password to the clipboard

let copytext = document.getElementById('copyText');

copytext.addEventListener('click', () => {

    txtPassword.select();
    navigator.clipboard.writeText(txtPassword.value);

})