var session_time = 2700;
var break_time = 900;
var timer_running = false;
var pomodoro_active = true;

var interval;

const timer_elem = document.getElementById("timer");
const session_elem = document.getElementById("session");


function switchSession(){
    clearInterval(interval);
    timer_running = false;
    
    if(!pomodoro_active){
        session_elem.innerHTML = "Session";
        timer_elem.innerHTML = formatTime(session_time);
        pomodoro_active = true;
    }
    else {  
        session_elem.innerHTML = "Break";
        timer_elem.innerHTML = formatTime(break_time);
        pomodoro_active = false;    
    }
}

function startTimer(){
    if(!timer_running){
        if(pomodoro_active){
            interval = setInterval(handleTimer, 1000)
            timer_running = true;
        }    
    }  
}

function stopTimer(){
    if(timer_running){
        clearInterval(interval);
        timer_running = false;
    }   
}

function handleTimer(){
    var time_left;

    if(pomodoro_active) {
        time_left = session_time;
    } else {
        time_left = break_time;
    }
    
    // let minutes = Math.floor(time_left / 60);
    // let seconds = time_left % 60;
    
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    // seconds = seconds < 10 ? '0' + seconds : seconds;

    if(time_left < 0){
        clearInterval(interval);
        timer_running = false;
    }

    time_left--;
    timer_elem.innerHTML = formatTime(time_left);
    

    if(pomodoro_active){
        session_time = time_left;
    } else {
        break_time = time_left;
    }
    
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
}
