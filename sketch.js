 //variáveis da bolinha
let xBolinha = 150 //Posição X da bolinha
let yBolinha = 200; //Posição Y da bolinha
let diametro = 20; //tamanho da bolinha
let raio = diametro / 2; //raio da bolinha

//variáveis do oponente
let xRaqueteOponente = 585; //Posição X da raquete do oponente
let yRaqueteOponente = 150; //Posição Y da raquete do oponente

//velocidade da bolinha
let velocidadeXBolinha = 6; //velocidade X da bolinha
let velocidadeYBolinha = 6; //velocidade Y da bolinha

//variáveis da raquete
let xRaquete = 5; //Possição X da raquete
let yRaquete = 150; //Possição Y da raquete
let raqueteComprimento = 10; //Comprimento da raquete
let raqueteAltura = 90; //Altura da raquete

//placar do jogo
let meusPontos = 0; //Meus pontos iniciais
let pontosDoOponente = 0; //Pontos iniciais do oponente


//sons do jogo
let raquetada; //sons da raquete
let ponto; //sons do ponto
let trilha; //sons da trilha 

let colidiu = false;
function setup() { //função de configuração
  createCanvas(600, 400); //tamanho da tela
    trilha.loop(); //sons de loop
}

function draw() { //função de desenho
    background(0); //Define a cor de fundo 
    mostraBolinha(); //Define a bolinha na tela
    movimentaBolinha(); //É a função de movimento da bolinha
    verificaColisaoBorda(); //Adiciona as bordas na tela
    mostraRaquete(xRaquete, yRaquete); //Mostrar a raquete do jogador
    movimentaMinhaRaquete(); //É o movimento da raquete do jogador
    verificaColisaoRaquete(xRaquete, yRaquete); //Define a colisão da raquete do jogador
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);  //Define a colisão da raquete do oponete
    mostraRaquete(xRaqueteOponente, yRaqueteOponente); //Mostrear a raquete do oponente
    movimentaRaqueteOponente(); //Movimento da raquete do oponente
    incluiPlacar() //Mostrar o placar da partida
    marcaPonto();//Marcação de ponto
}
function mostraBolinha() { //Função de mostrar a bolinha
  circle(xBolinha, yBolinha, diametro); 
}

function movimentaBolinha() { //Afunção do movimento da bolinha
  xBolinha += velocidadeXBolinha; //velocidade vertical da bolinha
  yBolinha += velocidadeYBolinha; //velocidade horinzontal da bolinha
}

function verificaColisaoBorda() { //Vericar se a colisão da bolinha com a borda
  if (xBolinha + raio > width || xBolinha - raio < 0) { //Raio de colisão x da bolinha
    velocidadeXBolinha *= -1; //Velocidade de colisão x da bolinha
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) { //Raio de colisão Y da bolinha
    velocidadeYBolinha *= -1;  //Velocidade de colisão Y da bolinha
  }
}

function mostraRaquete(x,y) { //Função para monstrar a raquete
    rect(x, y, raqueteComprimento, raqueteAltura); //Medidas da raquete
}

function movimentaMinhaRaquete() { //Função de movimento da raquete
  if(keyIsDown(UP_ARROW)) { //Função velocidade para cima da raquete
    yRaquete -= 10; //Velocidade da raquete para cima
  }
  if(keyIsDown(DOWN_ARROW)) { //Função velocidade para baixo da raquete
    yRaquete += 10; //Velocidade da raquete para baixo
  }
}

function verificaColisaoRaquete() { //Função de verificar quando a colisão
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) { 
    velocidadeXBolinha *= -1; 
     raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) { //Função de verificar quando a colisão
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio); //: Veriica a colisão entre a raquete e a bolinha
    if (colidiu){ //Condicional que verifica se colidiu é true
        velocidadeXBolinha *= -1; //inverte a direção da bolinha no eixo X.
        raquetada.play(); //Toca o som da raquete ao bater na bolinha
  }
}

function movimentaRaqueteOponente(){ //Declara uma função chamada movimentaRaqueteOponente sem parâmetros
    if (keyIsDown(87)){ //Verifica se a tecla W está pressionada.
        yRaqueteOponente -= 10; //Move a raquete do oponente para cima.
    }
    if (keyIsDown(83)){ //Verifica se a tecla S está pressionada.
        yRaqueteOponente += 10; //Move a raquete do oponente para baixo.
    }
}


function incluiPlacar(){ //Declara uma função chamada incluiPlacar sem parâmetros
  stroke(250) // Define a cor do contorno do texto
    textAlign(CENTER); //Centraliza o texto.
    textSize(16); //Define o tamanho do texto para 16
    fill(color(255,140, 0)); //Define a cor de preenchimento para laranja
    rect(150, 10, 40, 20);//Desenha um retângulo no placar do jogador
    fill(255); //Define a cor de preenchimento para branco
    text(meusPontos, 170, 26); //Desenha a pontuação do jogador
    fill(color(255,140, 0)); //Define a cor de preenchimento para laranja novamente
    rect(450, 10, 40, 20); //Desenha um retângulo no placar do oponente
    fill(255); //Define a cor de preenchimento para branco
    text(pontosDoOponente, 470, 26); //Desenha a pontuação do oponente



}


function marcaPonto() { // Declara uma função chamada marcaPonto
    if (xBolinha > 590) { //Verifica se a posição da bolinha no eixo X é maior que 590, o que significa que a bolinha passou da raquete do oponente
        meusPontos += 1; //Incrementa a pontuação do jogador
        ponto.play(); //Toca o som de ponto marcado
    }
    if (xBolinha < 10) { //Verifica se a posição da bolinha no eixo X é menor que 10, o que significa que a bolinha passou da sua raquete
        pontosDoOponente += 1; //Incrementa a pontuação do oponente
        ponto.play(); //Toca o som de ponto marcado novamente
    }
}


function preload(){ //função carrega os sons antes do início do jogo
  trilha = loadSound("trilha.mp3"); //Carrega o arquivo de som "trilha.mp3"
  ponto = loadSound("ponto.mp3"); //Carrega o arquivo de som "ponto.mp3"
  raquetada = loadSound("raquetada.mp3"); //Carrega o arquivo de som "raquetada.mp3" 
}

