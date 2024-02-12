var mode = "light-mode";
var secret = "Wellthisismykeybutdonttellanyone";
var infodone = 0;

$(document).ready(function () {
  $(".item").css('z-index', 0);
  dragAndResize();
});

window.addEventListener("paste", (e) => {
  if (e.clipboardData.files.length == 0) {
    alert("No file found");
    return;
  };
  f(e.clipboardData.files[0]);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    save();
  }
}, false);

function myFunction() {
  if (document.getElementById("file").files.length == 0) {
    alert("No file found");
    return;
  };
  f(document.getElementById("file").files[0]);
}

function k() {
  let h = Number(document.documentElement.scrollHeight) * 0.89;
  let w = Number(document.documentElement.scrollWidth) * 0.99;
  let f = document.getElementById("file");
  f.style.height = String(h) + "px";
  f.style.width = String(w) + "px";
}

function dragAndResize() {
  let x = $(".item");
  x.draggable();
  x.resizable();
  x.on('dblclick', function () {
    console.log($(this).css('z-index'));
    $(this).css('z-index', parseInt($(this).css('z-index')) + 1);
  });
  let y = $(".cross");
  y.on('click', function () {
    $(this).parent().remove();
  })
}

function f(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    var cross = document.createElement("div");
    cross.innerHTML = "&times;";
    cross.classList.add("cross");
    var image = document.createElement("img");
    image.src = e.target.result;
    var imageBox = document.createElement("div");
    imageBox.classList.add("item");
    imageBox.classList.add(mode);
    imageBox.appendChild(cross);
    imageBox.appendChild(image);
    document.getElementById("container").appendChild(imageBox);
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

function save() {
  let data = document.getElementById("container").innerHTML;
  data = CryptoJS.AES.encrypt(data, secret).toString();
  let a = document.createElement("a");
  a.href = "data:text/html," + encodeURIComponent(data);
  a.download = "artflow.flow";
  a.click();
}

function load() {
  let fileInput = document.getElementById("loadfile");
  fileInput.addEventListener("change", function (e) {
    if (fileInput.files.length > 0) {
      let file = fileInput.files[0];
      handleLoadedFile(file);
    } else {
      alert("No file selected");
    }
  });
  fileInput.click();
}

function handleLoadedFile(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    let content = e.target.result;
    content = CryptoJS.AES.decrypt(content, secret);
    document.getElementById("container").innerHTML = content.toString(CryptoJS.enc.Utf8);
    toggle();
    toggle();
    dragAndResize();
  };
  reader.readAsText(file);
}

function info() {
  if(infodone == 1){
    return
  }
  infodone = 1;
  var infoBox = document.createElement("div");
  infoBox.classList.add("infoBox");
  var cross = document.createElement("div");
  cross.innerHTML = "&times;";
  cross.classList.add('info-cross')
  cross.style.color = "white";
  cross.style.transition = "color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)";
  cross.onmouseenter = function(){
    cross.style.color = "red";
  }
  cross.onmouseleave = function(){
    cross.style.color = "white";
  }
  cross.style.cursor = "pointer";
  var info = document.createElement("iframe");
  info.src = "/info";
  info.classList.add("infoFrame");
  infoBox.appendChild(cross);
  infoBox.appendChild(info);
  document.body.appendChild(infoBox);
  cross.addEventListener("click", function () {
    infoBox.remove();
    infodone = 0;
  })
}