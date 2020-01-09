function toggleMode() {
    var container = document.getElementById("container");
    var containerCurrentClass = container.className;
    container.className = (containerCurrentClass == "container-lm") ? "container-dm" : "container-lm";
}