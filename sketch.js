let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;
let xRaquete = 5;
let yRaquete = 150;
let xOponente = 585;
let yOponente = 150;

let comprimentoRaquete = 10;
let alturaRaquete = 100;

let meusPontos = 0;
let pontosOponente = 0;

let velocidadeXBolinha = 2;
let velocidadeYBolinha = 2;
let velocidadeOponente = 2;

let raqueteda;
let ponto;
let trilha;

function preload() {
  soundFormats('mp3');
  raqueteda = loadSound("sound/raquetada.mp3");
  ponto = loadSound("sound/ponto.mp3");
  trilha = loadSound("sound/trilha.mp3");
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
function mostrarRaquete(X, Y){
  rect(X, Y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW) && yRaquete>0){
    yRaquete -= 5;
  }
  if (keyIsDown(DOWN_ARROW) && yRaquete < (height - 100)) {
    yRaquete += 5;
  }
}

function movimentarBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(bordaBolinhaX, bordaBolinhaY){
  if(xBolinha > bordaBolinhaX || xBolinha < raio){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha > bordaBolinhaY || yBolinha < raio){
    velocidadeYBolinha *= -1;
  }
}

function colisaoMinhaRaqueteBiblioteca(xraquete, yraquete) {
    colidiu = collideRectCircle(xraquete, yraquete, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        //raqueteda.play();
    }
}

function movimentaRaqueteOponente(){
 yOponente += velocidadeOponente;
  if(yOponente==height - 100 || yOponente==0){
    velocidadeOponente *= -1;
  }
}

function contaPontos(){
  if(xBolinha<8){
    pontosOponente++;
    ponto.play();
  }else if(xBolinha>592){
    meusPontos++;
    ponto.play();
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(20)
  fill(color(255, 153, 51));
  rect(125, 7.5, 50, 25, 10);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 153, 51));
  rect(425, 7.5, 50, 25, 10);
  fill(255);
  text(pontosOponente, 450, 26);
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}



function draw() {
let bordaBolinhaX = width - raio;
let bordaBolinhaY = height - raio;
background(0);
mostrarBolinha();
movimentarBolinha();
verificaColisaoBorda(bordaBolinhaX, bordaBolinhaY);
mostrarRaquete(xRaquete, yRaquete);
mostrarRaquete(xOponente, yOponente);
movimentaMinhaRaquete();
colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
colisaoMinhaRaqueteBiblioteca(xOponente, yOponente);
movimentaRaqueteOponente();
incluiPlacar();
contaPontos();
bolinhaNaoFicaPresa()

}

