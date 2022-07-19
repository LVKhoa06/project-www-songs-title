/*------------------------------------*/'use strict'/*------------------------------------*/
//#region declare const start
const c = console.log;
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
const regexCheckUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;
//#endregion declare const end

//#region block code start
// Title output auto update when input changes
inputTitle.oninput = function () {
    outputTitle.innerText = inputTitle.value;
} // inputTitle.oninput

inputTitle.onkeydown = function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        btnSaveImg.click();
    }
} // inputTitle.onkeydown

btnUrl.onclick = async function () {
    const inputUrl = prompt('Nhập URL ảnh');

    // check link hop le
    try {
        if (!inputUrl.match(regexCheckUrlImage))
            if (inputUrl == '') {
                return alert('URL Image trống');
            } else alert('URL Image không hợp lệ');
        try {
            if (inputUrl.match(regexCheckUrlImage)) {
                await fetch(inputUrl);
                image.style.backgroundImage = `url(${inputUrl})`;
            }
        } catch (error) {
            alert('Không thể lấy hình ảnh');
        }
    } catch { }
} // btnUrl.onclick
let nPaddingImage = window.getComputedStyle(image).padding.replace('px', '');

// case 1 = bottom;
// case 2 = top;
// case 3 = center;
let TITLE_POSITIONS = 1;
outputTitle.ontouchend = function () {

    switch (TITLE_POSITIONS) {
        case 1:
            outputTitle.style.top = image.offsetHeight - outputTitle.offsetHeight - Number(nPaddingImage);
            TITLE_POSITIONS = 2;

            break;
        case 2:
            outputTitle.style.top = 0 + Number(nPaddingImage);
            TITLE_POSITIONS = 3;

            break;
        case 3:
            outputTitle.style.top = (image.offsetHeight - outputTitle.offsetHeight) / 2;
            TITLE_POSITIONS = 1;

            break;
    }
} // outputTitle.ontouchend

//Make the DIV element draggagle:
function dragElement(element) {
    var pos1 = 0, pos2 = 0;
    if (containerApp.querySelector(`#${element.id}`)) {
        /* if present, the header is where you move the DIV from:*/
        containerApp.querySelector(`#${element.id}`).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        element.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos2 = e.clientY;
        containerApp.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        containerApp.onmousemove = elementDrag;
    }
    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos2 - e.clientY;
        pos2 = e.clientY;
        element.style.top = element.offsetTop - pos1;

        if (element.offsetTop - pos1 < nPaddingImage) {
            element.style.top = window.getComputedStyle(image).padding;
        } else if (element.offsetTop - pos1 > image.offsetHeight - outputTitle.offsetHeight - nPaddingImage) {
            element.style.top = image.offsetHeight - outputTitle.offsetHeight - nPaddingImage;
        }
    }
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        containerApp.onmouseup = null;
        containerApp.onmousemove = null;
    }
} // dragElement
dragElement(containerApp.querySelector("#drag-drop"));

function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
        image.style.backgroundImage = `url(${reader.result})`;
    }
    reader.readAsDataURL(file);
} // encodeImageFileAsURL
const defaultImg = './assets/img/background.jpg';
iconRe.onclick = function () {
    inputTitle.value = '';
    outputTitle.textContent = '';
    localStorage.setItem('urlImg', defaultImg);
    image.style.backgroundImage = `url(${defaultImg})`;
} // iconRe.onclick

iconHeart.onclick = function () {
    iconHeart.classList.toggle('icon-heart-click');
    const getUrl = image.style.backgroundImage.replace('url("', '').replace('")', '');
    if (getUrl.match(regexCheckUrlImage)) {
        localStorage.setItem('urlImg', image.style.backgroundImage);
    } else if (image.style.backgroundImage == localStorage.getItem('defaultImg')) {
        localStorage.setItem('urlImg', localStorage.getItem('defaultImg'));
    }
    else {
        html2canvas(image).then(function (canvas) {
            let anchor = document.createElement('a');
            anchor.href = canvas.toDataURL('image/png');
            localStorage.setItem('urlImg', `url(${anchor.href})`);
        })
    }
} // iconHeart.onclick

window.onload = function () {
    image.style.backgroundImage = `url(${defaultImg})`;
    if (localStorage.getItem('urlImg') != `url("${defaultImg}")`) {

        image.style.backgroundImage = localStorage.getItem('urlImg');
    }

    // image.style.backgroundImage = `url(${defaultImg})`;
} // window.onload

const html2canvasOption = {
    allowTaint: true,
    useCORS: true
} // html2canvasOption
btnSaveImg.onclick = () => {
    let nameFile = outputTitle.textContent.replace(' ', '-');
    html2canvas(image, html2canvasOption).then(function (canvas) {
        let anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = `${nameFile}`;
        anchor.click();
    });
} // btnSaveImg.onclick
//#endregion block code end