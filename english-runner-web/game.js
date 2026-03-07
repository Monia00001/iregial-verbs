let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gameInterval; let slowMoTimeout;
let player={x:50,y:300,width:50,height:50}; let enemy={x:0,y:300,width:50,height:50,speed:2};
let score=0, lives=3, combo=0;
let difficultySettings={easy:{lives:5,slowMoFreq:0.3,speed:2},normal:{lives:3,slowMoFreq:0.5,speed:3},hard:{lives:1,slowMoFreq:0.7,speed:4}};
let currentDifficulty; let inSlowMo=false;
let verbs=[{base:"go",wrong:"goed",correct:"went"},{base:"run",wrong:"runned",correct:"ran"},{base:"eat",wrong:"eated",correct:"ate"}];
function startGame(level){currentDifficulty=difficultySettings[level];lives=currentDifficulty.lives;score=0;combo=0;document.getElementById("menu").classList.add("hidden");document.getElementById("game-container").classList.remove("hidden");updateStats();startLoop();}
function startLoop(){enemy.x=canvas.width-100;gameInterval=setInterval(gameLoop,20);}
function gameLoop(){if(inSlowMo) return;ctx.clearRect(0,0,canvas.width,canvas.height);enemy.x-=currentDifficulty.speed;if(enemy.x<0) enemy.x=canvas.width;ctx.fillStyle="green";ctx.fillRect(player.x,player.y,player.width,player.height);ctx.fillStyle="red";ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);if(Math.random()<currentDifficulty.slowMoFreq*0.02){triggerSlowMo();}}
let currentVerb;
function triggerSlowMo(){inSlowMo=true;clearInterval(gameInterval);let verb=verbs[Math.floor(Math.random()*verbs.length)];currentVerb=verb;document.getElementById("slowmo").classList.remove("hidden");document.getElementById("verbPrompt").innerText=`Введіть правильну форму: ${verb.wrong}`;document.getElementById("verbInput").value="";}
function checkVerb(){let input=document.getElementById("verbInput").value.trim().toLowerCase();document.getElementById("slowmo").classList.add("hidden");if(input===currentVerb.correct){score+=10;combo+=1;if(combo%3===0)score+=5;}else{lives-=1;combo=0;}updateStats();if(lives<=0){gameOver();}else{inSlowMo=false;startLoop();}}
function updateStats(){document.getElementById("lives").innerText=`Життя: ${lives}`;document.getElementById("score").innerText=`Бали: ${score}`;document.getElementById("combo").innerText=`Комбо: ${combo}`;}
function gameOver(){clearInterval(gameInterval);inSlowMo=false;document.getElementById("game-container").classList.add("hidden");document.getElementById("game-over").classList.remove("hidden");document.getElementById("final-score").innerText=`Ваш рахунок: ${score}`;}
function restartGame(){document.getElementById("game-over").classList.add("hidden");document.getElementById("menu").classList.remove("hidden");}
