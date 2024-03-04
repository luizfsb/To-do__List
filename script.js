const ulTarefas = document.querySelector('[data-lista-tarefas]')
const btnAdd = document.querySelector('[data-botao]')
const tarefa = document.getElementById('tarefa')


// lista das tarefas

let listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null

// Adiciona as tarefas

btnAdd.addEventListener('click', () => {
    const objTarefa = {
        descricao: tarefa.value,
        completa: null
    } 
    listaDeTarefas.push(objTarefa)
    const elemento = elementoTarefa(objTarefa)
    ulTarefas.append(elemento)
    atualizaStorage()
    tarefa.value = ''
})

// mostra as tarefas quando criadas

function elementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add("item-tarefa")

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('tarefa__paragrafo')
    paragrafo.textContent = tarefa.descricao

    const btnRemover = document.createElement('img')
    btnRemover.setAttribute('src', './img/trash-can-solid.svg')
    btnRemover.classList.add('btn-excluir')

    li.classList.add('icone-tarefa')
    li.append(paragrafo)
    li.append(btnRemover)
    ulTarefas.append(li)

    // Remove tarefas

    btnRemover.onclick = () => {
        tarefaSelecionada = listaDeTarefas.indexOf(tarefa)
        listaDeTarefas.splice(tarefaSelecionada)
        li.remove()
        atualizaStorage()
    }
    
    // Tarefa Selecionada

    if(tarefa.completa == true){
        li.classList.add('icone-tarefa__concluida')
        paragrafo.classList.add('tarefa__paragrafo__completa')
    }else {
        li.onclick = () => {
            li.classList.toggle('icone-tarefa__concluida')
            paragrafo.classList.toggle('tarefa__paragrafo__completa')
            tarefa.completa = true
            atualizaStorage()
        }
    }

    return li
}

// mostra as tarefas criadas

listaDeTarefas.forEach((tarefa) => elementoTarefa(tarefa))

// Atualiza as tarefas

function atualizaStorage(){
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas))
}

