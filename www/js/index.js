fetch('js/backend.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('produtos', JSON.stringify(data));
        console.log('Dados dos produtos salvos no localStorage');

        // Função para renderizar os produtos no HTML
        function renderizarProdutos(produtos) {
            $("#produtos").empty();
            produtos.forEach(produto => {
                var produtoHTML = `
                    <!--ITEM CARD-->
                    <div class="item-card">
                        <a data-id="${produto.id}" href="/detalhes/" class="item">
                            <div class="img-container">
                                <img src="${produto.imagem}">
                            </div>
                            <div class="nome-rating">
                                <span class="color-gray">${produto.nome}</span>
                                <span class="bold margin-right">
                                    <i class="mdi mdi-star"></i>
                                    ${produto.rating}                                      
                                </span>
                            </div>
                            <div class="price bold">${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</div>
                        </a>
                    </div>
                `;
                $("#produtos").append(produtoHTML);
            });

            // Evento de clique no item
            $(".item").on('click', function(){
                var id = $(this).attr('data-id');
                localStorage.setItem('detalhe', id);
                app.views.main.router.navigate('/detalhes/');
            });
        }

        // Renderiza todos os produtos ao carregar a página
        renderizarProdutos(data);

        // Filtro por categoria
        $(".filter-btn").on('click', function() {
            var categoriaSelecionada = $(this).data('categoria');
            var produtosFiltrados = data.filter(produto => {
                // Se a categoria for "all", mostra todos os produtos
                return categoriaSelecionada === "all" || produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase();
            });

            // Renderiza os produtos filtrados por categoria
            renderizarProdutos(produtosFiltrados);
        });

        // Filtro de busca
        $("#search").on('input', function() {
            var query = $(this).val().toLowerCase();

            // Filtra os produtos com base no id, nome ou categoria
            var produtosFiltrados = data.filter(produto => 
                produto.id.toString().includes(query) ||  // Filtro pelo id
                produto.nome.toLowerCase().includes(query) ||  // Filtro pelo nome
                produto.categoria.toLowerCase().includes(query)  // Filtro pela categoria
            );

            // Renderiza os produtos filtrados
            renderizarProdutos(produtosFiltrados);
        });

    })
    .catch(error => console.error('Erro ao fazer fetch dos dados: ' + error));



    //QUANTOS ITENS TEM NO CARRINHO

    setTimeout(() => {
        var carrinho = JSON.parse(localStorage.getItem('carrinho'))  || [];

        $('.btn-cart').attr('data-count', carrinho.length);

    }, 300);

