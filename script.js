const imageInput = document.querySelector("#image-input");
const imageSection = document.querySelector("#selector-items");

function handleCreate(src) {
    const imageItem = document.createElement("img");
    imageItem.src = src;
    imageItem.className = "item-image";
    imageItem.draggable = true;

    imageItem.addEventListener('dragstart', handleDragStar);
    imageItem.addEventListener('dragend', handleDrangEnd);

    imageSection.appendChild(imageItem);
}

function levelContenteditable(boolean) {
    const level = document.querySelectorAll('.label span');

    level.forEach((span) => {
        span.contentEditable = boolean;
    })

};

imageInput.addEventListener("change", (event) => {
    const [file] = event.target.files;

    if (file) {
        const reader = new FileReader();

        reader.onload = (eventReader) => {

            let src = eventReader.target.result;
            handleCreate(src)
        };


        reader.readAsDataURL(file);
    }
});

let draggedElement = null;

let sourceContainer = null;

function handleDragStar(event) {
    levelContenteditable(false);
    console.log('dragStar', event.target);
    draggedElement = event.target; //el elemento que estamos arrastrando
    sourceContainer = draggedElement.parentNode; //desde qué sitio estamos arrastrando el elemento
}

function handleDrangEnd(event) {
    levelContenteditable(true);
    console.log('dragend');
    //devolvemos las variables a su estado habitual
    draggedElement = null;
    sourceContainer = null;
}