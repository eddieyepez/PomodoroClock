//onLoad
window.onload = function() {
  
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

  clockDisplay.innerHTML = '25:00';
  //timerDisplay.innerHTML = '25';
  //breakDisplay.innerHTML = '5';

  //timer = false
  let timer = false;
  //default timer time
  let timerTime = '25';
  //default break time
  let breakTime = '5';



  let timeInterval;

  //click btn up => get parameter
  for(var x=0; x < btnUp.length; x++){
    btnUp[x].addEventListener("click", function (e){
      if(!timer){
        //values ( user input, parameter )
        values('add', this.value);
      }
      
    });
  }

  //click btn down => get parameter
  for(var x=0; x < btnDown.length; x++){
    btnDown[x].addEventListener("click", function (e){
      if(!timer){
        //values ( user input, parameter )
        values('substract', this.value);
      }
    });
  }

  btnRun.addEventListener("click", function (e){

    timer = !timer;

    if(timer){
      btnRun.innerHTML = 'STOP';
      startSession();
    }else{
      btnRun.innerHTML = 'START';
      stop();
    }

    
  });

//if user start
  let startSession = () => {
    if(timer){
      pomodoro(timerTime);
    }
  }
//  timer = true
//  call function pomodoro

  let breakSession = () => {
    if(!timer){
      pomodoro(breakTime);
    }
  }

//function stop
  let stop = () => {
    clearInterval(timeInterval);
  }
//  stop pomodoro loop => timer = false
//  clock display => reset

//function pomodoro ( timer time - break time)
  let pomodoro = (time) => {

    let clock = time-1;
    let seconds = 60;

    timeInterval = setInterval( function(){

      seconds--;

      if(seconds === 0){

        clockDisplay.innerHTML = clock + ':00';
        clock--;

        if(clock === -1){
          clearInterval(timeInterval);
          timer = !timer;
          if(timer){
            startSession();
          }else{
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

    }, 1000);

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

//function animation ( time value )
//  if state === timer
//    time value => do animation
//  else if state === break
//    time value => do animation
//  else
//    reset / stop animation

}