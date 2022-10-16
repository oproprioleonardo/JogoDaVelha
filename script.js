let vitoriasA = 0,
    vitoriasB = 0;
let partidas = 0;
let pessoaA = "Jogador 1",
    pessoaB = "Jogador 2";
var jogada;
let finalizando = false;
const sortearQuemComeca = () => jogada = Math.random() > 0.5 ? "X" : "O";
const pegarSimbolo = (position) => document.getElementById(position).innerHTML;
const assinalarNovaJogada = (position) => document.getElementById(position).innerHTML = jogada;
const limparAlertas = () => document.getElementsByClassName("alertas")[0].innerHTML = "";
const proximo = () => jogada = jogada == "X" ? "O" : "X";

sortearQuemComeca();
alertarQuemComeca();

function salvarNome(element) {
    if (element.id == "jogador1")
        pessoaA = element.value;
    else pessoaB = element.value;
}

function novaJogada(element) {
    let position = element.id;
    if (pegarSimbolo(position) != "" || finalizando) return;
    limparAlertas();
    let validacoes = pegarValidacoes(position);
    assinalarNovaJogada(position);
    if (validacoes.some(verificacao => verificacao())) {
        finalizar();
        return;
    } else {
        let preenchidas = 0;
        let campos = document.getElementsByClassName("jogo")[0].children;
        for (let campo of campos) {
            if  (campo.innerHTML != "") preenchidas++;
        }
        if (preenchidas == 9) {
            recomecar();
            return;
        }
    }
    proximo();
}

function finalizar() {
    finalizando = true;
    alertarQuemGanhou();
    atualizarDados();
    atualizarExibicaoDeDados();
    setTimeout(recomecar, 4000);
}

function recomecar() {
    let campos = document.getElementsByClassName("jogo")[0].children;
    for (let campo of campos) {
        campo.innerHTML = "";
    }
    limparAlertas();
    sortearQuemComeca();
    alertarQuemComeca();
    finalizando = false;
}

function atualizarDados() {
    if (jogada == "X") vitoriasA++;
    else vitoriasB++;
    partidas++;
}

function atualizarExibicaoDeDados() {
    document.getElementById("vitoriasA").innerHTML = "Vitórias: " + vitoriasA;
    document.getElementById("vitoriasB").innerHTML = "Vitórias: " + vitoriasB;
}

function alertarQuemGanhou() {
    let msg;
    if (jogada == "X") msg = `${pessoaA} venceu a partida!`
    else msg = `${pessoaB} venceu a partida!`;
    alertar(msg);
}

function alertarQuemComeca() {
    let msg;
    if (jogada == "X") msg = `${pessoaA} vai começar a partida!`
    else msg = `${pessoaB} vai começar a partida!`
    alertar(msg);
}

function alertar(msg) {
    document.getElementsByClassName("alertas")[0].innerHTML = msg;
}

function pegarValidacoes(position) {
    let validacoes = [];
    switch (position) {
        case "A":
            validacoes.push(checarDiagonalAI, checarColunaAG, checarLinhaAC)
            break;
        case "B":
            validacoes.push(checarColunaBH, checarLinhaAC)
            break;
        case "C":
            validacoes.push(checarDiagonalCG, checarColunaCI, checarLinhaAC)
            break;
        case "D":
            validacoes.push(checarLinhaDF, checarColunaAG);
            break;
        case "E":
            validacoes.push(checarDiagonalCG, checarDiagonalAI, checarColunaBH, checarLinhaDF);
            break;
        case "F":
            validacoes.push(checarLinhaDF, checarColunaCI);
            break;
        case "G":
            validacoes.push(checarDiagonalCG, checarLinhaGI, checarColunaAG);
            break;
        case "H":
            validacoes.push(checarColunaBH, checarLinhaGI);
            break;
        case "I":
            validacoes.push(checarDiagonalAI, checarColunaCI, checarLinhaGI);
            break;
        default:
            break;
    }
    return validacoes;
}


function checarLinhaAC() {
    const x = pegarSimbolo("A");
    const y = pegarSimbolo("B");
    const z = pegarSimbolo("C");
    return x != "" && x == y && x == z;
}

function checarLinhaDF() {
    const x = pegarSimbolo("D");
    const y = pegarSimbolo("E");
    const z = pegarSimbolo("F");
    return x != "" && x == y && x == z;
}

function checarLinhaGI() {
    const x = pegarSimbolo("G");
    const y = pegarSimbolo("H");
    const z = pegarSimbolo("I");
    return x != "" && x == y && x == z;
}

function checarColunaAG() {
    const x = pegarSimbolo("A");
    const y = pegarSimbolo("D");
    const z = pegarSimbolo("G");
    return x != "" && x == y && x == z;
}

function checarColunaBH() {
    const x = pegarSimbolo("B");
    const y = pegarSimbolo("E");
    const z = pegarSimbolo("H");
    return x != "" && x == y && x == z;
}

function checarColunaCI() {
    const x = pegarSimbolo("C");
    const y = pegarSimbolo("F");
    const z = pegarSimbolo("I");
    return x != "" && x == y && x == z;
}

function checarDiagonalAI() {
    const x = pegarSimbolo("A");
    const y = pegarSimbolo("E");
    const z = pegarSimbolo("I");
    return x != "" && x == y && x == z;
}

function checarDiagonalCG() {
    const x = pegarSimbolo("C");
    const y = pegarSimbolo("E");
    const z = pegarSimbolo("G");
    return x != "" && x == y && x == z;
}