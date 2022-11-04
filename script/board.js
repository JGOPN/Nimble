function generateBoard(){
    if(document.querySelector(".board")!=null){
        document.querySelector(".board").remove();
    }

    const base = document.getElementById("gameContainer");
    const board = document.createElement('div');
    board.classList.add("board");

    cols = parseInt(document.getElementById("size").value)
    game.init(
        cols,
        parseInt(document.getElementById("difficulty").value),
        parseInt(document.getElementById("opponent").value),
        parseInt(document.getElementById("first").value)
    );

    let biggestColumn = 0; //depois gameContainer min-height = biggestcolumn * pieceheight * 1.1

    for(let i=0; i<cols; i++){
        let col = document.createElement('div');
        col.classList.add("boardCol");
        col.setAttribute("id","c"+i);
        let n = Math.floor(Math.random()*4)+1; /* entre 1-5 por pilha */
        if(n>biggestColumn) biggestColumn=n;
        game.board[i] = n; //game.board = array com piece count de cada coluna

        for(let j=n-1; j>=0; j--){
            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.classList.add("r"+j);
            col.appendChild(piece);
        }
        board.appendChild(col);
    }

    base.append(board);
    addPieceListener();
    showDiv("status");
    base.style.minHeight = biggestColumn * document.querySelector(".piece").clientHeight * 1.2 + "px";
}

function addPieceListener(){    
    let pieces = document.getElementsByClassName("piece");
    for(let piece of pieces){
        piece.addEventListener('click', () => {
            game.play(piece.parentElement.id, piece.classList[1][1])
        },false);
        piece.addEventListener('mouseover',() => {
            piece.parentElement.childNodes.forEach((element) => { 
                if(element.classList[1]>=piece.classList[1])
                    element.classList.add("highlited-piece");
             })
        })
        piece.addEventListener('mouseout',() => {
            piece.parentElement.childNodes.forEach((element) => { 
                element.classList.remove("highlited-piece");
             })
        })

    }
}

function removePieces(col,row){
    let column = document.getElementById(col);
    let pieces = column.childNodes;
    for(let i = pieces.length-1; i >= row; i--){
        pieces[0].remove();//sempre remove "de cima"
    }
    pieces.forEach((element) => { 
        element.classList.remove("highlited-piece");
     })
}


function countPieces(colId){
    let col = document.getElementById(colId);
    return col.childElementCount;
}

function updateCurrentPlayer(){
    playersShort=["P1","AI","P2"]
    document.getElementById("player").innerHTML=playersShort[game.turnPlayer()];
}