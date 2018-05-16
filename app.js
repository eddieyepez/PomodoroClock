//onLoad
window.onload = function() {

  let state = document.getElementById('state');
  
  //clock display
  let clockDisplay = document.getElementById('clockDisplay');
  //timer value display
  let timerDisplay = document.getElementById('timerDisplay');
  //break value display
  let breakDisplay = document.getElementById('breakDisplay');
  //btn up
  let btnUp = document.getElementsByClassName('btnUp');
  //btn down
  let btnDown = document.getElementsByClassName('btnDown');
  // btn run
  let btnRun = document.getElementById('run');
  //progress bar
  let progressBar = document.getElementById('userProgress');

  let sessionCountText = document.getElementById('sessionsCount');
  let breakCountText = document.getElementById('breaksCount');

  clockDisplay.innerHTML = '25:00';
  //timerDisplay.innerHTML = '25';
  //breakDisplay.innerHTML = '5';

  let runnning = false;
  let sessionCount = 0;
  let breakCount = 0;

  //timer = false
  let timer = false;
  //default timer time
  let timerTime = '25';
  //default break time
  let breakTime = '5';

  let timeInterval;

  var audio = new Audio('sounds/pager.mp3');

  //click btn up => get parameter
  for(var x=0; x < btnUp.length; x++){
    btnUp[x].addEventListener("click", function (e){
      if(!runnning){
        //values ( user input, parameter )
        values('add', this.value);
      }
      
    });
  }

  //click btn down => get parameter
  for(var x=0; x < btnDown.length; x++){
    btnDown[x].addEventListener("click", function (e){
      if(!runnning){
        //values ( user input, parameter )
        values('substract', this.value);
      }
    });
  }

  btnRun.addEventListener("click", function (e){

    timer = !timer;

    runnning = !runnning;

    //if(timer){
    if(runnning){
      btnRun.innerHTML = 'STOP';
      startSession();
    }else{
      btnRun.innerHTML = 'START';
      stop();
    }
    
  });

//if user start
  let startSession = () => {

    runnning = true;
    breakCountText.innerHTML = breakCount;
    sessionCountText.innerHTML = sessionCount;
    state.innerHTML = "SESSION";

    if(timer){
      pomodoro(timerTime);
      progressBar.classList.add("progress-bar-animated");
      progressBar.classList.remove("bg-warning");
    }
  }
//  timer = true
//  call function pomodoro

  let breakSession = () => {
    
    sessionCountText.innerHTML = sessionCount;
    state.innerHTML = "BREAK!";

    if(!timer){
      pomodoro(breakTime);
      progressBar.classList.add("progress-bar-animated");
      progressBar.classList.add("bg-warning");
    }
  }

//function stop
  let stop = () => {
    clearInterval(timeInterval);
    progressBar.classList.remove("progress-bar-animated");
    sessionCount = 0;
    breakCount = 0;
    runnning = false;
    timer = false;
  }
//  stop pomodoro loop => timer = false
//  clock display => reset

//function pomodoro ( timer time - break time)
  let pomodoro = (time) => {

    let clock = time-1;
    let seconds = 60;
    let forProgress = time*60;
    let progressCounter  = time*60;
    let progressPercentage;
 
    timeInterval = setInterval( function(){

      seconds--;
      progressCounter--;

      if(seconds === 0){

        clockDisplay.innerHTML = clock + ':00';
        clock--;

        if(clock === -1){
          clearInterval(timeInterval);
          timer = !timer;
          if(timer){
            breakCount++;
            audio.play();
            startSession();          
          }else{
            sessionCount++;
            audio.play();
            breakSession();          
          }
        }

        seconds = 59;

      }else{

        if(seconds < 10){
          clockDisplay.innerHTML = clock + ':0' + seconds;
        }else{
          clockDisplay.innerHTML = clock + ':' + seconds;
        }       

      }

      progressPercentage = Math.round((progressCounter * 100) / forProgress);
      animateBar(progressPercentage);

    }, 1000);

  }

  let animateBar = (percentage) => {
    progressBar.style.width = percentage + '%';
  }


//function values ( user input, parameter)
  let values = (input, parameter) =>{

    //  value
    let value;
    if(parameter === 'timer'){
      value = timerDisplay.innerHTML;
    }else if (parameter === 'breakD'){
      value = breakDisplay.innerHTML;
    }

    //  if user input btn up
    if(input === 'add'){
        value++;      
    }else if (input === 'substract'){ //  else if user input btn down
      if(value > 1){
        value--;
      }else{
        value = 1;
      }
      
    }

    //  if parameter is timer time
    if(parameter === 'timer'){

      timerDisplay.innerHTML = value;

      if(value < 10){
        clockDisplay.innerHTML = '0'+ value + ':00';
      }else{
        clockDisplay.innerHTML = value + ':00';
      }

      timerTime = value;
      
    }else if (parameter === 'breakD'){ //  else if parameter is break time

      breakDisplay.innerHTML = value;

      breakTime = value;
    }

  }

}