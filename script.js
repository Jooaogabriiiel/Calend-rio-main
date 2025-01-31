function getNomeMes(mes) {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes];
}

function getPrimeiroDiaDoMes(ano, mes) {
    return new Date(ano, mes, 1).getDay();
}

function getUltimoDiaDoMes(ano, mes) {
    return new Date(ano, mes + 1, 0).getDate();
}

function adicionarCelulaDia(linha, dia, mesAtual, anoAtual, diaAtual, mesAtualData, anoAtualData) {
    const coluna = document.createElement('td');
    coluna.textContent = dia;

    if (dia === diaAtual && mesAtual === mesAtualData && anoAtual === anoAtualData) {
        coluna.classList.add('dia-atual');
    }

    const diaSemana = new Date(anoAtual, mesAtual, dia).getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        coluna.classList.add('fim-de-semana');
    }
    
    // Verifica se há eventos neste dia
    const dataFormatada = new Date(anoAtual, mesAtual, dia).toISOString().split('T')[0];
    const temEvento = eventos.some(evento => evento.data === dataFormatada);

    if (temEvento) {
        coluna.classList.add('dia-com-evento');
    }

    coluna.addEventListener('click', () => {
           abrirModalEvento(anoAtual, mesAtual, dia);
    });

    linha.appendChild(coluna);
}

function renderCalendario(mes, ano) {
    const dataAtual = new Date(ano, mes);
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();
    const diaAtual = new Date().getDate();
     const mesAtualData = new Date().getMonth();
     const anoAtualData = new Date().getFullYear();

    const headerElement = document.getElementById('mes-ano');
    headerElement.textContent = `${getNomeMes(mesAtual)} ${anoAtual}`;

    const primeiroDiaDoMes = getPrimeiroDiaDoMes(anoAtual, mesAtual);
    const ultimoDiaDoMes = getUltimoDiaDoMes(anoAtual, mesAtual);

    const tbody = document.getElementById('dias-corpo');
    tbody.innerHTML = '';

    let linha = document.createElement('tr');
    let diaContador = 1;

    for (let i = 0; i < primeiroDiaDoMes; i++) {
        const celulaVazia = document.createElement('td');
        linha.appendChild(celulaVazia);
    }

    while (diaContador <= ultimoDiaDoMes) {
        if (linha.children.length === 7) {
            tbody.appendChild(linha);
            linha = document.createElement('tr');
        }

        adicionarCelulaDia(linha, diaContador, mesAtual, anoAtual, diaAtual, mesAtualData, anoAtualData);
        diaContador++;
    }
    if (linha.children.length > 0) {
        tbody.appendChild(linha);
    }
}

let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
let eventoSelecionado = null;

const modal = document.getElementById('modal-eventos');
const closeModal = document.querySelector('.close-modal');
const formEvento = document.getElementById('form-evento');
const btnDeletarEvento = document.getElementById('btn-deletar-evento');
const btnCancelarEvento = document.getElementById('btn-cancelar-evento');
const btnSalvarEvento = document.getElementById('btn-salvar-evento');
const btnMarcarEvento = document.getElementById('btn-marcar-evento');

function abrirModalEvento(ano, mes, dia) {
    modal.style.display = 'flex';
    formEvento.reset();
    btnDeletarEvento.style.display = 'none';
    document.getElementById('evento-id').value = ''; //Limpa o eventoId ao abrir o modal
     eventoSelecionado = null;

    const data = new Date(ano, mes, dia);
    const dataFormatada = data.toISOString().split('T')[0];

    document.getElementById('evento-data').value = dataFormatada;
    exibirEventosDoDia(ano, mes, dia);
}

function fecharModalEvento() {
    modal.style.display = 'none';
    formEvento.reset();
     eventoSelecionado = null;
}

closeModal.addEventListener('click', fecharModalEvento);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModalEvento();
    }
});

btnCancelarEvento.addEventListener('click', (event) => {
    event.preventDefault();
    fecharModalEvento();
});


formEvento.addEventListener('submit', function(event) {
    event.preventDefault();
    salvarEvento();
});


