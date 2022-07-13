const c = console.log;

// console.log('v3')
const containerApp = document.querySelector('container-app');
const wrapper = containerApp.querySelector('wrapper');
const image = containerApp.querySelector('output-image');
const inputTitle = document.querySelector('#input-title');
const outputTitle = document.querySelector('output-title');
const btnUrl = document.querySelector('.btn-url');
const btnFile = document.querySelector('.btn-file');
const btnSaveImg = document.querySelector('.btn-save-image');
const iconRe = document.querySelector('.icon-re');
const iconHeart = document.querySelector('.icon-heart');

// Title output auto update when input changes
inputTitle.oninput = function () {
    outputTitle.innerText = inputTitle.value;
} // inputTitle.oninput

outputTitle.onclick = function (e) {
    e.stopPropagation();
} // outputTitle.onclick

image.onclick = function (e) {
    c(e.offsetY);
    outputTitle.style = `top:${e.offsetY}`;
}


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

btnSaveImg.onclick = () => {
    html2canvas(image).then(function (canvas) {
        let anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = 'IMAGE.PNG';
        anchor.click();
    });
} // btnSaveImg.onclick

iconRe.onclick = function () {
    image.style = 'background-image: url(./assets/img/background.jpg)';
    localStorage.setItem('urlImg', './assets/img/background.jpg');
} // iconRe.onclick

iconHeart.onclick = function () {
    html2canvas(image).then(function (canvas) {
        let anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = 'IMAGE.PNG';
        localStorage.setItem('urlImg', anchor.href);
    })
} // iconHeart.onclick

window.onload = () => {
    image.style = `background-image: url(${localStorage.getItem('urlImg')})`;
} // window.onload 