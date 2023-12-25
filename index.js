var id = document.getElementsByTagName("img").length;
var zoom = 1;
const ZOOM_SPEED = 0.05;

function myFunction() {
    f(document.getElementById("file").files[0]);
}

window.addEventListener("paste", (e) => {
    f(e.clipboardData.files[0]);
});

function dragAndResize() {
    $(".item").draggable();
    $(".item").resizable();
}

function f(file) {
    id = id + 1;
    var reader = new FileReader();
    reader.onload = function (e) {
        var imageBox = document.createElement("div");
        imageBox.classList.add("item");
        imageBox.id = String(id);
        imageBox.addEventListener("wheel", (k) => s(k, imageBox));
        var image = document.createElement("img");
        image.src = e.target.result;
        image.id = String(id);
        imageBox.appendChild(image);
        document.body.appendChild(imageBox);
        dragAndResize();
    };
    reader.readAsDataURL(file);
    console.log(id);
}

function s(e, div) {
    if (e.deltaY > 0) {
        zoom -= ZOOM_SPEED;
        div.style.transform = `scale(${zoom},${zoom})`;
    } else {
        zoom += ZOOM_SPEED;
        div.style.transform = `scale(${zoom},${zoom})`;
    };
}