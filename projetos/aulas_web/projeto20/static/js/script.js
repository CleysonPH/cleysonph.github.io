function escrever(){
    var final = parseInt(prompt('Valor final da contagem?'))

    var caderno = document.getElementById('caderno')
    var caderno.innerHTML = ""

    for (let count = 1; count <= final; count++) {
        caderno.innerHTML += count + '<br>'        
    }
}