function salvarEvento() {
    const eventoId = document.getElementById('evento-id').value;
    const titulo = document.getElementById('evento-titulo').value;
   const dataInput = document.getElementById('evento-data').value;
    const horario = document.getElementById('evento-horario').value;
    const descricao = document.getElementById('evento-descricao').value;

     const data = new Date(dataInput + 'T00:00:00');

    const evento = {
        id: eventoId || Date.now(),
        titulo: titulo,
        data: data.toISOString().split('T')[0],
        horario: horario,
        descricao: descricao
    };

    if (eventoId) {
        const index = eventos.findIndex(e => String(e.id) === eventoId);
         if (index !== -1) {
            eventos[index] = evento;
        }
    } else {
          eventos.push(evento);
    }

     localStorage.setItem('eventos', JSON.stringify(eventos));
    fecharModalEvento();
   renderCalendario(new Date(data).getMonth(), new Date(data).getFullYear())
}

btnDeletarEvento.addEventListener('click', function() {
    deletarEvento();
});


function deletarEvento() {
  const eventoId = document.getElementById('evento-id').value;
    if (eventoId) {
        eventos = eventos.filter(e => String(e.id) !== eventoId);
        localStorage.setItem('eventos', JSON.stringify(eventos));
        
         if (eventoSelecionado) {
           const dataDoEvento = new Date(eventoSelecionado.data);
           renderCalendario(dataDoEvento.getMonth(), dataDoEvento.getFullYear());
        }
    }
    eventoSelecionado = null;
     fecharModalEvento();
}

function exibirEventosDoDia(ano, mes, dia) {
  const eventosDoDiaDiv = document.getElementById('eventos-do-dia');
    eventosDoDiaDiv.innerHTML = '';

    const dataSelecionada = new Date(ano, mes, dia).toISOString().split('T')[0];

    const eventosDoDia = eventos.filter(evento => evento.data === dataSelecionada);

    if (eventosDoDia.length > 0) {
      const eventosList = document.createElement('ul');
      eventosDoDia.forEach(evento => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
          <span>${evento.titulo}</span> - ${evento.horario ? evento.horario + ' -' : ''} ${evento.descricao || 'Sem descrição'}
          <button data-id="${evento.id}" class="btn-editar-evento">Editar</button>`;
          eventosList.appendChild(listItem);
      });

        eventosDoDiaDiv.appendChild(document.createElement('h3')).textContent = 'Eventos do Dia';
        eventosDoDiaDiv.appendChild(eventosList);

          const botoesEditar = eventosDoDiaDiv.querySelectorAll('.btn-editar-evento');
            botoesEditar.forEach(botao => {
                botao.addEventListener('click', () => {
                   const eventoId = botao.getAttribute('data-id');
                    editarEvento(eventoId);
              });
           });
    } else {
        eventosDoDiaDiv.textContent = 'Nenhum evento para este dia.';
    }
}

function editarEvento(eventoId){
    eventoSelecionado = eventos.find(e => String(e.id) === eventoId);
    
    document.getElementById('evento-id').value = eventoSelecionado.id;
    document.getElementById('evento-titulo').value = eventoSelecionado.titulo;
    document.getElementById('evento-data').value = eventoSelecionado.data;
    document.getElementById('evento-horario').value = eventoSelecionado.horario;
    document.getElementById('evento-descricao').value = eventoSelecionado.descricao;
    btnDeletarEvento.style.display = 'inline-block';
}

function formatarData(data) {
    if (!data) return "";
  
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAnterior = document.getElementById("btn-anterior");
    const btnProximo = document.getElementById("btn-proximo");

    let mesExibido = new Date().getMonth();
    let anoExibido = new Date().getFullYear();

    renderCalendario(mesExibido, anoExibido);
    
     btnAnterior.addEventListener('click', () => {
        mesExibido--;
        if (mesExibido < 0) {
            mesExibido = 11;
            anoExibido--;
        }
        renderCalendario(mesExibido, anoExibido);
    });

    btnProximo.addEventListener('click', () => {
        mesExibido++;
        if (mesExibido > 11) {
            mesExibido = 0;
            anoExibido++;
        }
        renderCalendario(mesExibido, anoExibido);
    });
});