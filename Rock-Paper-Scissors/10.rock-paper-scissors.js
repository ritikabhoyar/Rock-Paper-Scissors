let score = JSON.parse(localStorage.getItem('score'));

    if(score === null){
      score = {
         wins : 0,
         losses : 0,
         ties : 0
      };
    };

    updateScoreElement();

    let isAutoPlaying = false;
    let intervalId;

    
    function autoPlay() {
      if(!isAutoPlaying){
        intervalId =setInterval(function(){
         const playerMove = pickComputerMove();
         playGame(playerMove);
        },1000);
        isAutoPlaying = true;

        // When the game is auto playing, change
       // the text in the button to 'Stop Playing'.
        document.querySelector('.js-auto-play-button')
           .innerHTML = 'Stop Playing';
        
      }else{
         clearInterval(intervalId);
         isAutoPlaying = false;

         // When the game is not playing, change
        // the text back to 'Auto Play'.
        document.querySelector('.js-auto-play-button')
           .innerHTML = 'Auto Play';
      }
    }

    document.querySelector('.js-auto-play-button')
       .addEventListener('click',() => {
         autoPlay();
      });

    document.querySelector('.js-rock-button')
       .addEventListener('click',() => {
            playGame('rock');
      });

    document.querySelector('.js-paper-button')
        .addEventListener('click',() => {
         playGame('paper');
      });

    document.querySelector('.js-scissors-button')
        .addEventListener('click',() => {
         playGame('scissors');
      });

    document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
         playGame('rock');
      }else if(event.key === 'p'){
         playGame('paper');
      }else if(event.key === 's'){
         playGame('scissors');
      }else if(event.key === 'a'){
         autoPlay();
      }else if(event.key === 'Backspace'){
         //resetScore();
         showResetConfirmation();
      }
    });

   function playGame(playerMove){
      const computerMove = pickComputerMove();

      let result = '';

      if(playerMove === 'scissors'){
      if(computerMove === 'rock'){
         result = 'You Lose';
      }else if(computerMove === 'paper'){
         result = 'You win';
      }else if(computerMove === 'scissors'){
         result = 'Tie';
      }

   }else if(playerMove === 'paper'){
      if(computerMove === 'rock'){
         result = 'You win';
      }else if(computerMove === 'paper'){
         result = 'Tie';
      }else if(computerMove === 'scissors'){
         result = 'You Lose';
      }

    }else if(playerMove === 'rock'){
         if(computerMove === 'rock'){
         result = 'Tie';
      }else if(computerMove === 'paper'){
         result = 'You Lose';
      }else if(computerMove === 'scissors'){
         result = 'You win';
      }

    }

    if(result === 'You win'){
      score.wins += 1;
    }else if(result === 'You Lose'){
      score.losses += 1;
    }else if(result === 'Tie'){
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
      .innerHTML = result;

    document.querySelector('.js-moves').innerHTML=
      `You
         <img src="${playerMove}-emoji.png" class="move-icon">
         <img src="${computerMove}-emoji.png" class="move-icon">
         computer`
   }

   function updateScoreElement() {
      document.querySelector('.js-score')
       .innerHTML = `wins: ${score.wins} , losses: ${score.losses} , Tie: ${score.ties}`;
   }

   function pickComputerMove() {

   const randomNumber = Math.random();
   
   let computerMove = '';

   if(randomNumber >=0 && randomNumber < 1/3){
      computerMove = 'rock';
   }else if(randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'paper';
   }else if(randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'scissors';
   }

   return computerMove;

   }

   function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
   }

   document.querySelector('.js-reset-score-button')
     .addEventListener('click',() => {
      //resetScore();
       showResetConfirmation();
    });

   function showResetConfirmation() {
      document.querySelector('.js-reset-confirmation')
        .innerHTML = `
         Are you sure you want to reset the score?
         <button class="js-reset-confirm-yes reset-confirm-button">
         Yes
         </button>

         <button class="js-reset-confirm-no reset-confirm-button">
         No
         </button>
        `;

        document.querySelector('.js-reset-confirm-yes')
          .addEventListener('click',() => {
            resetScore();
            hideResetConfirmation();
          });

        document.querySelector('.js-reset-confirm-no')
           .addEventListener('click',() => {
            hideResetConfirmation();
           });
   }

   function hideResetConfirmation() {
      document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
   }