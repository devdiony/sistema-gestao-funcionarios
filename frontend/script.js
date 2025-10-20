// Exercício 2: Criando a classe Funcionario
class Funcionario {
    // Atributos privados
    #id;
    #nome;
    #idade;
    #cargo;
    #salario;

    // Construtor para inicializar os dados
    constructor(nome, idade, cargo, salario) {
        this.#id = Funcionario.gerarId();
        this.#nome = nome;
        this.#idade = idade;
        this.#cargo = cargo;
        this.#salario = salario;
    }

    // Métodos de acesso (getters)
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get idade() { return this.#idade; }
    get cargo() { return this.#cargo; }
    get salario() { return this.#salario; }

    // Métodos de acesso (setters) para permitir a atualização
    set nome(novoNome) { this.#nome = novoNome; }
    set idade(novaIdade) { this.#idade = novaIdade; }
    set cargo(novoCargo) { this.#cargo = novoCargo; }
    set salario(novoSalario) { this.#salario = novoSalario; }

    // Método estático para gerar um ID único simples
    static proximoId = 1;
    static gerarId() {
        return this.proximoId++;
    }

    // Método para formatar os dados do funcionário
    toString() {
        return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
    }
    
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            idade: this.idade,
            cargo: this.cargo,
            salario: this.salario
        };
    }
}

// Classe para gerenciar a lista de funcionários e a interface
class GerenciadorDeFuncionarios {
    constructor() {
        this.funcionarios = [];
        this.form = document.getElementById('formFuncionario');
        this.tabelaCorpo = document.getElementById('tabelaFuncionarios');
        this.btnCancelar = document.getElementById('btnCancelar');
        this.campoId = document.getElementById('funcionarioId');
        
        this.btnRelatorioSalario = document.getElementById('btnRelatorioSalario');
        this.btnRelatorioMediaSalarial = document.getElementById('btnRelatorioMediaSalarial');
        this.btnRelatorioCargos = document.getElementById('btnRelatorioCargos');
        this.btnRelatorioNomesMaiusculo = document.getElementById('btnRelatorioNomesMaiusculo');
        this.areaRelatorios = document.getElementById('areaRelatorios');
        this.conteudoRelatorio = document.getElementById('conteudoRelatorio');

        this.registrarEventos();
    }
    
    registrarEventos() {
        this.form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            this.salvar();
        });

        this.btnCancelar.addEventListener('click', () => {
            this.limparFormulario();
        });

        this.btnRelatorioSalario.addEventListener('click', () => this.gerarRelatorioSalariosAltos());
        this.btnRelatorioMediaSalarial.addEventListener('click', () => this.gerarRelatorioMediaSalarial());
        this.btnRelatorioCargos.addEventListener('click', () => this.gerarRelatorioCargosUnicos());
        this.btnRelatorioNomesMaiusculo.addEventListener('click', () => this.gerarRelatorioNomesMaiusculo());
    }

    salvar() {
        let id = parseInt(this.campoId.value);
        let nome = document.getElementById('nome').value;
        let idade = parseInt(document.getElementById('idade').value);
        let cargo = document.getElementById('cargo').value;
        let salario = parseFloat(document.getElementById('salario').value);

        if (id) {
            this.editar(id, nome, idade, cargo, salario);
        } else {
            let novoFuncionario = new Funcionario(nome, idade, cargo, salario);
            this.funcionarios.push(novoFuncionario);
        }

        this.renderizarTabela();
        this.limparFormulario();
    }

    renderizarTabela() {
        this.tabelaCorpo.innerHTML = '';
        if (this.funcionarios.length === 0) {
            let linhaVazia = `<tr><td colspan="6" class="text-center">Nenhum funcionário cadastrado.</td></tr>`;
            this.tabelaCorpo.innerHTML = linhaVazia;
            return;
        }

        this.funcionarios.forEach(funcionario => {
            let linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${funcionario.id}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.idade}</td>
                <td>${funcionario.cargo}</td>
                <td>R$ ${funcionario.salario.toFixed(2)}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-warning btn-editar">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-excluir">
                            <i class="bi bi-trash"></i> Excluir
                        </button>
                    </div>
                </td>
            `;

            let btnEditar = linha.querySelector('.btn-editar');
            btnEditar.addEventListener('click', () => this.carregarParaEdicao(funcionario.id));

            let btnExcluir = linha.querySelector('.btn-excluir');
            btnExcluir.addEventListener('click', () => this.excluir(funcionario.id));

            this.tabelaCorpo.appendChild(linha);
        });
    }

    carregarParaEdicao(id) {
        let funcionario = this.funcionarios.find(f => f.id === id);
        if (!funcionario) return;

        this.campoId.value = funcionario.id;
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('idade').value = funcionario.idade;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('salario').value = funcionario.salario;

        this.btnCancelar.style.display = 'inline-block';
    }

    editar(id, nome, idade, cargo, salario) {
        let funcionario = this.funcionarios.find(f => f.id === id);
        if (funcionario) {
            funcionario.nome = nome;
            funcionario.idade = idade;
            funcionario.cargo = cargo;
            funcionario.salario = salario;
        }
    }

    excluir(id) {
        if (confirm(`Tem certeza que deseja excluir o funcionário com ID ${id}?`)) {
            this.funcionarios = this.funcionarios.filter(f => f.id !== id);
            this.renderizarTabela();
        }
    }

    limparFormulario() {
        this.form.reset();
        this.campoId.value = '';
        this.btnCancelar.style.display = 'none';
        document.getElementById('nome').focus();
    }
    
    mostrarResultadoRelatorio(titulo, dados) {
        this.areaRelatorios.style.display = 'block';
        let conteudoFormatado = JSON.stringify(dados, null, 2);
        this.conteudoRelatorio.textContent = `${titulo}:\n\n${conteudoFormatado}`;
    }

    gerarRelatorioSalariosAltos() {
        let funcionariosFiltrados = this.funcionarios.filter(f => f.salario > 5000);

        this.areaRelatorios.style.display = 'block';
        let titulo = "Funcionários com salário maior que R$ 5000";
        let conteudoFinal = "";

        if (funcionariosFiltrados.length === 0) {
            conteudoFinal = "[]"; 
        } else {
            let itensRelatorio = funcionariosFiltrados.map(f => {
                return `  {\n    "id": ${f.id},\n    "nome": "${f.nome}",\n    "idade": ${f.idade},\n    "cargo": "${f.cargo}",\n    "salario": ${f.salario}\n  }`;
            });
            conteudoFinal = `[\n${itensRelatorio.join(',\n')}\n]`;
        }
        
        this.conteudoRelatorio.textContent = `${titulo}:\n\n${conteudoFinal}`;
    }
    
    gerarRelatorioMediaSalarial() {
        if (this.funcionarios.length === 0) {
             this.mostrarResultadoRelatorio("Média Salarial", "Nenhum funcionário cadastrado para calcular a média.");
             return;
        }
        let totalSalarios = this.funcionarios.reduce((acumulador, f) => acumulador + f.salario, 0);
        let media = totalSalarios / this.funcionarios.length;
        this.mostrarResultadoRelatorio("Média Salarial", `R$ ${media.toFixed(2)}`);
    }

    gerarRelatorioCargosUnicos() {
        let cargos = this.funcionarios.map(f => f.cargo);
        let cargosUnicos = [...new Set(cargos)];
        this.mostrarResultadoRelatorio("Cargos Únicos na Empresa", cargosUnicos);
    }

    gerarRelatorioNomesMaiusculo() {
        let nomesMaiusculo = this.funcionarios.map(f => f.nome.toUpperCase());
        this.mostrarResultadoRelatorio("Nomes dos Funcionários em Maiúsculo", nomesMaiusculo);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let app = new GerenciadorDeFuncionarios();
    app.renderizarTabela();
});

