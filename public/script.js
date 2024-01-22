let allSelectorImages = document.querySelector(".all-selector-imgs").children;
let allImages = document.querySelector(".all-imgs").children;
let selectorDots = document.querySelectorAll(".dot");
let currentFocus = 0;

allImages[currentFocus].classList.add("focused");

function changeFocus(n) {
    allImages[currentFocus].classList.remove("focused");
    currentFocus = n;
    allImages[currentFocus].classList.add("focused");
}

for (let i = 0; i < allSelectorImages.length; i++) {
    let changerFunc = () => {
        changeFocus(i);
    };
    allSelectorImages[i].onclick = changerFunc;
    selectorDots[i].onclick = changerFunc;
}
