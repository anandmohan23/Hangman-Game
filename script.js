const wordID =document.getElementById('word');
const wronglettersID =document.getElementById('wrong-letters');
const playagainBtn =document.getElementById('play-again');
const popup =document.getElementById('popup-container');
const notification =document.getElementById('notification-container');
const finalmessage =document.getElementById('final-message');

const figurepart =document.querySelectorAll('.figure-part');

const words = ['application','programming','interface','coding','computer'];

let selectedword = words[Math.floor(Math.random()*words.length)];
console.log(selectedword);

function fn1(){
    var Firstw = selectedword.substr(0,1);
    alert("First letter is: "+Firstw);
}
const correctletters =[];
const wrongletters =[];
//show hidden word
function displayWord() {
    
    wordID.innerHTML = `
      ${selectedword
        .split('')
        .map(
          letter => `
            <span class="letter">
              ${correctletters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
    `;
    const innerword = wordID.innerText.replace(/\n/g, '');

    if (innerword === selectedword) {
        finalmessage.innerText = 'congratulations! you won! 😎😍';
        popup.style.display = 'flex';
    }
    
}
// updateWrongLetters();----------------
function updateWrongLetters() {
    // Display wrong letters
    wronglettersID.innerHTML = `
      ${wrongletters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongletters.map(letter => `<span>${letter}</span>`)}
    `;
    //display body part
    figurepart.forEach((part, index) =>{
        const errors = wrongletters.length;

        if(index < errors){
            part.style.display='block';
        } else{
            part.style.display='none';
        }
    });

    if(wrongletters.length === figurepart.length){
        finalmessage.innerHTML='unfortunately you lost. 🧐😖';
        popup.style.display='flex';
    }
  
}
// showNotification();------------------
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
    notification.classList.remove('show');
    }, 2000)
}
// key press algo -------------------------
window.addEventListener('keydown', e=> {
    //console.log(e.key);
    if (e.keyCode>=65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedword.includes(letter)){
            if(!correctletters.includes(letter)){
                correctletters.push(letter);
                displayWord();
            }
            else{
                showNotification();
            } 
        } else{
            if(!wrongletters.includes(letter)){
                wrongletters.push(letter);
                updateWrongLetters();
            } else{
                showNotification();
            }
        }
    }
});
//--play again---clear array-----------
playagainBtn.addEventListener('click', ()=>{
    //clear array
    correctletters.splice(0);
    wrongletters.splice(0);
    selectedword=words[Math.floor(Math.random() * words.length)];
    //console.log(selectedword);
    displayWord();
    updateWrongLetters();
    popup.style.display='none';
});
displayWord();
