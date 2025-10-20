// --- EXERCÍCIO 2: CLASSE ALUNO ---
class Aluno {
    constructor(id, nome, idade, curso, notaFinal) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Método que retorna true se a nota for >= 7
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Método que retorna uma string formatada com os dados
    toString() {
        return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota: ${this.notaFinal}`;
    }
}

// --- ARMAZENAMENTO EM MEMÓRIA (EXERCÍCIO 1) ---
let alunos = [];
let proximoId = 1;
let alunoEmEdicao = null;

// --- REFERÊNCIAS DO DOM ---
const form = document.getElementById('aluno-form');
const tabelaAlunos = document.getElementById('tabela-alunos');
const btnCancelar = document.getElementById('btn-cancelar');

// --- FUNÇÃO PARA RENDERIZAR A TABELA ---
const renderizarTabela = () => {
    tabelaAlunos.innerHTML = ''; // Limpa a tabela antes de redesenhar

    if (alunos.length === 0) {
        tabelaAlunos.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum aluno cadastrado.</td></tr>';
        return;
    }

    alunos.forEach(aluno => {
        const tr = document.createElement('tr');
        const situacao = aluno.isAprovado() 
            ? '<span class="badge bg-success">Aprovado</span>' 
            : '<span class="badge bg-danger">Reprovado</span>';

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>${situacao}</td>
            <td>
                <button class="btn btn-sm btn-warning btn-editar" data-id="${aluno.id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${aluno.id}">Excluir</button>
            </td>
        `;
        tabelaAlunos.appendChild(tr);
    });
};

// --- EXERCÍCIO 3: EVENTOS, FUNÇÕES ANÔNIMAS E ARROW FUNCTIONS ---

// Evento de submit do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);

    if (alunoEmEdicao) {
        // Editando um aluno existente
        alunoEmEdicao.nome = nome;
        alunoEmEdicao.idade = idade;
        alunoEmEdicao.curso = curso;
        alunoEmEdicao.notaFinal = notaFinal;
        console.log(`Aluno editado: ${alunoEmEdicao.toString()}`);
        alert('Aluno atualizado com sucesso!');
        alunoEmEdicao = null;
        btnCancelar.classList.add('d-none');
    } else {
        // Cadastrando um novo aluno
        const novoAluno = new Aluno(proximoId++, nome, idade, curso, notaFinal);
        alunos.push(novoAluno);
        console.log(`Aluno cadastrado: ${novoAluno.toString()}`);
        alert('Aluno cadastrado com sucesso!');
    }
    
    form.reset();
    renderizarTabela();
});

// Evento de clique na tabela (para botões de editar e excluir)
tabelaAlunos.addEventListener('click', function(event) {
    const id = parseInt(event.target.dataset.id);
    
    // Excluir aluno
    if (event.target.classList.contains('btn-excluir')) {
        alunos = alunos.filter(aluno => aluno.id !== id);
        renderizarTabela();
        console.log(`Aluno com ID ${id} foi excluído.`);
        alert('Aluno excluído com sucesso!');
    }

    // Editar aluno
    if (event.target.classList.contains('btn-editar')) {
        alunoEmEdicao = alunos.find(aluno => aluno.id === id);
        if (alunoEmEdicao) {
            document.getElementById('nome').value = alunoEmEdicao.nome;
            document.getElementById('idade').value = alunoEmEdicao.idade;
            document.getElementById('curso').value = alunoEmEdicao.curso;
            document.getElementById('notaFinal').value = alunoEmEdicao.notaFinal;
            btnCancelar.classList.remove('d-none');
            window.scrollTo(0, 0); // Rola a página para o topo para ver o formulário
        }
    }
});

// Evento para cancelar a edição
btnCancelar.addEventListener('click', () => {
    alunoEmEdicao = null;
    form.reset();
    btnCancelar.classList.add('d-none');
});

// --- EXERCÍCIO 4: RELATÓRIOS COM FILTER, MAP, REDUCE, SORT ---
const resultadoRelatorio = document.getElementById('relatorio-resultado');

document.getElementById('btn-aprovados').addEventListener('click', () => {
    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    let html = '<h5>Alunos Aprovados (Nota >= 7)</h5>';
    if (aprovados.length > 0) {
        html += '<ul class="list-group">';
        aprovados.forEach(aluno => {
            html += `<li class="list-group-item">${aluno.nome} - Nota: ${aluno.notaFinal}</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>Nenhum aluno aprovado.</p>';
    }
    resultadoRelatorio.innerHTML = html;
});

document.getElementById('btn-media-notas').addEventListener('click', () => {
    if (alunos.length === 0) {
        resultadoRelatorio.innerHTML = '<p>Não há alunos para calcular a média.</p>';
        return;
    }
    const somaDasNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
    const media = (somaDasNotas / alunos.length).toFixed(2);
    resultadoRelatorio.innerHTML = `<h5>Média das Notas Finais</h5><p class="fs-4">${media}</p>`;
});

document.getElementById('btn-media-idades').addEventListener('click', () => {
     if (alunos.length === 0) {
        resultadoRelatorio.innerHTML = '<p>Não há alunos para calcular a média.</p>';
        return;
    }
    const somaDasIdades = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
    const media = (somaDasIdades / alunos.length).toFixed(1);
    resultadoRelatorio.innerHTML = `<h5>Média das Idades</h5><p class="fs-4">${media} anos</p>`;
});

document.getElementById('btn-ordenar-nome').addEventListener('click', () => {
    const nomesOrdenados = [...alunos] // Cria uma cópia para não alterar o array original
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(aluno => aluno.nome);
    
    let html = '<h5>Alunos em Ordem Alfabética</h5>';
    if (nomesOrdenados.length > 0) {
        html += '<ul class="list-group">';
        nomesOrdenados.forEach(nome => {
            html += `<li class="list-group-item">${nome}</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>Nenhum aluno cadastrado.</p>';
    }
    resultadoRelatorio.innerHTML = html;
});

document.getElementById('btn-alunos-curso').addEventListener('click', () => {
    const contagemPorCurso = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});

    let html = '<h5>Quantidade de Alunos por Curso</h5>';
    if (Object.keys(contagemPorCurso).length > 0) {
         html += '<ul class="list-group">';
        for(const curso in contagemPorCurso) {
            html += `<li class="list-group-item d-flex justify-content-between align-items-center">${curso} <span class="badge bg-primary rounded-pill">${contagemPorCurso[curso]}</span></li>`;
        }
        html += '</ul>';
    } else {
         html += '<p>Nenhum aluno cadastrado.</p>';
    }
    resultadoRelatorio.innerHTML = html;
});

// --- INICIALIZAÇÃO ---
// Renderiza a tabela pela primeira vez ao carregar a página
renderizarTabela();
