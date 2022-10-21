
window.addEventListener("load",function(){
    console.log("loaded");
},false);

function generateBoard(npieces,cols){
    const base = document.getElementById("gameContainer");
    const board = document.createElement('div');
    board.classList.add("board");
    
    document.getElementById("start").onclick = function(){this.disabled=true;}

    for(let i=0; i<cols; i++){
        let col = document.createElement('div');
        col.classList.add("boardCol");
        col.setAttribute("id","c"+i);

        let n = Math.floor(Math.random()*4)+1; /* entre 1-5 por pilha */
        console.log(n)
        for(let j=n-1; j>=0; j--){
            const piece = document.createElement("div");
            piece.classList.add("piece");
            //piece.setAttribute("id",i+""+j);
            piece.classList.add("r"+j);
            col.appendChild(piece);
        }
        board.appendChild(col);
    }

    base.append(board);
    addPieceListener();
}

function addPieceListener(){    
    let pieces = document.getElementsByClassName("piece");
    for(let piece of pieces){
        piece.addEventListener('click', () => {
            console.log("removing from col " + piece.parentElement.id + " row " + piece.classList[1])
            piece.addEventListener("click",removePieces(
                piece.parentElement.id, piece.classList[1][1]
            ),false);
        },false)
    }
}

function removePieces(col,row){
    let column = document.getElementById(col);
    let pieces = column.childNodes;
    console.log("removing from " + col + ":");
    let removed = ""
    for(let i = 0; i <= row; row--){
        removed += row + ", "
        pieces[i].remove();
    }
    console.log(removed);
}

function addPieces(n){
    //recebe n de pecas e retorna numero aleatorio entre [1,n] para ser colocada na coluna
    //o numero n (maximo de pecas maximas por cada coluna vai ser decidido no generateBoard?)
    let rand = Math.floor(Math.random() * n + 1);
    console.log("adding " + rand + " pieces")
}