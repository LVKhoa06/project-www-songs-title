const c = console.log;

// console.log('v3')
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
} // outputTitle.onclick

// image.onclick = function (e) {
//     c(e.offsetY);
//     outputTitle.style = `top:${e.offsetY}`;
// }


btnUrl.onclick = function () {
    const inputUrl = prompt('Nhập URL ảnh');
    const regexCheckUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;
    try {
        if (inputUrl.match(regexCheckUrlImage))
            image.style = `background-image: url(${inputUrl})`;
        else alert('URL không hợp lệ');
    } catch { }
} // btnUrl.onclick

function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
        image.style = `background-image: url(${reader.result})`;
    }
    reader.readAsDataURL(file);
} // encodeImageFileAsURL



outputTitle.onmousedown = function (e) {
    image.ondragstart = function () {
        return false;
    };

    // centers the outputTitle at (offsetY) coordinates
    function moveAt(offsetY) {
        outputTitle.style.top = offsetY + 'px'
    }

    // move our absolutely positioned outputTitle under the pointer
    function onMouseMove(e) {
        moveAt(e.offsetY);
    }

    // move the outputTitle on mousemove
    outputTitle.addEventListener('mousemove', onMouseMove);
    image.addEventListener('mousemove', onMouseMove);

    // drop the outputTitle, remove unneeded handlers
    outputTitle.onmouseup = function () {
        c(e.offsetY);
        outputTitle.removeEventListener('mousemove', onMouseMove);
        im.removeEventListener('mousemove', onMouseMove);
        outputTitle.onmouseup = null;
    };
};