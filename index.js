var id = document.getElementsByTagName("img").length;
var zoom = 1;
const ZOOM_SPEED = 0.05;

window.addEventListener("paste", (e) => {
    f(e.clipboardData.files[0]);
});

function dblclicker(id) {
    let z = Number(document.getElementById(id).style.zIndex);
    document.getElementById(id).style.zIndex = z + 1;
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