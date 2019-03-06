function escrever(){
    let final = parseInt(prompt('Valor final da contagem?'))

    let caderno = document.getElementById('caderno')
    let caderno.innerHTML = ""

    for (let count = 1; count <= final; count++) {
        caderno.innerHTML += count + '<br>'        
    }
}
