var id = document.getElementsByTagName("img").length;
var zoom = 1;
const ZOOM_SPEED = 0.05;

function myFunction() {
    let file = document.getElementById("file").files[0];
    f(file);
}

window.addEventListener("paste", (e) => {
    let file = e.clipboardData.files[0];
    f(file)
});

document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        zoom -= ZOOM_SPEED;
        document.body.style.transform = `scale(${(zoom)})`;
    } else {
        zoom += ZOOM_SPEED;
        document.body.style.transform = `scale(${(zoom)})`;
    }
});

function dragAndResize() {
    $(".item").draggable();
    $(".item").resizable();
};

function f(file) {
    id = id + 1;
    var reader = new FileReader();
    reader.onload = function (e) {
        var imageBox = document.createElement("div");
        imageBox.classList.add("item");
        imageBox.id = String(id);
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