window.addEventListener("load",function(){
    this.setTimeout(1);
    document.getElementById("configuracoes").style.display = "block";
    console.log("setting");
},false);

function giveup(){
    let board = document.querySelector(".board");
    board.remove();
    alert("Desistiu");
}