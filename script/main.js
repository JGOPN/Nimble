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

function authFormToggle(){
    //troca o form de auth entre "login" e "signup"
    const auth = document.getElementById("autenticacao")
    let login = document.getElementById("login")
    if(login!=null){
        auth.innerHTML = 
                        `<h2>Sign up</h2>
                        <form id="signup">
                            <div>
                                <input type="text" placeholder="Username" required="">
                            </div>
                            <div>
                                <input type="password" placeholder="Password" required="">
                            </div>
                            <div>
                                <button class="login_button" type="submit">Registar-se</button>
                            </div>
                        </form>
                        <a href="#" onclick="authFormToggle()"><p>Login</p></a>
        `
    }
    else{
        auth.innerHTML = `<h2>Log in</h2>
                        <form id="login">
                            <div>
                                <input type="text" placeholder="Username" required="">
                            </div>
                            <div>
                                <input type="password" placeholder="Password" required="">
                            </div>
                            <div>
                                <button class="login_button" type="submit">Log in</button>
                            </div>
                        </form>
                        <a href="#" onclick="authFormToggle()"><p>Não estou registado</p></a>
                        `
    }
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