var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;
let totalTwosInMatrix = 0;

window.onload = function() {
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);

           
        }
    }

    // Add event listener to draw button
    document.getElementById("drawButton").addEventListener("click", drawPieces);

    document.getElementById("drawButton2").addEventListener("click", drawPieces2);
}

let selectedImages = []; // Mảng chứa các hình đã được chọn

function drawPieces() {
    // Clear existing pieces if any
    document.getElementById("pieces").innerHTML = "";

    // Array of image groups
    let imageGroups = {
        1: ["1.png", "2.png", "3.png", "4.png", "5.png"],
        2: ["6.png", "7.png", "8.png", "9.png", "10.png"],
        3: ["11.png", "12.png", "13.png", "14.png", "15.png"],
        4: ["16.png", "17.png", "18.png", "19.png", "20.png"]
    };

    // Array to keep track of all images
    let allImages = [];
    for (let i = 1; i <= 4; i++) {
        allImages = allImages.concat(imageGroups[i]);
    }

    // Lọc ra các hình ảnh chưa được chọn từ danh sách tất cả hình ảnh
    let availableImages = allImages.filter(image => !selectedImages.includes(image));

    // Kiểm tra nếu không còn đủ hình ảnh để chọn
    if (availableImages.length < 4) {
        alert("Not enough images available.");
        return; // Kết thúc hàm nếu không còn đủ hình ảnh
    }

    // Randomly select 4 images from the available images
    let selectedIndices = [];
    while (selectedIndices.length < 4) {
        let randomIndex = Math.floor(Math.random() * availableImages.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
        }
    }

    // Display the selected images
    for (let i = 0; i < selectedIndices.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + availableImages[selectedIndices[i]];

       

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);     //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }

    // Add the selected images to the list of selected images
    selectedImages = selectedImages.concat(selectedIndices.map(index => availableImages[index]));


}

let selectedImages2 = []; // Mảng chứa các hình đã được chọn

function drawPieces2() {
    // Clear existing pieces if any
    document.getElementById("pieces2").innerHTML = "";

    // Array of image groups
    let imageGroups = {
        1: ["1.png", "2.png", "3.png", "4.png", "5.png"],
        2: ["6.png", "7.png", "8.png", "9.png", "10.png"],
        3: ["11.png", "12.png", "13.png", "14.png", "15.png"],
        4: ["16.png", "17.png", "18.png", "19.png", "20.png"]
    };

    // Array to keep track of all images
    let allImages = [];
    for (let i = 1; i <= 4; i++) {
        allImages = allImages.concat(imageGroups[i]);
    }

    // Lọc ra các hình ảnh chưa được chọn từ danh sách tất cả hình ảnh
    let availableImages = allImages.filter(image => !selectedImages2.includes(image));

    // Kiểm tra nếu không còn đủ hình ảnh để chọn
    if (availableImages.length < 4) {
        alert("Not enough images available.");
        return; // Kết thúc hàm nếu không còn đủ hình ảnh
    }

    // Randomly select 4 images from the available images
    let selectedIndices = [];
    while (selectedIndices.length < 4) {
        let randomIndex = Math.floor(Math.random() * availableImages.length);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
        }
    }

    // Display the selected images
    for (let i = 0; i < selectedIndices.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + availableImages[selectedIndices[i]];

       

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);     //after you completed dragDrop

        document.getElementById("pieces2").append(tile);
    }

    // Add the selected images to the list of selected images
    selectedImages2 = selectedImages2.concat(selectedIndices.map(index => availableImages[index]));
  
}



//DRAG TILES
function dragStart(e) {
    currTile = this; //this refers to image that was clicked on for dragging
    e.dataTransfer.setData("text", e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop(e) {
    e.preventDefault();
    otherTile = this; //this tham chiếu đến hình ảnh đang được thả vào
    let data = e.dataTransfer.getData("text");
    let draggedTile = document.getElementById(data);
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

}



function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }


   
}



let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    let maxMarginTop = 500; // Define the maximum margin-top value here
    let adjustedMarginTop = Math.min(maxMarginTop, value * 1); // Limit the value to maxMarginTop
    hill1.style.marginTop = adjustedMarginTop + 'px';
});
