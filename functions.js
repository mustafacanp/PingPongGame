
const drawEverything = () => {
  drawRect(0, 0, canvas.width, canvas.height, 'black');
  canvasContext.font='20px Arial';

  if(showWinScreen) {
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('Click to Continue', canvas.width/2 - 75, canvas.height/2 + 30);
      if(player1.score >= WINNING_SCORE) {
          canvasContext.fillText('Player1 Won!',  canvas.width/2 - 60, canvas.height/2 - 30);
      } else if(player2.score >= WINNING_SCORE) {
          canvasContext.fillText('Player2 Won!',  canvas.width/2 - 60, canvas.height/2 - 30);
      }
      return;
  }

  drawNet();
  drawCircle(ball.position.x, ball.position.y, ball.radius, ball.color);
  drawRect(player1.position.x, player1.position.y, player1.width, player1.height);
  drawRect(player2.position.x, player2.position.y, player2.width, player2.height);
  drawScores();
  // drawCircle(willCome.x, willCome.y, 5, 'red');
}

const moveEverything = () => {

  ball.position.x += ball.speed.x;
  ball.position.y += ball.speed.y;

  movePlayer2AI();

  if(ball.position.x <= ball.radius*2) { // Sol
      if(ball.position.y > player1.position.y && ball.position.y < player1.position.y + player1.height) {

          ball.speed.x = -(ball.speed.x / 1.3);
          let deltaY = ball.position.y - (player1.position.y + player1.height/2);
          ball.speed.y = deltaY * .35;

      } else {
          player2.score++;
          // willCome.x = canvas.width - 5;
          // willCome.y = ball.position.y;
          ballReset();
      }
  }
  if(ball.position.x >= canvas.width - ball.radius*2){  // Sağ
      if(ball.position.y > player2.position.y && ball.position.y < player2.position.y + player2.height) {

          ball.speed.x = -(ball.speed.x * 1.3);

          let deltaY = ball.position.y - (player2.position.y + player2.height/2);
          ball.speed.y = deltaY * .35;

      } else {
          player1.score++;
          // willCome.x = canvas.width - 5;
          // willCome.y = ball.position.y;
          ballReset();
      }
  }
  if(ball.position.y >= canvas.height - ball.radius*2 || ball.position.y <= ball.radius*2) {  // Üst & Alt
      ball.speed.y = -(ball.speed.y);
  }
}
const drawNet = () => {
  for (let i = 0; i < canvas.height; i+=40) {
      drawRect(canvas.width/2, i, 2, 20, 'white');
  }
}

const drawBall = (leftX, topY, radius, color) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(leftX, topY, radius*2, 0, Math.PI*2, true);
  canvasContext.fill();
}

const drawScores = () =>  {
  canvasContext.fillText(player1.score, canvas.width/4, 50);
  canvasContext.fillText(player2.score, canvas.width*3/4, 50);
}

const isEven = (n) => {
  return n % 2 == 0;
}
const isNegativeDoPossitive = (n) => {
  if(n < 0)
      return -n;
  else
      return n;
}

const ballReset = () => {
  if(player1.score >= WINNING_SCORE || player2.score >= WINNING_SCORE) {
      showWinScreen = true;
  }

  player2.position.y = (canvas.height - player2.height)/2

  ball.speed = { x: 10, y: 0 };
  ball.position = { x: canvas.width/2, y: canvas.height/2 };
  // willCome.y = canvas.height/2;
}

const drawRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
const drawCircle = (centerX, centerY, radius, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

const movePlayer2AI = () => {
  if(ball.position.y - player2.height/4 > player2.position.y + player2.height/4) {
      player2.position.y += player2.speed;
  } if(ball.position.y + player2.height/4 < player2.position.y + player2.height/4) {
      player2.position.y -= player2.speed;
  }
}

const handleMouseClick = (e) => {
  if(showWinScreen) {
      player1.score = player2.score = 0;
      showWinScreen = false;
  }
}

const calcMousePos = (e) => {
  let rect = canvas.getBoundingClientRect();
  let root = document .documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;

  return {
      x: mouseX,
      y: mouseY,
  }
}



// const movePlayer2AIunnecessary = () => {

//   let V = ball.speed.x;
//   let x = canvas.width - ball.position.x;
//   let time = x / V;
//   if(ball.position.x <= player1.width + ball.radius*2 + 1 && time > 0) {
//       let Y_YOL = time * ball.speed.y;

//       let gidilen_yol = 0;
//       if(Y_YOL >= 0) {
//           gidilen_yol = ball.position.y + Y_YOL;
//       } else {
//           gidilen_yol = -Y_YOL;
//       }

//       let artan_yol = (Y_YOL + ball.position.y) % canvas.height;
//           artan_yol = isNegativeDoPossitive(artan_yol);

//       let carpma_sayisi = 0;
//       if(Y_YOL >= 0) { // Top alta atılmışsa
//           carpma_sayisi = isNegativeDoPossitive(parseInt(gidilen_yol / canvas.height));
//       } else { // Top üste atılmışsa
//           let temp_gidilen_yol =  gidilen_yol - ball.position.y;
//           carpma_sayisi = isNegativeDoPossitive(parseInt(temp_gidilen_yol / canvas.height));
//           if(gidilen_yol >= ball.position.y) { // Üste atılan top üste en az bir kez çarpmışsa
//               carpma_sayisi++;
//           }
//       }
//       artan_yol += ball.radius * carpma_sayisi;

//       let Y_NEW = 0;
      
//       if(ball.position.y + Y_YOL >= 0 && ball.position.y + Y_YOL <= canvas.height) { // NORMAL (Kenarlara Çarpmayacak)
//           Y_NEW = ball.position.y + Y_YOL;
//       } else if(ball.position.y + Y_YOL < 0) { // YUKARI (Çarpacak)
//           if(isEven(carpma_sayisi)) {
//               Y_NEW = canvas.height - artan_yol;
//           } else {
//               Y_NEW = artan_yol;
//           }
//       } else if(ball.position.y + Y_YOL >= 0) { // AŞAĞI (Çarpacak)
//           if(isEven(carpma_sayisi)) {
//               Y_NEW = artan_yol;
//           } else {
//               Y_NEW = canvas.height - artan_yol;
//           }
//       }

//       willCome.x = canvas.width - 5;
//       willCome.y = Y_NEW;
//   }
//   if(willCome.y - player2.height/3 > player2.position.y + player2.height/3) {
//       player2.position.y += player2.speed;
//   } else if(willCome.y + player2.height/3 < player2.position.y + player2.height/3) {
//       player2.position.y -= player2.speed;
//   }  
// }