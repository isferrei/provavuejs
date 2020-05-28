<template>
<div class="content">
  <div class="wrapper">
    <h3 class="logo">LOJA.COM</h3>
    <p class="location">Av. Pinheiro Laranja, nº 50</p>
    <div class="row up-bar">
        <input type="text" class="search-bar">
        <img src="../assets/filter.png" class="filter">
    </div>
    <table>
        <thead class="categories">
            <th><img src="../assets/bottle.svg"><p>Bebidas</p></th>
            <th><img src="../assets/pineapple.svg"><p>Frutas</p></th>
            <th><img src="../assets/cleaning.svg"><p>Limpeza</p></th>
            <th><img src="../assets/fridge.svg"><p>Congelados</p></th>
        </thead>
        <tr>
            <td>
                <img class="miniatura" src="../assets/cerveja.png">
                <div class="text-box">
                    <p class="title">Cerveja</p>
                    <p class="price">R$ 10,00</p>
                    <p class="promotional">R$ 12,50</p>
                </div>
                <div class="icons-box">
                    <div class="btn-favorite"></div>
                    <div class="btn-add"><div class="qtd"><p>2</p></div></div>
                </div>
            </td>
            <td>
                <img class="miniatura" src="../assets/ninho.png">
                <div class="text-box">
                    <p class="title">Leite ninho</p>
                    <p class="price">R$ 10,00</p>
                    <p class="promotional">R$ 12,50</p>
                </div>
                <div class="icons-box">
                    <div class="btn-favorite"></div>
                    <div class="btn-add"></div>
                </div>
            </td>
            <td>
                <img class="miniatura" src="../assets/coca.png">
                <div class="text-box">
                    <p class="title">Coca-cola</p>
                    <p class="price">R$ 10,00</p>
                    <p class="promotional">R$ 12,50</p>
                </div>
                <div class="icons-box">
                    <div class="btn-favorite"></div>
                    <div class="btn-add"></div>
                </div>
            </td>
            <td>
                <img class="miniatura" src="../assets/cafe.png">
                <div class="text-box">
                    <p class="title">Café Pilão</p>
                    <p class="price">R$ 10,00</p>
                    <p class="promotional">R$ 12,50</p>
                </div>
                <div class="icons-box">
                    <div class="btn-favorite"></div>
                    <div class="btn-add"></div>
                </div>
            </td>
        </tr>
    </table> 
    </div>
    <Cart />
</div>
</template>

<script>
import Cart from './Cart.vue';
import axios from 'axios';
export default {
    components: {
        Cart
    },
    data () {
    return {
            info: '' 
        }
    },

    mounted () {
        const usuario =  { UsuarioStr: "prova", SenhaStr: "passprova" };
        const sendData = {
        IdEntrega: 0,
        IdTipoProduto: 0,
        IdVitrine: null,
        ListaIdCategoria: [],
        ListaIdEncarte: [],
        NomeProdutoPesquisaStr: '',
        NomeProdutoStr: '',
        OrdemSecao: 0
        };

      axios
        .post('https://boardapihomolog.smartretail.app/api/usuarioapimobile/login', usuario)
        .then(response => {this.info = localStorage.getItem(JSON.stringify(response.data.data.TokenStr))})
        .catch(error => console.log(error))

        // const instance = axios.create({
        // baseURL: 'https://boardapihomolog.smartretail.app/api/PromocoesGeraisMobile?idLoja=10719&pagina=0&quantidadePorPagina=150',
        // timeout: 1000,
        // headers: {'Authorization': 'Bearer '+token}
        // });

        // instance.get('/path')
        // .then(response => {
        //     return response.data;
        // })
      axios
        .post('https://boardapihomolog.smartretail.app/api/PromocoesGeraisMobile?idLoja=10719&pagina=0&quantidadePorPagina=150', 
             {headers:{'Authorization': 'Bearer'+ this.info}}, sendData)
        .then(response => (console.log(response)))
        .catch(error => console.log(error))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 5px;
    }

    .content{
        display: flex;
        flex-direction: column;
    }
    body{
        background-color: #FAFAFA;
    }
    .wrapper{
        flex: 1;
        max-height: auto;
        max-width: 100%;
        padding-bottom: 50px;
    }

    .logo{
        margin-top: 20px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 990;
    }

    .location{
        line-height: 8px;
        color: #FE7445;
    }

    .cart{
        float: right;
        padding: 10px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 5%;
    }

    .cart:hover{
        background-color: #DDDDDD;
    }
    .up-bar{
        justify-content: center;
        padding: 5px;
    }

    .search-bar{
        width: 80%;
        border-radius: 6px;
        border: 1px solid #EFEFEF;
        background-color:transparent;
        background: url("../assets/loupe.png");
        background-repeat: no-repeat;
        padding-left: 40px;
        background-position-x: 10px;
        background-position-y: center;
    }

    .search-bar:hover{
        background-color: #fff;
    }
    input:focus{
        border-radius: 3px;
        box-shadow: 1px 1px 4px -1px #8888 ;
        outline-color: #FE7445;
        background-color: #fff;
    }

    .filter{
        width: 30px;
        height: 30px;
        margin-left: 2%;
    }

    table{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    td{
        padding: 10px 20px 10px 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 6px;
        box-shadow: 1px 1px 4px -1px #8888 ;
        background-color: #ffff;
        align-content: center;
    }

    th {
        color: #000;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    th img{
        width: 80px;
        height: 80px;
        padding: 15px;
        border-radius: 100px;
    }

    th img:hover{
        background-color: #ffff;
        box-shadow: 0px 0px 5px 1px #FE7445 ;
    }

    thead.categories{
        width: 100%;
        display: flex;
        padding: 0px 10px 0px 10px;
        background-color: #FF906A;
        overflow-x: scroll;
        border-radius: 30px 0px 0px 30px;
    }

    .btn-favorite{
        background: url("../assets/heart.png");
        width: 24px;
        height: 24px;
    }

    .btn-favorite:hover{
        background: url("../assets/hearthover.png");
    }
    .btn-favorite:active{
        background: url("../assets/hearthover.png");
    }
    .btn-add{
        background: url("../assets/plus.png");
        width: 24px;
        height: 24px;
        align-content: center;
        display: flex;
        flex-wrap: wrap;
    }

    .btn-add:hover{
        background: url("../assets/plushover.png");
        width: 24px;
        height: 24px;
    }

    .qtd{
        width: 24px;
        height: 24px;
        background-color: #ffffff;
        border-radius: 5px 0px 0px 5px;
        box-shadow: -2px 0px 4px -1px #8888;
        margin-left: -98%;
        font-weight: 500;
        text-align: center;
        align-content: center;
        justify-content: center;
    }

    .miniatura{
        width: 80px;
        height: 80px;
    }

    .text-box{
        line-height: 8px;
        background-color: transparent;
        align-self: center;
    }

    .price{
        font-size:18px;
        font-weight: 600;
        color: #000;
    }
    .promotional{
        color: #F77070;
        text-decoration: line-through;  
        font-size:14px;
        font-weight: 500;
    }

    .icons-box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bottom{
        background-color: #FFF;
        width: 100%;
        margin: 0px;
        padding: 0px;
    }
</style>
