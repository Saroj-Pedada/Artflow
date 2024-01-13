window.addEventListener("paste", (e) => {
    f(e.clipboardData.files[0]);
});

function myFunction() {
    f(document.getElementById("file").files[0]);
}

function dragAndResize() {
    $(".item").draggable();
    $(".item").resizable();
}

function f(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var cross = document.createElement("div");
        cross.innerHTML = "&times;";
        cross.classList.add("cross");
        cross.addEventListener("click", () => {
            document.body.removeChild(imageBox);
        });
        var image = document.createElement("img");
        image.src = e.target.result;
        var imageBox = document.createElement("div");
        imageBox.classList.add("item");
        imageBox.addEventListener("dblclick", () => {
            imageBox.style.zIndex = Number(imageBox.style.zIndex) + 1;
        });
        imageBox.setAttribute('tabindex', '0');
        imageBox.addEventListener("keydown", (e) => {
            if (e.key == "Backspace") {
                e.preventDefault();
                document.body.removeChild(imageBox);
            }
        })
        imageBox.appendChild(cross);
        imageBox.appendChild(image);
        document.body.appendChild(imageBox);
        dragAndResize();
    };
    reader.readAsDataURL(file);
}
