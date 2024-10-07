function $(ele){ return document.querySelector(ele) };
function $all(ele){ return document.querySelectorAll(ele) };
const randNumber = ()=> Math.floor(Math.random() * 49);


const buttons = $all('button');
const form = $('#form');
const confirmAnser = $('.anser');
const inputEle = $('#input');
const toggleModes = $('#choice');
const stateNameOut = $('#stateName');
const streakCon = $('#streakCon');
const streakPt = $('#streakPt');
let streak = 0;

let count = 0;

window.onload = ()=>{
    modes ? toggleModes.textContent = 'Arranged?' : toggleModes.textContent = 'Random?';
    modes ? stateNameOut.textContent = StatesArr[randNumber()] : '';
}

let modes = true;

toggleModes.addEventListener('click', (e)=>{
    modes = !modes;
    modes ? stateNameOut.textContent = StatesArr[randNumber()] : stateNameOut.textContent = 'Alabama';
    modes ? toggleModes.textContent = 'Arranged?' : toggleModes.textContent = 'Random?';
    modes ? streakCon.style.display = 'inline' : streakCon.style.display = 'none';
});


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const input = e.target[0].value;
    const currentState = stateNameOut.textContent;

    modes ? randomGuess(input, currentState) : arrangedGuess(input);
    // randomGuess(input, currentState);
});
const arrangedGuess = (input)=>{
    if(input == StatesArr[count+1]){
        count++;
        stateNameOut.textContent = StatesArr[count];
        confirmAnser.style.backgroundColor = 'green';
        confirmAnser.textContent = 'Correct!';
        inputEle.value = '';
        setTimeout(()=>{
            confirmAnser.textContent = '';
            confirmAnser.style.backgroundColor = '';
            confirmAnser.textContent = '';
        }, 1000);
    }else{
        // count = 0;
        confirmAnser.style.backgroundColor = '#fb2e2ef0';
        confirmAnser.style.backgroundColor = 'red';
        confirmAnser.textContent = 'Wrong!';
        setTimeout(()=>{
            confirmAnser.style.backgroundColor = '';
            confirmAnser.textContent = '';
        }, 1000);
    }
    if(count == 50){
        count = 0;
    }
}
const randomGuess = (input, current)=>{
    count = 0;
    if(searchPair(input, current)){
        streak++;
        const rand = randNumber();
        stateNameOut.textContent = States[rand].name;
        confirmAnser.style.backgroundColor = '#006600';
        confirmAnser.textContent = 'Correct!';
        stateNameOut.textContent = States[rand].name;
        inputEle.value = '';
        setTimeout(()=>{
            confirmAnser.textContent = '';
            confirmAnser.style.backgroundColor = '';
            confirmAnser.textContent = '';
        }, 1000);
    }else{
        streak = 0;
        confirmAnser.style.backgroundColor = '#fb2e2ef0';
        confirmAnser.style.backgroundColor = 'red';
        confirmAnser.textContent = 'Wrong!';
        setTimeout(()=>{
            confirmAnser.style.backgroundColor = '';
            confirmAnser.textContent = '';
        }, 1000);
    }
    streakPt.textContent = streak;
    streakCon.style.backgroundColor = `rgb(${streak*20}, ${streak*40}, ${streak*10})`;
}

function searchPair(input, current){
    let currentNo = '';
    let nextNoState = '';
    let stateName = '';

    let inputText = '';
    let flag = false;
    States.forEach((state, index)=>{
        if(current == state.name){
            currentNo = index;
            nextNoState = index + 2;
            stateName = state.name;
        }
        if((input == state.name) && (nextNoState == state.id)){
            inputText = state;
            flag = true;
        }
    });
    return flag;
}

