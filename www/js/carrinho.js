var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length > 0 ){       
        renderizarCarrinho();
        calcularTotal();
    } else {
        carrinhoVazio();
    }
} else{
    carrinhoVazio();
}

function renderizarCarrinho(){
    $("#listaCarrinho").empty();

    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
        <div class="item-carrinho">
            <div class="area-img">
                <img src="${itemCarrinho.item.imagem}">
            </div>
            <div class="area-details" data-index="${index}">
                <div class="sup">
                    <span class="name-prod">${itemCarrinho.item.nome}</span>
                    <a data-index="${index}" class="delete-item" href="#">
                        <i class="mdi mdi-close"></i>
                    </a>
                </div>
                <div class="middle">
                    <span>${itemCarrinho.item.principal_caracteristica}</span>
                </div>
                <div class="preco-quantidade">
                    <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>
                    <div class="count">
                        <a class="minus" data-index="${index}" href="#">-</a>
                        <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                        <a class="plus" data-index="${index}" href="#">+</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#listaCarrinho").append(itemDiv);
    });

    $(".delete-item").on('click', function () {
        var index = $(this).data('index');
        app.dialog.confirm('Tem certeza que quer remover esse item?', 'Remover', function(){
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();
        });
    });

    $(".minus").on('click', function () {
        var index = $(this).data('index');
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();
        } else {
            var itemname = carrinho[index].item.nome;
            app.dialog.confirm(
                `Gostaria de remover <strong>${itemname}</strong>?`, 
                'REMOVER', 
                function () { 
                    carrinho.splice(index, 1);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    renderizarCarrinho();
                    calcularTotal();
                    app.views.main.router.refreshPage();
                }
            );
        }
    });

    $(".plus").on('click', function () {
        var index = $(this).data('index');
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        renderizarCarrinho();
        calcularTotal();
    });
}

function calcularTotal(){
    var totalCarrinho = 0;
    $.each(carrinho, function(index, itemCarrinho) {
        totalCarrinho += itemCarrinho.total_item; 
    });
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}));
}

function carrinhoVazio(){
    $("#listaCarrinho").empty();
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');
    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img width="400" src="img/empty.gif">
            <br><span class="color-gray"> Nada por enquanto...</span>
        </div>    
    `);
}

$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', '<strong>ESVAZIAR</strong> ', function(){
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    });
});

$("#comprarCarrinho").on('click', function() {
    var dialog = app.dialog.create({
        title: 'Digite seus dados',
        content: `
            <input type="text" id="inputName" placeholder="Seu nome" />
            <input type="text" id="inputEndereco" placeholder="Seu endereço de entrega" />
            <input type="text" id="inputCidade" placeholder="Sua cidade" />
        `,
        buttons: [
            {
                text: 'Cancelar',
                onClick: function () {
                    console.log('Cancelado');
                }
            },
            {
                text: 'Confirmar',
                onClick: function () {
                    var nome = document.getElementById('inputName').value;
                    var endereco = document.getElementById('inputEndereco').value;
                    var cidade = document.getElementById('inputCidade').value;

                    if (nome && endereco && cidade) {
                        var totalCarrinho = 0;
                        var listaItens = '';  
                        $.each(carrinho, function(index, itemCarrinho) {
                            totalCarrinho += itemCarrinho.total_item;
                            listaItens += `${itemCarrinho.item.nome} - Quantidade: ${itemCarrinho.quantidade} - Preço: ${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
                        });

                        // Calcular taxa adicional de R$50 por item
                        var taxaAdicional = carrinho.length * 50;
                        totalCarrinho += taxaAdicional;  // Adiciona o valor da taxa ao total

                        var totalFormatado = totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        var numeroTelefone = '5561992633520';
                        var mensagem = `Olá, gostaria de confirmar a minha compra!\nNome: ${nome}\nEndereço: ${endereco}\nCidade: ${cidade}\n\nItens:\n${listaItens}\nTotal: ${totalFormatado}`;

                        var mensagemCodificada = encodeURIComponent(mensagem);
                        var urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
                        window.open(urlWhatsApp, '_blank');
                    } else {
                        app.dialog.alert('Por favor, preencha todos os campos.');
                    }
                }
            }
        ]
    });

    dialog.open();
});
