const paletaMain = document.querySelector('main');
const coresId = document.createElement('div');
coresId.id = 'color-palette';
paletaMain.appendChild(coresId);

// criado a primeira div para colocar outras divs dentro

const guardaCor = () => {
  for (let index = 0; index < 4; index += 1) {
    const novasDiv = document.createElement('div');
    novasDiv.className = 'color';
    novasDiv.style.background = 'black';
    coresId.appendChild(novasDiv);
  }
};
guardaCor();

// laço para gerar 4 quadrados via Js

const gerarCorAleatoria = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  if (gerarCorAleatoria === `rgb(${0}, ${0}, ${0})`) {
    return gerarCorAleatoria();
  } if (gerarCorAleatoria === `rgb(${255}, ${255}, ${255})`) {
    return gerarCorAleatoria();
  }
  return `rgb(${red}, ${green}, ${blue})`;
};
// criada uma função que gera cores aleatórias em rgb e descarta brancos e pretos , ainda posso implementar para que nenhuma div receba a mesma cor depois

const mudaCor = document.querySelectorAll('.color');
mudaCor[1].style.background = 'red';
mudaCor[2].style.background = 'green';
mudaCor[3].style.background = 'blue';
// quando abre a pagina já trás cores aleatórias mantendo sempre o preto sem alterar

const atualizaLocal = () => {
  const cores = {
    cor1: mudaCor[1].style.background,
    cor2: mudaCor[2].style.background,
    cor3: mudaCor[3].style.background,
  };
  localStorage.setItem('colorPalette', JSON.stringify(cores));
};
// criado um objeto para salvar e setar o local

const carregaLocal = () => {
  const cores = JSON.parse(localStorage.getItem('colorPalette'));
  if (cores) {
    mudaCor[1].style.background = cores.cor1;
    mudaCor[2].style.background = cores.cor2;
    mudaCor[3].style.background = cores.cor3;
  }
};

function botaoAleatorio() {
  mudaCor[1].style.background = gerarCorAleatoria();
  mudaCor[2].style.background = gerarCorAleatoria();
  mudaCor[3].style.background = gerarCorAleatoria();
  atualizaLocal();
}

const botaoNovaCor = document.getElementById('button-random-color');

botaoNovaCor.addEventListener('click', botaoAleatorio); // botão chama botão aleatório que aciona novas cores
carregaLocal();

// botão entre paleta e quadro

const divBotao = document.querySelector('main');
const criardivBotao = document.createElement('div');
criardivBotao.id = 'limpar';
criardivBotao.className = 'botao';
divBotao.appendChild(criardivBotao);
const divNovaBotao = document.querySelector('#limpar');
const divdoBotao = document.createElement('button');
divdoBotao.id = 'clear-board';
divdoBotao.innerHTML = '<span>Limpar</span>';
divNovaBotao.appendChild(divdoBotao);

// Quadro com 25 pixels
const quadro = document.querySelector('main');
const quadroPai = document.createElement('div');
quadroPai.id = 'pixel-board';
quadro.appendChild(quadroPai);

// criar o iput
const criarDivInput = document.createElement('div');
criarDivInput.id = 'div-input';
criardivBotao.insertAdjacentElement('afterend', criarDivInput);
const criarInput = document.querySelector('#div-input');
criarInput.className = 'botao';
const criadoInput = document.createElement('input');
criadoInput.id = 'board-size';
criarInput.appendChild(criadoInput);
const botInput = document.createElement('button');
botInput.innerHTML = 'VQV';
botInput.id = 'generate-board';
criarInput.appendChild(botInput);
criadoInput.type = 'number';
criadoInput.min = '1';
criadoInput.value = '10';
criadoInput.max = '50';
if (criadoInput === '') {
  alert('Board inválido!');
}
const pintaPixel = (eventoCor) => {
  const selecionado = document.querySelector('.selected');
  // eslint-disable-next-line no-param-reassign
  eventoCor.target.style.background = selecionado.style.background;
  // eslint-disable-next-line no-use-before-define
  salvaDesenho();
};

const quadradinhos = document.querySelectorAll('.pixel');
quadradinhos.forEach((pixel) => pixel.addEventListener('click', pintaPixel));
// criado pintar os quadrados com as cores

const adicionarListenerAoQuadrado = (quadrado) => {
  quadrado.addEventListener('click', pintaPixel);
};

const criaQuadrados = (tamanho) => {
  for (let index = 0; index < tamanho * tamanho; index += 1) {
    const novasDiv = document.createElement('div');
    novasDiv.className = 'pixel';
    novasDiv.style.background = 'white';
    quadroPai.appendChild(novasDiv);
    adicionarListenerAoQuadrado(novasDiv);
  }
};
criaQuadrados(5);

const atualizarGrade = (tamanho) => {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.style.gridTemplateColumns = `repeat(${tamanho}, 42px)`;
  pixelBoard.style.gridTemplateRows = `repeat(${tamanho}, 42px)`;
};

const limparQuadrados = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.background = 'white';
  });
};

const criarNovaGrade = () => {
  const input = document.getElementById('board-size');
  const tamanho = parseInt(input.value, 10);
  if (tamanho >= 5 && tamanho <= 50) {
    limparQuadrados();
    atualizarGrade(tamanho);
    criaQuadrados(tamanho);
  } else {
    alert('Board inválido!');
  }
};

const botaoVQV = document.getElementById('generate-board');
botaoVQV.addEventListener('click', criarNovaGrade);

// evento selected

mudaCor[0].classList.add('selected');
const adicionaclasse = (evento) => {
  const selecionado = document.querySelector('.selected');
  selecionado.classList.remove('selected');
  if (selecionado !== null) {
    evento.target.classList.add('selected');
  } else {
    mudaCor[0].classList.add('selected');
  }
};

mudaCor[0].addEventListener('click', adicionaclasse);
mudaCor[1].addEventListener('click', adicionaclasse);
mudaCor[2].addEventListener('click', adicionaclasse);
mudaCor[3].addEventListener('click', adicionaclasse);

// pintar os quadradinhos

const botaoLimpar = document.getElementById('clear-board');

const limparQuadro = () => {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  quadradinhos.forEach((pixel) => (pixel.style.background = 'white'));
};

botaoLimpar.addEventListener('click', limparQuadrados);

// criar função para salvar e recuperar o desenho atual

const salvaDesenho = () => {
  const cores = Array.from(quadradinhos).map((pixel) => pixel.style.background);
  const tamanho = Math.sqrt(quadradinhos.length);
  const desenho = {
    tamanho,
    cores,
  };
  localStorage.setItem('pixelBoard', JSON.stringify(desenho));
};

const carregaDesenho = () => {
  const desenho = JSON.parse(localStorage.getItem('pixelBoard'));
  if (desenho) {
    const { tamanho, cores } = desenho;
    limparQuadrados();
    atualizarGrade(tamanho);
    criaQuadrados(tamanho);
    quadradinhos.forEach((pixel, index) => {
      // eslint-disable-next-line no-param-reassign
      pixel.style.background = desenho[index];
    });
  }
};

carregaDesenho();
