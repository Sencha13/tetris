const BLOCK_SIZE = 30;    //ブロック１個の大きさ
const TETRO_SIZE = ()=>{
  return Math.floor(tetro_type/6)+3;
};    //ブロックの配列数
const FIELD_COL = 10;  //幅
const FIELD_ROW = 20;  //高さ
const SCREEN_W = FIELD_COL * BLOCK_SIZE;
const SCREEN_H = FIELD_ROW * BLOCK_SIZE;
const TETRO_COLOR =[
  '#000',      //0:空
  '#F92',      //1:オレンジ L
  '#66F',      //2:青 J
  '#C5C',      //3:紫 T
  '#5B5',      //4:緑 S
  '#F44',      //5:赤 Z
  '#FD2',      //6:黄色 O
  '#6CF',      //7:水色 I
];
const TETRO_TYPE = [
  [], // 0:空データ
  [                // 1橙:L型
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],
  [                // 2青:J型
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],
  [                // 3紫:T型
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ],  
  [                // 4:S型
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  [                // 5緑:Z型
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ],
  [                // 6黄:O型
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
  [                // 7水:I型
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ]
];
function arrayShuffle(array) {
  for(let i = (array.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
const GAME_SPEED = 800;    // ゲームの速さ
let isCheat=0;

let tetro = [];    //ブロック本体の配列
let tetro_x = 3; //x座標
let tetro_y = 0; //y座標
let field=[];
if(isCheat){
field = [
// DT砲
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 1, 4, 0, 0, 5, 0, 0],
[0, 0, 0, 1, 4, 4, 5, 5, 0, 7],
[2, 2, 0, 1, 3, 4, 5, 6, 6, 7],
[2, 0, 0, 3, 3, 3, 7, 6, 6, 7],
[2, 0, 0, 0, 5, 2, 7, 1, 4, 7],
[6, 6, 0, 5, 5, 2, 7, 1, 4, 4],
[6, 6, 0, 5, 2, 2, 7, 1, 1, 4]

//I-spin paradise
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,1,0,0],
// [0,0,0,0,0,0,0,1,0,0],
// [1,1,1,1,1,1,0,1,0,0],
// [1,1,1,0,0,0,0,1,0,0],
// [1,1,1,0,1,1,1,1,1,1],
// [1,1,1,0,1,1,1,1,1,1],
// [1,1,1,0,1,1,1,1,1,1],
// [1,1,1,0,1,1,1,1,1,1],
// [1,1,1,0,0,0,0,1,1,1],
// [1,1,1,1,1,1,0,1,1,1],
// [1,1,1,1,1,1,0,1,1,1],
// [1,1,1,1,1,1,0,1,1,1],
// [1,1,1,1,1,1,0,1,1,1],
// [1,1,1,0,0,0,0,1,1,1],
]; //ゲーム画面配列
}
let tetro_type = 0;
let game_over = false;
let lines = 0;
let score = 0;
let highscore=localStorage.getItem('Tetris_hisc');
if(highscore==null)highscore=0;
$('#hisc').text(highscore);
let onetoseven = [1,2,3,4,5,6,7];
let tetro_strings = Array.from(arrayShuffle(onetoseven));

if(isCheat==2){ //I-spin paradise
for(let i=0; i<5; i++){
  tetro_strings[i]=7;
}}

let nextblocks = [];
const tetro_type_characters=['','L','J','T','S','Z','O','I'];
for(let i=0; i<7; i++){
  nextblocks.push(tetro_type_characters[tetro_strings[i]]);
  if(nextblocks.length>6) break;
}
const next_tag=["#one","#two","#three","#four","#five"];
let action=0; //0:drop 1:rotate (T-spinを調べるため)
let state=0; //1:a 2:b 3:c 4:d
let ntetro;
let expecTetro=[];
let expecTetro_y=0;
let REN=0;
let waitingtime=800;

let can = document.getElementById("canvas");
let con = can.getContext("2d");
can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border= "4px solid #555";

let timerID = setInterval(droptetro, GAME_SPEED); //start

function drawText(text,font,color){
  let str = text;
  con.font=font;
  let w = con.measureText(str).width;
  let x = SCREEN_W/2 - w/2;
  let y = SCREEN_H/2;
  con.lineWidth = 4;
  con.strokeText(str,x,y);
  con.fillStyle=color;
  con.fillText(str,x,y);
}
function drawTetris(text,font,color){
  $('#tetrissss').css('font-family',font);
  let w=con.measureText(text).width;
  let x=SCREEN_W/2 - w*1.4;
  let y=SCREEN_H/2;
  $('#tetrissss').css('margin-top',y).css('margin-left',x).css('color',color);
  $('#tetrissss').text(text);
  $('#tetrissss').show();
  setTimeout(function(){
    $('#tetrissss').fadeOut();
  },1000);
}
drawText('START','40px sans-serif','white');
init();
drawAll();

// 罫線表示
function ruledline(){
  for(let y=0; y<FIELD_ROW; y++){
    for(let x=0; x<FIELD_COL; x++){
      let qx = x*BLOCK_SIZE;
      let qy = y*BLOCK_SIZE;
      con.strokeStyle = "#8884";
      con.lineWidth = 1;
      con.strokeRect(qx,qy,BLOCK_SIZE,BLOCK_SIZE);
    }
  }
}

//　関数：フィールドの初期化
function init(){
  if(!isCheat){
    for(let y=0; y<FIELD_ROW; y++){
      field[y] = [];
      for(let x=0; x<FIELD_COL; x++){
        field[y][x]=0;
      }
    }
  }
  tetroTypeSelect();
  ruledline();
}

//　関数：テトロミノをランダムに選択
function tetroTypeSelect(){
  tetro_type = tetro_strings.shift();
  tetro = TETRO_TYPE[tetro_type];
  expecTetro=tetro.slice();
  state=1;
  holdLimit=1;

  if(tetro_strings.length<7){
    tetro_strings = tetro_strings.concat((arrayShuffle(onetoseven)));
  }
  nextblocks.push(tetro_type_characters[tetro_strings[6]]);
  nextblocks.shift();
  for(let i=0;i<5;i++){
    $(next_tag[i]).text(nextblocks[i]).css('color',TETRO_COLOR[tetro_strings[i]]);
  }
}

//　関数：ブロックを描画する
function drawBlock(x, y, color, opacity) {
  let px = x*BLOCK_SIZE;
  let py = y*BLOCK_SIZE;
  if(!opacity)opacity='f';

  con.fillStyle = TETRO_COLOR[color]+opacity;
  con.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
  con.strokeStyle="#111";
  con.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
}
//　関数：画面全体を描画する
function drawAll(){
  con.clearRect(0,0,SCREEN_W,SCREEN_H);
  ruledline();
  for(let y=0; y<FIELD_ROW; y++){
    for(let x=0; x<FIELD_COL; x++){
      if(field[y][x]){
        drawBlock(x,y,field[y][x]);
      }
    }
  }
  expectation();
  for(let y=0; y<TETRO_SIZE(); y++){
    for(let x=0; x<TETRO_SIZE(); x++){
      if(tetro[y][x]){
        drawBlock(tetro_x+x, tetro_y+y, tetro_type);
      }
    }
  }
  if(game_over){
    drawText("GAME OVER","40px serif","White");
    clearInterval(timerID);
    if(highscore<score){
      localStorage.setItem('Tetris_hisc',score);
      drawTetris("New Record","sans-serif","")
    }
  }
}
//　関数：テトロミノが移動可能かを判定する
function checkMove(mx, my, new_tetro){
  if(new_tetro == null){
    new_tetro=tetro;
  }
  for(let y=0; y<TETRO_SIZE(); y++){
    for(let x=0; x<TETRO_SIZE(); x++){
      let nx = mx+tetro_x+x;
      let ny = my+tetro_y+y;
      if(new_tetro[y][x]){
        if(nx<0 || ny<0 || nx>=FIELD_COL || ny >= FIELD_ROW || field[ny][nx]){
          return false;
        }
      }
    }
  }
  return true
}
//　関数：テトロミノを回転させる
function right_rotate(){ //右回転 a->b
  let new_tetro =[];
  for(let y=0; y<TETRO_SIZE(); y++){
    new_tetro[y]=[];
    for(let x=0; x<TETRO_SIZE(); x++){
      new_tetro[y][x]=tetro[TETRO_SIZE()-x-1][y];
    }
  }
  return new_tetro;
}
function left_rotate(){ //左回転 b->a
  let new_tetro=[];
  for(let y=0; y<TETRO_SIZE(); y++){
    new_tetro[y]=[];
    for(let x=0; x<TETRO_SIZE(); x++){
      new_tetro[y][x]=tetro[x][TETRO_SIZE()-y-1];
    }
  }
  return new_tetro;
}
//　関数：テトロミノをを固定する
function fixtetro(){
  for(let y=0; y<TETRO_SIZE(); y++){
    for(let x=0; x<TETRO_SIZE(); x++){
      if(tetro[y][x]){
        field[tetro_y+y][tetro_x+x]=tetro_type;
      }
    }
  }
}

let T_around=0;
//　関数：ラインを消す
function clearline(){
  let currentclearlines = lines;
  T_around = 0; //T-spinの判定
  if(action && tetro_type==3){
    if(tetro_y<FIELD_ROW-2 && -1<tetro_x&&tetro_x<FIELD_COL-2){
      if(field[tetro_y][tetro_x])T_around++;
      if(field[tetro_y+2][tetro_x])T_around++;
      if(field[tetro_y][tetro_x+2])T_around++;
      if(field[tetro_y+2][tetro_x+2])T_around++;
    }else if(tetro_y==FIELD_ROW-2){
      if(field[tetro_y][tetro_x])T_around++;
      if(field[tetro_y][tetro_x+2])T_around++;
      T_around+=2;
    }else if(tetro_x==-1){
      if(field[tetro_y][tetro_x+2])T_around++;
      if(field[tetro_y+2][tetro_x+2])T_around++;
      T_around+=2;
    }else if(tetro_x==FIELD_COL-2){
      if(field[tetro_y][tetro_x])T_around++;
      if(field[tetro_y+2][tetro_x])T_around++;
      T_around+=2;
    }
  }
  for(let y=0; y<FIELD_ROW; y++){
    let line_flg=true;
    for(let x=0; x<FIELD_COL; x++){
      if(!field[y][x]){
        line_flg=false;
        break;
      }
    }
    if(line_flg){
      for(let ny=y; ny>0; ny--){
        for(let nx=0; nx<FIELD_COL; nx++){
          field[ny][nx]=field[ny-1][nx];
        }
      }
      lines++;
      $('#lines').text(lines);
    }
  }
  let clearlines=lines-currentclearlines;
  if(clearlines==4){
    drawTetris("Tetris!","sans-serif","yellow");
  }
  if(T_around >= 3){
    drawTetris('T-spin!','sans-serif','#d6d');
    score+=50*(clearlines+1);
  }
  if(clearlines){ //Perfect Clearか & REN++
    REN++;
    let isPerfect=true;
    for(let px=0; px<FIELD_COL; px++){
      if(field[19][px])isPerfect=false;
    }
    if(isPerfect){
      if(clearlines==4){
        drawTetris('Perfect Tetris!!!','serif','orange');
        score+=300;
      }else{
        drawTetris('Perfect Clear!!','sans-serif','skyblue');
        score+=200;
      }
    }
    console.log(REN);
  }else REN=0;
  score+=10*(clearlines**2+REN);
  $('#score').text(score);
}
function ToTheNext(){
  fixtetro();
  clearline();
  tetroTypeSelect();
  tetro_x=3;
  tetro_y=0;
}

//　関数：テトリスを落下させる
function droptetro(){
  if(isDroppable){
  if(checkMove(0,1)){
    tetro_y++;
    action=0;
  }else{
    //waiting
    ToTheNext();
    if(!checkMove(0,0)){
      game_over=true;
    }
  }
  drawAll();
}
}

// function hold
var holding = 0;
var holdLimit=1;
function hold(){
  if(holding){
    [tetro_type, holding] = [holding, tetro_type]; //replace
    tetro = TETRO_TYPE[tetro_type];
  }else{
    holding = tetro_type;
    tetroTypeSelect();
  }
  tetro_x=3;
  tetro_y=0;
  $('#hold').text(tetro_type_characters[holding]).css('color',TETRO_COLOR[holding]);
}

//スーパーローテーションシステム
function SRS(direction,state){ //left:-1 right:1, a1 b2 c3 d4
  if(state==0)state=4;
  if(state==5)state=1;
  let ac=(state-2)*direction;
  let bd=state-3; //b:-1 d:1
  let iac=state-2; //a:-1 c:1
  if(tetro_type==7){ //I-spin
    if(state%2==0){ //bd
      if(checkMove(bd*(direction*3+1)/2,0,ntetro)){
        tetro_x+=bd*(direction*3+1)/2;
        isPossible=true;
      }else if(checkMove(bd*-(direction*3-1)/2,0,ntetro)){
        tetro_x+=bd*-(direction*3-1)/2;
        isPossible=true;
      }else if(checkMove(bd*(direction*3+1)/2, -bd*(-direction+3)/2,ntetro)){
        tetro_x+=bd*(direction*3+1)/2;
        tetro_y+=-bd*(-direction+3)/2;
        isPossible=true;
      }else if(checkMove(bd*-(direction*3-1)/2, bd*(direction+3)/2,ntetro)){
        tetro_x+=bd*-(direction*3-1)/2;
        tetro_y+=bd*(direction+3)/2;
        isPossible=true;
      }
    }else if(state%2==1){ //ac
      if(checkMove(-direction*(-iac+5)/2,0,ntetro)){
        tetro_x+=-direction*(-iac+5)/2; //1->2 3->1
        isPossible=true;
      }else if(checkMove(direction*(iac+1)/2,0,ntetro)){
        tetro_x+=direction*(iac+1)/2; //1->1 3->2
        isPossible=true;
      }else if(checkMove(iac*(direction-3)/2, iac*(-3*direction-1)/2,ntetro)){
        tetro_x+=iac*(direction-3)/2;
        tetro_y+=iac*(-3*direction-1)/2;
        isPossible=true;
      }else if(checkMove(iac*(direction+3)/2, iac*(3*direction-1)/2,ntetro)){
        tetro_x+=iac*(direction+3)/2;
        tetro_y+=iac*(3*direction-1)/2;
        isPossible=true;
      }
    }
  }else{
    if(state%2==0){ //B,D
      if(checkMove(bd,0,ntetro)){ //1 (+-1,0)
        tetro_x+=bd;
        isPossible=true;
      }else if(checkMove(bd,-1,ntetro)){ //2 (+-1,+1)
        tetro_x+=bd;
        tetro_y--;
        isPossible=true;
      }else if(checkMove(0,2,ntetro)){ //3 (0,-2)
        tetro_y+=2;
        isPossible=true;
      }else if(checkMove(bd,2,ntetro)){ //4 (+-1,-2)
        tetro_x+=bd;
        tetro_y+=2;
        isPossible=true;
      }
    }else if(state%2==1){ //A,C
      if(checkMove(ac,0,ntetro)){ //1
        tetro_x+=ac;
        isPossible=true;
      }else if(checkMove(ac,1,ntetro)){
        tetro_x+=ac;
        tetro_y++;
        isPossible=true;
      }else if(checkMove(0,-2,ntetro)){
        tetro_y+=-2;
        isPossible=true;
      }else if(checkMove(ac,-2,ntetro)){
        tetro_x+=ac;
        tetro_y+=-2;
        isPossible=true;
      }
    }
  }
}
//落下予測
function expectCheckMove(){
  for(let y=0; y<TETRO_SIZE(); y++){
    for(let x=0; x<TETRO_SIZE(); x++){
      let nx = tetro_x+x;
      let ny = expecTetro_y+y+1;
      if(tetro[y][x]){
        if(ny<0 || ny >= FIELD_ROW || field[ny][nx])return false;
      }
    }
  }
  return true;
}
function expectation(){
  expecTetro=tetro.slice();
  expecTetro_y=tetro_y;
  while(expectCheckMove()){
    expecTetro_y++;
  }
  for(let y=0; y<TETRO_SIZE(); y++){
    for(let x=0; x<TETRO_SIZE(); x++){
      if(expecTetro[y][x]){
        drawBlock(tetro_x+x, expecTetro_y+y, tetro_type,8);
      }
    }
  }
}

// $(window).keydown(function(e){
//   if(e.keyCode==32 && !field){
//     console.log("a");
//     init();
//     drawAll();
//   }
// })

//　関数：キーが押されたときに呼ばれる関数
let isPossible=false; //回転できるか
let isDroppable=true;
document.addEventListener('keydown', KeyDownFunc);
function KeyDownFunc(e){
  if(game_over) return;
  switch(e.code){
    case 'ArrowLeft':
      if(checkMove(-1,0)){
        tetro_x--;
      }
      break;
    case 'ArrowRight':
      if(checkMove(1,0)){
        tetro_x++;
      }
      break;
    case 'ArrowDown':
      if(checkMove(0,1)){
        tetro_y++;
        action=0;
        isDroppable=false;
      }else{
        setTimeout(function(){isDroppable=true;},1000);
      };
      break;
    case 'Space':
      while(checkMove(0,1)){
        tetro_y++;
        action=0;
      }
      ToTheNext();
      isDecide=false;
      break;
    case 'KeyZ': //左回転
      ntetro=left_rotate();
      if(checkMove(0,0,ntetro)){
        isPossible=true;
      }else SRS(-1, state-1);
      if(isPossible){
        tetro=ntetro;
        action=1;
        state--;
        if(state<=0)state=4;
      }
      isPossible=false;
      break;
    case 'ArrowUp':
    case 'KeyX': //右回転
      ntetro=right_rotate();
      if(checkMove(0,0,ntetro)){
        isPossible=true;
      }else SRS(1, state+1);
      if(isPossible){
        tetro=ntetro;
        action=1;
        state++;
        if(state>=5)state=1;
      }
      isPossible=false;
      break;
    case 'KeyC': //保留
      if(holdLimit){
        hold();
        holdLimit=0;
      }
      break;
  }
  drawAll();
  // window.requestAnimationFrame(KeyDownFunc);
}
// window.requestAnimationFrame(KeyDownFunc);

document.addEventListener('keyup',(e)=>{
  if(e.code=="ArrowDown"){
    isDroppable=true;
  }
})

//<to do>
//Title
//TSDとTSmini区別
//移動速度アップ
//(retry)
//対戦

//<done>
//消したライン数
//罫線
//次のブロック
//得点
//逆回転
//cキーで保留
//nextblocks色付け
//cssで見た目改善
//ランダム整理
//4ライン消したときTetris!の表示
//T-spin判定&表示
//T-spin (SRS)
//壁・床でもT-spin判定
//全消し判定
//ホールド1回まで
//落下予測
//I-spin
//High score
//固定待機(だいたい)
//REN

