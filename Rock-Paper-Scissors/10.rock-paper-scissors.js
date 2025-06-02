let score = JSON.parse(localStorage.getItem('score'));

    if(score === null){
      score = {
         wins : 0,
         losses : 0,
         ties : 0
      };
    };

    updateScoreElement();

   function playGame(playerMove){
      const computerMove = pickComputerMove();

      let result = '';

      if(playerMove === 'Scissors'){
      if(computerMove === 'rock'){
         result = 'You Lose';
      }else if(computerMove === 'paper'){
         result = 'You win';
      }else if(computerMove === 'Scissors'){
         result = 'Tie';
      }

   }else if(playerMove === 'paper'){
      if(computerMove === 'rock'){
         result = 'You win';
      }else if(computerMove === 'paper'){
         result = 'Tie';
      }else if(computerMove === 'Scissors'){
         result = 'You Lose';
      }

    }else if(playerMove === 'rock'){
         if(computerMove === 'rock'){
         result = 'Tie';
      }else if(computerMove === 'paper'){
         result = 'You Lose';
      }else if(computerMove === 'Scissors'){
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
      computerMove = 'Scissors';
   }

   return computerMove;

   }