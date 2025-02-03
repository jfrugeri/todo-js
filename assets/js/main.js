const input_tarefa = document.querySelector(".input-tarefa");
const btn_tarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

input_tarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!input_tarefa.value) return;
    criaTarefa(input_tarefa.value);
  }
});

function limpaInput() {
  input_tarefa.value = "";
  input_tarefa.focus();
}

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "Apagar esta tarefa");
  botaoApagar.appendChild(document.createTextNode("Delete"));
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  criaBotaoApagar(li);
  limpaInput();
  salvarTarefas();
}

btn_tarefa.addEventListener("click", function (e) {
  if (!input_tarefa.value) return;
  criaTarefa(input_tarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {  
  const li_tarefas = tarefas.querySelectorAll("li");
  const lista_de_tarefas = [];

  for (let tarefa of li_tarefas) {
    let tarefa_texto = tarefa.innerText;
    tarefa_texto = tarefa_texto.replace("Delete", "").trim();
    lista_de_tarefas.push(tarefa_texto);
  }

  const tarefas_json = JSON.stringify(lista_de_tarefas);
  localStorage.setItem("tarefas", tarefas_json);

}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const lista_de_tarefas = JSON.parse(tarefas);

  for (let tarefa of lista_de_tarefas) {
    criaTarefa(tarefa);
  }
}

adicionaTarefasSalvas();
