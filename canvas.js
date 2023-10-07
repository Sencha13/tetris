const BLOCK_SIZE = 30;

const TETRO_SIZE = 4;

const TETRO_COLOR =[
    "#000",
    "#6cf",
    "#f92",
    "#66f",
    "#c5c",
    "#fd2",
    "#f44",
    "#5b5"
];
const TETRO_TYPE = [
    [],
    [
        [0,0,0,0],
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [,,,],
        [,,,],
        [,,,],
        [,,,]
    ],
    [
        [,,,],
        [,,,],
        [,,,],
        [,,,]
    ],
    [
        [,,,],
        [,,,],
        [,,,],
        [,,,]
    ],
    [
        [,,,],
        [,,,],
        [,,,],
        [,,,]
    ],
];

const GAME_SPEED = 1000;

const FIELD_COL = 10; //width
const FIELD_ROW = 20; //height

const SCREEN_W = FIELD_COL * BLOCK_SIZE;
const SCREEN_H = FIELD_ROW * BLOCK_SIZE;

let offsetX = 0;
let offsetY = 0;

let can = document.getElementById("canvas");
let con = can.getContext("2d");
can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "4px solid #555";

let timerID = setInterval(droptetro, GAME_SPEED)

function drawAll(){

con.fillStyle="#f00";
con.fillRect(150, 150, BLOCK_SIZE, BLOCK_SIZE);

for(let y=0; y<TETRO_SIZE; y++){
    for(let x=0; x<TETRO_SIZE; x++){
        if(TETRO_TYPE[y][x]){
            con.fillRect((offsetX+x)*BLOCK_SIZE,(offsetY+y)*BLOCK_SIZE, BLOCK_SIZE,BLOCK_SIZE);
        }
        con.fillStyle='#85e';
    }
}
}

function droptetro(){
    offsetY++;
    drawAll();
}

document.addEventListener('keydown', KeyDownFunc);

function KeyDownFunc(e){
    switch (e.keyCode){
        case 37:
            offsetX--;
            break;
        case 38:
            offsetY--;
            break;
        case 39:
            offsetX++;
            break;
        case 40:
            offsetY++;
            break;
    }
    drawAll();
}

let sentence = "";
for(let i=0; i<45; i++){
    if(i<18 || 26<i){
        sentence += "教育";
    }else{
        sentence += "死刑";
    }
}
console.log(sentence);
const words = ["厳しく改善指導","即指導","指導徹底"];
for(let i=0; i<3; i++){
    console.log(`大変申し訳御座いません。${words[i]}致します。`);
}

let sentencei = "";
for(let i=0; i<90; i++){
    if(i<36 || 53<i){
        if(i%2==0){
            sentencei+="教";
        }else{
            sentencei+="育";
        }
    }else if(i%2==0){
        sentencei+="死";
    }else{
        sentencei+="刑";
    }
    if(i%15==14){
        sentencei+="\n";
    }
}
console.log(sentencei);

const wordsi = ["厳しく改善指導","即指導","指導徹底"];
for(let i=0; i<3; i++){
    console.log(`大変申し訳御座いません。\n${wordsi[i]}致します。`);
}






