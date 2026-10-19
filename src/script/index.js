const login = document.getElementById("login")


login.addEventListener("click", (e)=>{
    e.preventDefault()

    const input_login = document.getElementById("input-login")
    if(!input_login.value){ 
    return alert(`Erro, a placa não existe ou não encontrada
        Erro.404
        `)
    }

    if(input_login.value.length == 7){
        alert(`
        placa encontrada
        Placa: ${input_login.value} `)
        window.location.href = "./src/html/user.html"
    }else{
        alert("Caracteres insuficientes")
    }


})



