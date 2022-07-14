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

btnSaveImg.onclick = () => {
    html2canvas(image).then(function (canvas) {
        let anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = 'IMAGE.PNG';
        anchor.click();
    });
} // btnSaveImg.onclick

//Make the DIV element draggagle:
dragElement(containerApp.querySelector("#chay"));

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(element.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        // pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        // pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        // pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        // element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}