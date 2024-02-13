var historyData = [];

        document.getElementById('bettingForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var playerCount = document.getElementById('playerCount').value;
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';

            var table = document.createElement('table');
            var headerRow = table.insertRow();
            var headers = ['Người chơi', 'Điểm cược', 'Thùng A', 'Thùng B'];
            headers.forEach(function(headerText) {
                var headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });

            for (var i = 1; i <= playerCount; i++) {
                var row = table.insertRow();
                var cells = ['playerName', 'playerBet', 'playerChoiceA', 'playerChoiceB'];
                cells.forEach(function(cellName) {
                    var cell = row.insertCell();
                    if (cellName === 'playerName') {
                        cell.innerHTML = '<input type="text" name="player' + i + 'Name" placeholder="Tên người chơi">';
                    } else if (cellName === 'playerBet') {
                        cell.innerHTML = '<input type="number" min="0" value="0" name="player' + i + 'bet">';
                    } else {
                        cell.innerHTML = '<input type="radio" name="player' + i + 'choice" value="' + cellName[cellName.length - 1] + '">';
                    }
                });
            }

            var submitButton = document.getElementById('submitButton');
            submitButton.style.display = 'inline-block'; // Show submit button

            submitButton.addEventListener('click', function() {
                var historyEntry = {};
                var totalBetA = 0;
                var totalBetB = 0;
                var lowestTotalBet = Infinity;
                var highestBetInWinningThung = -Infinity;

                for (var i = 1; i <= playerCount; i++) {
                    var playerScore = parseInt(document.querySelector('input[name="player' + i + 'bet"]').value);
                    var playerName = document.querySelector('input[name="player' + i + 'Name"]').value;
                    var playerChoice = document.querySelector('input[name="player' + i + 'choice"]:checked').value;
                    var totalBet = playerScore;

                    if (playerChoice === 'A') {
                        totalBetA += totalBet;
                    } else {
                        totalBetB += totalBet;
                    }

                    if (totalBet < lowestTotalBet) {
                        lowestTotalBet = totalBet;
                    }

                    historyEntry['Player ' + i] = playerName + ': ' + totalBet + ' điểm';
                }

                var winningChoice = totalBetA < totalBetB ? 'A' : 'B';
                var winningPlayerInWinningThung = null;

                for (var i = 1; i <= playerCount; i++) {
                    var playerScore = parseInt(document.querySelector('input[name="player' + i + 'bet"]').value);
                    var playerName = document.querySelector('input[name="player' + i + 'Name"]').value;
                    var playerChoice = document.querySelector('input[name="player' + i + 'choice"]:checked').value;

                    if (playerChoice === winningChoice && playerScore > highestBetInWinningThung) {
                        highestBetInWinningThung = playerScore;
                        winningPlayerInWinningThung = playerName;
                    }
                }

                historyEntry['Thắng thùng'] = winningChoice;
                historyEntry['Người thắng'] = winningPlayerInWinningThung + ' (' + highestBetInWinningThung + ' điểm)';
                historyData.push(historyEntry);

                localStorage.setItem('totalBetA', totalBetA);
    localStorage.setItem('totalBetB', totalBetB);
    localStorage.setItem('winningChoice', winningChoice);
    localStorage.setItem('winningPlayerInWinningThung', winningPlayerInWinningThung);
    localStorage.setItem('highestBetInWinningThung', highestBetInWinningThung);
    
    // Chuyển hướng sang trang result.html
    // window.location.href = 'test.html';
                alert('Tổng điểm cược thùng A: ' + totalBetA + '\nTổng điểm cược thùng B: ' + totalBetB + '\nThùng chiến thắng là thùng ' + winningChoice + '\nNgười chơi có điểm cược cao nhất là: ' + winningPlayerInWinningThung + ' với ' + highestBetInWinningThung + ' điểm.');
            });

            resultDiv.appendChild(table);
        });

        document.getElementById('showHistoryButton').addEventListener('click', function() {
            var historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '';

            if (historyData.length === 0) {
                historyDiv.textContent = 'Chưa có dữ liệu lịch sử.';
            } else {
                var historyTable = document.createElement('table');
                var headerRow = historyTable.insertRow();
                for (var key in historyData[0]) {
                    var headerCell = document.createElement('th');
                    headerCell.textContent = key;
                    headerRow.appendChild(headerCell);
                }
                for (var i = 0; i < historyData.length; i++) {
                    var row = historyTable.insertRow();
                    for (var key in historyData[i]) {
                        var cell = row.insertCell();
                        cell.textContent = historyData[i][key];
                    }
                }
                historyDiv.appendChild(historyTable);
            }
            historyDiv.style.display = 'block';
            document.getElementById('showHistoryButton').style.display = 'none';
            document.getElementById('hideHistoryButton').style.display = 'inline-block';
        });

        document.getElementById('hideHistoryButton').addEventListener('click', function() {
            var historyDiv = document.getElementById('history');
            historyDiv.style.display = 'none';
            document.getElementById('showHistoryButton').style.display = 'inline-block';
            document.getElementById('hideHistoryButton').style.display = 'none';
        });

        document.getElementById('clearHistoryButton').addEventListener('click', function() {
            historyData = [];
            document.getElementById('history').style.display = 'none';
            document.getElementById('showHistoryButton').style.display = 'inline-block';
            document.getElementById('hideHistoryButton').style.display = 'none';
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
    // let maxMarginTop = 500; // Define the maximum margin-top value here
    // let adjustedMarginTop = Math.min(maxMarginTop, value * 1); // Limit the value to maxMarginTop
    // hill1.style.marginTop = adjustedMarginTop + 'px';
});