const c = console.log;


const containerApp = document.querySelector('container-app');
const wrapper = containerApp.querySelector('wrapper');
const image = containerApp.querySelector('output-image');
const inputTitle = document.querySelector('#input-title');
const outputTitle = document.querySelector('output-title');
const btnUrl = document.querySelector('.btn-url');
const btnFile = document.querySelector('.btn-file');

// Title output auto update when input changes
inputTitle.oninput = function () {
    outputTitle.innerText = inputTitle.value;
} // inputTitle.oninput

outputTitle.onclick = function (e) {
    e.stopPropagation();
}

image.onclick = function (e) {
    c(e.offsetY);
    outputTitle.style = `top:${e.offsetY}`;
}

btnUrl.onclick = function () {
    let inputUrl = prompt('Nhập URL ảnh');
    const regexCheckUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;
    if (inputUrl.match(regexCheckUrlImage))
        image.style = `background-image: url(${inputUrl})`;
    else alert('URL không hợp lệ');
}

function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        image.style = `background-image: url(${reader.result})`;
    }
    reader.readAsDataURL(file);
}


