let secaoAtiva = null; // Variável para controlar a seção ativa

// Função para exibir todas as seções
function mostrarTodasSecoes() {
    document.querySelectorAll('.conteudo-paginamenu .section').forEach(section => {
        section.style.display = 'block';
    });

    // Remover a classe 'active' de todos os itens de menu
    document.querySelectorAll('.menu .menu-item-i').forEach(item => {
        item.classList.remove('active');
    });
    secaoAtiva = null; // Resetar a seção ativa
}

// Função para exibir apenas uma seção específica
function mostrarSecao(titulo, item) {
    if (secaoAtiva === titulo) {
        // Se a seção clicada já está ativa, exibe todas as seções
        mostrarTodasSecoes();
    } else {
        // Exibe apenas a seção correspondente
        document.querySelectorAll('.conteudo-paginamenu .section').forEach(section => {
            if (section.getAttribute('data-title') === titulo) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Atualiza a seção ativa e os itens do menu
        document.querySelectorAll('.menu .menu-item-i').forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');
        secaoAtiva = titulo; // Define a seção ativa
    }
}

// Inicializa o menu
function criarMenu() {
    const menu = document.querySelector('.menu');
    const secoes = document.querySelectorAll('.conteudo-paginamenu .section');

    // Cria o título do menu
    const tituloMenu = document.createElement('h3');
    tituloMenu.textContent = 'Menu';
    menu.appendChild(tituloMenu);

    // Cria o <ul> que vai conter os <li>
    const lista = document.createElement('ul');
    lista.classList.add('MenuSobreNos');
    menu.appendChild(lista);

    // Criar itens de menu (<li>) para cada seção
    secoes.forEach(section => {
        const titulo = section.getAttribute('data-title');
        const itemMenu = document.createElement('li');
        
        const link = document.createElement('a');
        link.href = `#${titulo.toLowerCase()}`;  // Define o link para a seção (usando o nome em minúsculas)
        link.classList.add('menu-item-i');
        link.textContent = titulo;

        // Definir o comportamento de clique no item de menu
        link.onclick = (e) => {
            e.preventDefault();  // Evitar o comportamento padrão do link
            mostrarSecao(titulo, link);
        };

        // Inserir o link dentro do <li>
        itemMenu.appendChild(link);

        // Adicionar o <li> à <ul>
        lista.appendChild(itemMenu);
    });
}

// Chama a função para criar o menu e exibe todas as seções ao carregar a página
criarMenu();
mostrarTodasSecoes();
