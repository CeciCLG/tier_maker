const imageInput = document.querySelector("#image-input");
const imageSection = document.querySelector("#selector-items");
const resetList = document.querySelector('#reset-list');

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
    const { files } = event.target;

    Array.from(files).forEach(file => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (eventReader) => {

                let src = eventReader.target.result;
                handleCreate(src)
            };

            reader.readAsDataURL(file);
        }
    });
});

let draggedElement = null;

let sourceContainer = null;

function handleDragStar(event) {
    levelContenteditable(false);

    draggedElement = event.target; //el elemento que estamos arrastrando
    sourceContainer = draggedElement.parentNode; //desde qué sitio estamos arrastrando el elemento
    event.dataTransfer.setData('text/plain', draggedElement.src); //transferencia de la información del src
}

function handleDrangEnd(event) {
    levelContenteditable(true);
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


    const { currentTarget, dataTransfer } = event;

    if (sourceContainer === currentTarget) return


    if (sourceContainer && draggedElement) {
        sourceContainer.removeChild(draggedElement);
    }

    if (draggedElement) {
        const src = dataTransfer.getData('text/plain'); //sacamos la información del src que guardamos antes en el evento

        const imgElement = handleCreate(src);
        currentTarget.appendChild(imgElement);
    }

    currentTarget.classList.remove('drag-over');
    currentTarget.querySelector('.drag-preview')?.remove();
}

function handleDragOver(event) {
    event.preventDefault();

    const { currentTarget, dataTransfer } = event;
    if (sourceContainer === currentTarget) return

    currentTarget.classList.add('drag-over');

    const dragPreview = document.querySelector('.drag-preview')

    if (draggedElement && !dragPreview) {
        const previewElement = draggedElement.cloneNode(true);
        previewElement.classList.add('drag-preview')
        currentTarget.appendChild(previewElement);
    }

};


function handleDragLeave(event) {
    event.preventDefault();

    const { currentTarget } = event;

    currentTarget.classList.remove('drag-over');
    currentTarget.querySelector('.drag-preview')?.remove();
}


resetList.addEventListener('click', () => {
    const items = document.querySelectorAll('.tier .item-image');

    items.forEach(item => {
        item.remove();
        imageSection.appendChild(item);
    })
});

imageSection.addEventListener('drop', handleDropFromDesktop);
imageSection.addEventListener('dragover', handleDragFromDesktop);

function handleDropFromDesktop(event) {
    event.preventDefault();
}

function handleDragFromDesktop(event) {
    event.preventDefault();

    const { dataTransfer, currentTarget } = event;

    console.log({ dataTransfer, currentTarget });

    console.log(dataTransfer.items[0].type);


    if (dataTransfer.types.includes('Files') && dataTransfer.items[0].type.includes('image')) {
        currentTarget.classList.remove('drag-no-files');
        currentTarget.classList.add('drag-files');
    } else {
        currentTarget.classList.remove('drag-files');
        currentTarget.classList.add('drag-no-files');
    }
}