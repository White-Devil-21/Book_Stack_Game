var bookCanvas = document.getElementById('bookArea')
var changingHeight = 700
bookCanvas.width = 1000

var cBooks = bookCanvas.getContext('2d')
function drawBench(){
    cBooks.beginPath()
    cBooks.fillStyle = 'red'
    cBooks.rect(200, changingHeight - 100, 600, 50)
    cBooks.rect(250, changingHeight - 50, 50, 50)
    cBooks.rect(700, changingHeight - 50, 50, 50)
    cBooks.fill()
    cBooks.stroke()
}

var score = 0
var books = []
var bkY = 105
var bkX = 350

for(var i=0;i<100;i++){
    books[i] = {
        width: 0,
        height: 0,
        img: window.red
    }
}

var colorBooks = []

for(var j=1;j<6;j++){
    var book = document.querySelector(`.img${j}`)
    colorBooks.push(book)

}


var colorCtr = 0
var current
while(colorCtr < 100){
    var dum = colorBooks[Math.floor(Math.random(0, 1)*6)+1]
    if(colorCtr == 0){
        window.current = dum
        books[colorCtr].img = dum
        colorCtr += 1
    }
    else{
        if(dum == current){
            continue
        }
        else{            
            books[colorCtr].img = dum
            window.current = dum
            colorCtr += 1            
        }
    }
}
  
for(var i=0;i<100;i++){
    if(!(books[i].img)){
        var comphen = document.querySelector('.img1')
        books[i].img = comphen
    }
}

var boundLeft = 0
var boundRight = 0
var nextLocation = window.changingHeight - 154
var n=1
cBooks.beginPath()
document.addEventListener('click', () =>{
    if(books[ctr].height < 510){
        cBooks.clearRect(books[ctr].width, books[ctr].height, innerWidth, 100)
            books[ctr+1].width = 350
            books[ctr+1].height = 105
        if(window.ctr == 2*(window.n)){
            window.nextLocation = window.changingHeight - (window.ctr + 1)*50 
            window.changingHeight += 100 //100 changing here               
            for(var i=0;i<window.ctr;i++){
                if(books[i].height != 0){
                    books[i].height += 100 
                                         
                }
            }
            window.n += 1  
        }
        books[ctr].height = window.nextLocation
        setTimeout(()=>{
            if(((books[ctr].width > window.boundRight)||(books[ctr].width < window.boundLeft)) && (window.boundRight != 0)){
                alert('You lose')
                if(localStorage.getItem('highScore') == null){
                    localStorage.setItem('highScore', window.score)
                }
                else{
                    if(window.score > localStorage.getItem('highScore')){
                        localStorage.setItem('highScore', window.score)
                    }
                }
                gameOver()
            } 
            window.boundRight = books[ctr].width + 100
            window.boundLeft = books[ctr].width - 100
            window.nextLocation -= 50          
                
            setTimeout(()=>{
                window.ctr += 1
                window.score += 100 
            }, 100)
        }, 200)
    }
            

})

var startHeight = 120
var chkr = 1
var ctr = 0
var dir = 1

books[0].height = 105
books[0].width = 350

function drawBooks(){
    for(var i=0;i<100;i++){
        if(books[i].height != 0){
            cBooks.drawImage(books[i].img, books[i].width, books[i].height)
        }
    }
}

console.log(books)
function glide(){    
    window.bookCanvas.height = window.changingHeight
    requestAnimationFrame(glide)
    cBooks.clearRect(books[ctr].width -300, books[ctr].height, innerWidth, 300)
    drawBench()
    drawBooks()    

    if((books[ctr].width >= 254) && (books[ctr].width <= 551) && (window.dir == 1) && (books[ctr].height < window.startHeight)){
        if(window.chkr == 1){
            books[ctr].width += 6
        }
    }
    else{
        window.dir = -1
    }    
    if((books[ctr].width >= 257) && (books[ctr].width <= 556) && (window.dir == -1) && (books[ctr].height < window.startHeight)){
        if(window.chkr == 1){
            books[ctr].width -= 6
        }
    }
    else{
        window.dir = 1
    }
    
}

function gameOver(){
    var scoreBoard = document.querySelector('#scoreBoard')
    var area = document.querySelector("#bookArea")
    scoreBoard.style.display = "block"
    area.style.display = "none"
    var maxScore = document.querySelector('#maxScore')
    var playerScore = document.querySelector('#playerScore')
    maxScore.innerHTML += localStorage.getItem('highScore')
    playerScore.innerHTML += window.score
}

glide()
