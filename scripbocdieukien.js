// Script.js

// Lấy các phần tử DOM cần thiết
const moves = document.getElementById("moves-count");

const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");



//Items array
const items = [
  { name: "1", image: "images/chimhonrong.png" },
  { name: "2", image: "images/ranhonkhi.png" },
  { name: "3", image: "images/hohonchim.png" },
  { name: "4", image: "images/ronghonchim.png" },
  { name: "5", image: "images/ronghonkhi.png" },
  { name: "6", image: "images/ranhonho.png" },
  { name: "7", image: "images/khihonran.png" },
  { name: "8", image: "images/hohonran.png" },
  { name: "9", image: "images/chimhonho.png" },
  { name: "10", image: "images/khihonrong.png" },

];


// Hàm tạo các giá trị ngẫu nhiên cho thẻ
// Hàm tạo các giá trị ngẫu nhiên cho thẻ
const generateRandom = (rows = 5, cols = 2) => {
  const totalCards = rows * cols;
  const cardValues = [];
  
  // Tạo một bản sao của mảng items để tránh làm thay đổi mảng gốc
  const shuffledItems = items.slice().sort(() => Math.random() - 0.5);

  // Lặp qua mỗi ô trong ma trận
  for (let i = 0; i < totalCards; i++) {
    // Lấy phần tử từ mảng đã được xáo trộn
    const selectedItem = shuffledItems[i % items.length];
    cardValues.push(selectedItem);
  }

  return cardValues;
};


// Hàm tạo ma trận trò chơi chỉ từ mảng items
const matrixGenerator = (cardValues, rows = 5, cols = 2) => {
  gameContainer.innerHTML = "";
  for (let i = 0; i < rows * cols; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i % cardValues.length].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i % cardValues.length].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${cols},auto)`;
};


// Biến để theo dõi số lần đã lật
let flippedCount = 0;

// Hàm khởi tạo giá trị và gọi các hàm cần thiết
const initializer = () => {
  let cardValues = generateRandom();
  matrixGenerator(cardValues, 2, 5);
  flippedCount = 0; // Reset số lần đã lật khi khởi tạo lại trò chơi
};

// Gọi hàm initializer() khi DOM được tải xong
document.addEventListener("DOMContentLoaded", function () {
  initializer();

  // Sử dụng event delegation để xử lý sự kiện click cho các thẻ
  gameContainer.addEventListener("click", function(event) {
    const clickedElement = event.target;

    // Kiểm tra xem phần tử được click có phải là phần tử ".card-before" hay không
    if (clickedElement.classList.contains("card-before")) {
      // Kiểm tra số lần đã lật
      if (flippedCount < 1) {
        // Tăng số lần đã lật lên
        flippedCount++;
        // Flip the clicked card
        clickedElement.parentElement.classList.add("flipped");
      } else {
        // Nếu đã lật đủ 3 lần, không cho phép lật thêm
        console.log("Bạn đã lật đủ 3 lần.");
      }
    }
  });
  stopButton.addEventListener("click", function() {
    // Reset số lần đã lật và khởi tạo lại trò chơi
    flippedCount = 0;
    initializer();
  });

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
});
