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

  clockDisplay.innerHTML = '10';
  timerDisplay.innerHTML = '25';
  breakDisplay.innerHTML = '5';

  //timer = false
  let timer = false;
  //default timer time
  let timerTime = 25;
  //default break time
  let breakTIme = 5;

  //click btn up => get parameter
  for(var x=0; x < btnUp.length; x++){
    btnUp[x].addEventListener("click", function (e){
      //values ( user input, parameter )
      values('add', this.value);
    });
  }

  //click btn down => get parameter
  for(var x=0; x < btnDown.length; x++){
    btnDown[x].addEventListener("click", function (e){
      //values ( user input, parameter )
      values('substract', this.value);
    });
  }

  btnRun.addEventListener("click", function (e){

    timer = !timer;

    if(timer){
      btnRun.innerHTML = 'STOP';
    }else{
      btnRun.innerHTML = 'START';
    }

    pomodoro();
  });

//if user start
//  timer = true
//  call function pomodoro

//function pomodoro ( timer time - break time)
  let pomodoro = () => {

    let clock = 10;

    let timeInterval = setInterval( function(){

      clock--;
      clockDisplay.innerHTML = clock;

      if(clock === 0){
        clearInterval(timeInterval);
      }

    }, 1000);

    



//  while user timer = true
//  start loop
//    call function counter ( timer time )
//      counter begin
//      clock display
//      call animation ( time value )
//      once counter finish => triger break function ... promises?
//    call function break ( break time )
//      break begin
//      clock display
//      call animation ( time value )
//      once break finish => triger timer function
  }

//function stop
//  stop pomodoro loop => timer = false
//  clock display => reset

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
      if(value < 60){
        value++;
      }else{
        value = 60;
      }
      
    }else if (input === 'substract'){ //  else if user input btn down
      if(value > 0){
        value--;
      }else{
        value = 0;
      }
      
    }

    //  if parameter is timer time
    if(parameter === 'timer'){
      timerDisplay.innerHTML = value;
    }else if (parameter === 'breakD'){ //  else if parameter is break time
      breakDisplay.innerHTML = value;
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