const divs=["classificacoes","ajuda"];

function closeAllDivs(){
    //esconde todas as divs floating abertas
    divs.forEach(str => document.getElementById(str).style.display = "none" );
}

function toggleDiv(x){
    //esconde ou mostra div, recebe string id
    //da primeira vez js nao reconhece display none, precisa clicar 2 vezes
    //Solucao=inicializar classes com none neste arquivo?
    if(document.getElementById(x).style.display !== "none")
        document.getElementById(x).style.display = "none";
    else{
        closeAllDivs();
        document.getElementById(x).style.display = "block";
    }
}

function showDiv(x){
    document.getElementById(x).style.display = "block";
}