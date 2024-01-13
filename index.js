var mode = "light-mode";

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
    let reader = new FileReader();
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
        imageBox.classList.add(mode);
        imageBox.addEventListener("dblclick", () => {
            imageBox.style.zIndex = Number(imageBox.style.zIndex) + 1;
        });
        imageBox.appendChild(cross);
        imageBox.appendChild(image);
        document.body.appendChild(imageBox);
        dragAndResize();
    };
    reader.readAsDataURL(file);
}

function toggle() {
    if (mode == "light-mode") {
        document.documentElement.style.backgroundColor = "#2f2f2f";
        document.documentElement.style.color = "white";
        let elements = $(".light-mode");
        for (let e of elements) {
            e.classList.remove("light-mode");
            e.classList.add("dark-mode");
        }
        mode = "dark-mode";
    } else {
        document.documentElement.style.backgroundColor = "white";
        document.documentElement.style.color = "#2f2f2f";
        let elements = $(".dark-mode");
        for (let e of elements) {
            e.classList.remove("dark-mode");
            e.classList.add("light-mode");
        }
        mode = "light-mode";
    }
}
