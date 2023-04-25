const meuBotao = document.getElementById("meuBotao");
const minhaDiv = document.getElementById("mensagemInicial");        
const audio = new Audio('damage.mp3');
const audio2 = new Audio('wrong.mp3');
audio.load();
audio2.load();


function mostrarMensagem() {
  var mensagem = document.getElementById("mensagem");
  mensagem.classList.remove("oculto");
  setTimeout(function() {
    mensagem.style.opacity = "1";
    mensagem.style.transform = "translateY(-20px)";
  }, 50);
  setTimeout(function() {
    mensagem.style.opacity = "0";
    mensagem.style.transform = "translateY(20px)";
  }, 1500);
  setTimeout(function() {
    mensagem.classList.add("oculto");
    mensagem.style.opacity = "";
    mensagem.style.transform = "";
  }, 2000);
}

function message(){
    minhaDiv.style.display = "block";
}

		function initGame() {
        
            minhaDiv.style.display = "none";
            const letters = "abcdefghijklmnopqrstuvwxyz";
			let currentLetter;
			let life = 100;
			let monster_life = 100;
			let time = 100;
			let timerId;

			function updateLetter() {
				currentLetter = letters[Math.floor(Math.random() * letters.length)];
				document.getElementById("letter").innerHTML = currentLetter;
			}

			function updateLife() {
				life -= 10;
				if (life < 0) {
					life = 0;
					gameOver();
				}
				document.getElementById("life").style.width = life + "%";
				document.getElementById("you-lose").style.display = "block";
			}

			function monsterLife() {
				monster_life -= 10;
				document.getElementById("monster").style.width = monster_life + "%";
			}
            function youWin(){
                alert("Você derrotou o inimigo parabens!.");
			location.reload();
            }

			function updateTime() {
				time -= 10;
				if (time < 0) {
					time = 0;
					updateLife();
					resetTime();
					updateLetter();
				}
				document.getElementById("time").style.width = time + "%";
			}

			function resetTime() {
				time = 100;
				document.getElementById("time").style.width = time + "%";
			}

			function startTimer() {
				timerId = setInterval(function() {
					updateTime();
				}, 200);
			}

			function stopTimer() {
				clearInterval(timerId);
			}

			function gameOver() {
				stopTimer();
				document.getElementById("game-over").style.display = "block";
			}

			document.addEventListener("keydown", function(event) {
				if (event.key === currentLetter) {
                    audio.currentTime = 0;
                    audio.play();
                    mostrarMensagem();
					if (life > 100) {
						life = 100;
					}
					document.getElementById("life").style.width = life + "%";
					resetTime();
					updateLetter();
					document.getElementById("you-lose").style.display = "none";
					monsterLife();
                    if(monster_life<=0){
                        youWin(); 
                    }
				} else {
					updateLife();
					updateLetter();
                    audio2.currentTime = 0;
                    audio2.play();
                }
			});

			updateLetter();
			startTimer();
		}
        