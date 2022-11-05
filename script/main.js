window.addEventListener("load",function(){
    this.setTimeout(1);
    document.getElementById("configuracoes").style.display = "block";
    console.log("loaded");
},false);

function giveup(){
    let board = document.querySelector(".board");
    board.remove();
    toggleDiv("status");
    alert("Desistiu");
}

function setupConfigOptions(){
    //Mostra opcao de comecar contra IA se oponent=IA, mostra P2 caso contrario
    let dynFirst = document.getElementById("dynFirst")
    if(document.getElementById("opponent").value=='2'){
        document.getElementById("first").value=0
        dynFirst.text = "Jogador 2"
    }
    else dynFirst.text="AI"
}