var session_time = 2700;
var break_time = 900;

var rem_session_time = 2700;
var rem_break_time = 900;

var timer_running = false;
var pomodoro_active = true;

var interval;

document.getElementById("session_slider").value = session_time / 60;
document.getElementById("session_time").innerHTML = "Session time: " + formatTime(session_time);

document.getElementById("break_slider").value = break_time / 60;
document.getElementById("break_time").innerHTML = "Break time: " + formatTime(break_time);

const timer_elem = document.getElementById("timer");
const session_elem = document.getElementById("session");

function switchSession() {
    clearInterval(interval);
    timer_running = false;
    
    if(pomodoro_active) {
        session_elem.innerHTML = "Break";
        timer_elem.innerHTML = formatTime(break_time);
        pomodoro_active = false;        
    }
    else {  
        session_elem.innerHTML = "Session";
        timer_elem.innerHTML = formatTime(session_time);
        pomodoro_active = true;  
    }
}

function startTimer() {
    if(!timer_running) {      
        interval = setInterval(handleTimer, 1000)
        timer_running = true;        
    }  
}

function stopTimer() {
    if(timer_running) {
        clearInterval(interval);
        timer_running = false;
    }   
}

function handleTimer() {
    var time_left;

    if(pomodoro_active) {
        time_left = rem_session_time;
    } else {
        time_left = rem_break_time;
    }

    time_left--;

    if(time_left <= 0) {
        clearInterval(interval);
        timer_running = false;
    }

    timer_elem.innerHTML = formatTime(time_left); 

    if(pomodoro_active) {
        rem_session_time = time_left;
    } else {
        rem_break_time = time_left;
    }
    
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
}

function resetTimes() {
    clearInterval(interval);
    timer_running = false;

    if(pomodoro_active) {
        timer_elem.innerHTML = formatTime(session_time);
    } else {
        timer_elem.innerHTML = formatTime(break_time);
    }
}


function settingsPopup() {
    clearInterval(interval);
    timer_running = false;

    document.getElementById("outer_popup").style.visibility = "visible";
    document.getElementById("settings_popup").style.visibility = "visible";   
}

function closePopup() {
    document.getElementById("outer_popup").style.visibility = "hidden";
    document.getElementById("settings_popup").style.visibility = "hidden";

    if(pomodoro_active)
        timer_elem.innerHTML = formatTime(session_time);
    if(!pomodoro_active)
        timer_elem.innerHTML = formatTime(break_time);

}



function sessionSlider() {
    let slider = document.getElementById("session_slider");
    let output = document.getElementById("session_time");
    
    slider.value = slider.value < 10 ? '0' + slider.value : slider.value;
    output.innerHTML = "Session time: " + slider.value + ":00";
    session_time = slider.value * 60;
    rem_session_time = session_time;
    timer_elem.innerHTML = formatTime(rem_session_time);
}

function breakSlider() {
    let slider = document.getElementById("break_slider");
    let output = document.getElementById("break_time");
    
    slider.value = slider.value < 10 ? '0' + slider.value : slider.value;
    output.innerHTML = "Break time: " + slider.value + ":00";
    break_time = slider.value * 60;
    rem_break_time = break_time;
    timer_elem.innerHTML = formatTime(rem_break_time);
}

function bgColorSlider() {
    let slider = document.getElementById("bg_color_slider");
    let output = document.getElementById("colors");
    
    let num = parseInt(slider.value);
    let hexString = "#" + decimalToHex(num, 6).toUpperCase();
    
    output.innerHTML = hexString;
    document.documentElement.style.setProperty('--bg-color', hexString);
}

function clockColorSlider() {
    let slider = document.getElementById("clock_color_slider");
    let output = document.getElementById("colors");
    
    let num = parseInt(slider.value);
    let hexString = "#" + decimalToHex(num, 6).toUpperCase();
    
    output.innerHTML = hexString;
    document.documentElement.style.setProperty('--clock-color', hexString);
}

function accentColorSlider() {
    let slider = document.getElementById("accent_color_slider");
    let output = document.getElementById("colors");
    
    let num = parseInt(slider.value);
    let hexString = "#" + decimalToHex(num, 6).toUpperCase();
    
    output.innerHTML = hexString;
    document.documentElement.style.setProperty('--accent-color', hexString);
}



function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}


