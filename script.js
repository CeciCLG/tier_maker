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

let sourcerContainer = null;

function handleDragStar(event) {
    console.log('dragStar');
}

function handleDrangEnd(event) {
    console.log('dragend');

}