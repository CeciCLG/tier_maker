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

    return imageItem
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
    event.dataTransfer.setData('text/plain', draggedElement.src); //transferencia de la información del src
}

function handleDrangEnd(event) {
    levelContenteditable(true);
    console.log('dragend');
    //devolvemos las variables a su estado habitual
    draggedElement = null;
    sourceContainer = null;
}

const rows = document.querySelectorAll('.tier .row');


rows.forEach(row => {
    row.addEventListener('drop', handleDrop);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('dragleave', handleDragLeave);
});



imageSection.addEventListener('drop', handleDrop);
imageSection.addEventListener('dragover', handleDragOver);
imageSection.addEventListener('dragleave', handleDragLeave);

function handleDrop(event) {
    event.preventDefault();
    console.log('drop');


    const { currentTarget, dataTransfer } = event;
    console.log(currentTarget);

    if (sourceContainer && draggedElement) {
        sourceContainer.removeChild(draggedElement);
    }

    if (draggedElement) {
        currentTarget.classList.remove('drag-over');
        const src = dataTransfer.getData('text/plain'); //sacamos la información del src que guardamos antes en el evento

        const imgElement = handleCreate(src);
        currentTarget.appendChild(imgElement);
    }
}
function handleDragOver(event) {
    event.preventDefault();
    console.log('dragOver');

    const { currentTarget } = event;
    if (sourceContainer === currentTarget) return

    currentTarget.classList.add('drag-over')

}
function handleDragLeave(event) {
    event.preventDefault();
    console.log('dragLeave');

    const { currentTarget } = event;

    currentTarget.classList.remove('drag-over');
}