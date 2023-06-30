const divContain = document.body.children[0].children;

const text = document.getElementById("text");
const buttonShow = document.getElementById("show-hide");
const buttonBigger = document.getElementById("bigger");
const buttonSmaller = document.getElementById("smaller");

let counter = 0;
let size = 100;


buttonShow.onclick = function() {
    counter += 1;
    for(let i = 0; i < divContain.length; i++) {
        if (divContain[i].id !== 'show-hide') {
        divContain[i].classList.toggle('visible');
        }
        else {
            if (counter % 2 === 1) {
                divContain[i].innerText = 'Show text';
                
            }
            else {
                divContain[i].innerText = 'Hide text';
            }
        }
    }
}


buttonBigger.onclick = function() {
    size += 1;
    text.style.fontSize = size + 'px';
}

buttonSmaller.onclick = function() {
    size -= 1;
    text.style.fontSize = size + 'px';
}

