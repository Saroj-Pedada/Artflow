var id = document.getElementsByTagName("img").length;
var zoom = 1;
const ZOOM_SPEED = 0.05;

window.addEventListener("paste", (e) => {
    f(e.clipboardData.files[0]);
});

function dblclicker(id) {
    let z = Number(document.getElementById(id).style.zIndex);
    console.log(Number(z))
    document.getElementById(id).style.zIndex = z + 1;
    console.log(id + "-" + z);
}

function myFunction() {
    f(document.getElementById("file").files[0]);
}

function dragAndResize() {
    $(".item").draggable();
    $(".item").resizable();
}

function f(file) {
    id = id + 1;
    var reader = new FileReader();
    reader.onload = function (e) {
        let temp = id;
        var imageBox = document.createElement("div");
        imageBox.classList.add("item");
        imageBox.id = String(id);
        imageBox.addEventListener("wheel", (k) => s(k, imageBox));
        imageBox.addEventListener("dblclick", () => dblclicker(temp));
        var image = document.createElement("img");
        image.src = e.target.result;
        imageBox.appendChild(image);
        document.body.appendChild(imageBox);
        dragAndResize();
    };
    reader.readAsDataURL(file);
    console.log(id);
}

function s(e, div) {
    if (e.deltaY > 0 && zoom >= 0.6) {
        zoom -= ZOOM_SPEED;
        div.style.transform = `scale(${zoom},${zoom})`;
    } else if (e.deltaY < 0 && zoom <= 1.4) {
        zoom += ZOOM_SPEED;
        div.style.transform = `scale(${zoom},${zoom})`;
    }
}