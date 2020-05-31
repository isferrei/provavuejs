<template>
<div class="content">
  <div class="wrapper">
    <h3 class="logo">LOJA.COM</h3>
    <p class="location">Av. Pinheiro Laranja, nº 50</p>

    <div class="row up-bar">
        <input type="text" v-model="search" class="search-bar" placeholder="Pesquisar">
        <button type="button"  data-toggle="modal" data-target="#modalfiltro"><img src="../assets/filter.png" class="filter"></button>
        
    </div>

    <table v-if="produtos">
        <thead class="categories">
        <div  v-for="produto in produtos" :key="produto.IdTipoProduto">
            <th><button class="btn-cat">{{produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr}}</button></th>
        </div>
        </thead>
    
        <tr v-for="produto in filteredItems" :key="produto.IdProduto">
        <td>
            <div class="container box-cont">
                <div class="col-4">
                    <img class="miniatura" 
                        v-if="produto.ImagemPrincipal"
                        :src="produto.ImagemPrincipal.NomeStr"
                    />
                </div>
                <div class="text-box col-sm-5">
                    <p class="title" v-if="produto.Estoques[0].Produto.NomeStr">{{produto.Estoques[0].Produto.NomeStr}}</p>
                    <p class="price">R${{produto.PrecoDoub}}</p>
                    <p class="promotional">R$ 10,00</p>
                </div>
                <div class="icons-box col-2">
                    <div class="btn-favorite"></div>
                    <div class="btn-count">
                    
                        <div @click="addToCart" v-if="qtdInCart == 0" class="btn-add"><p>+</p></div>
                            
                            <div class="clearfix" v-else>
                                <div class="operation">
                                    <div class="qtd" @click="inc"><p>+</p></div>
                                    <div class="btn-add" v-if="qtdInCart > 0"><p>{{qtdInCart}}</p></div>
                                    <div class="qtd-dec" @click="dec"><p>-</p></div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </td>
        </tr>
    </table> 
    </div>
        <Cart></Cart><div class="itens">{{qtdInCart}} itens</div>
    <Filtro />
</div>
</template>

<script>
import Cart from './Cart.vue';
import Filtro from './Filtro.vue';
import axios from 'axios';
import _ from "lodash";
import State from "../shoppingCartState.js";

export default {
    components: {
        Cart,
        Filtro
    },
    data () {
    return {
            info: '',
            produtos: [],
            produto: '',
            categories:'',
            category: '',
            NomeStr: '',
            search: '',
            shared: State.data
        }
    },

    async mounted () {
      const usuario =  { UsuarioStr: "prova", SenhaStr: "passprova" };
      const url = "https://boardapihomolog.smartretail.app/api/";
        
    const responseLogin = await axios.post(url + 'usuarioapimobile/login', usuario);
    if(responseLogin) {
        const { data } = responseLogin.data;
        const sendData = {
          IdEntrega: 0,
          IdTipoProduto: 0,
          IdVitrine: null,
          ListaIdCategoria: [],
          ListaIdEncarte: [],
          ImagemPrincipal: [],
          NomeProdutoPesquisaStr: '',
          IdPromocao:'',
          NomeStr: '',
          IdImagem: 0,
          OrdemSecao: 0
        };
        const responseData = await axios.post(url + "PromocoesGeraisMobile?idLoja=10719&pagina=0&quantidadePorPagina=150",
         sendData, { 
          headers: {'Authorization': `Bearer ${data.TokenStr}`
          }})
          .then(response => {
            this.produtos =(response.data.data.promocoesGerais)
          })
          .catch((err) => {
              console.error(err)
          })
          console.log(this.produtos)
        console.log('INFO', responseData)
        }
    },

    methods: {
        filtro(){
            
        },
        forceRerender() {
        this.renderprodutos = false;
        
        this.$nextTick(() => {
          this.renderprodutos = true;
        });
      },

       addToCart () {
        State.add(this.produto)
      },
      inc () {
        State.inc(this.produto)
      },
      dec () {
        State.dec(this.produto)
      }

    },

    computed: {
        filteredItems: function(){
            return this.produtos.filter((produto) => {
                return produto.Estoques[0].Produto.NomeStr.toLowerCase() && produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr.toLowerCase().match(this.search);
            });
        },

        qtdInCart(){
            var found = _.find(this.shared.cart, ['id', this.produto.IdProduto])
                if(typeof found == 'object') {
                    return found.qtd
                }else{
                    return 0
                }
            }
        }
}
</script>

<style>
    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0px;
    }

    .content{
        margin: 15px;
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
        height: 40px;
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
        cursor: pointer;
    }

    button{
        border: none;
        background: none;
    }

    button:hover{
        border: none;
        outline: none;
    }

    button:focus{
        outline-color: transparent;
    }
    

    table{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 15px 0px 0px 0px;
    }

    td{
        justify-content: space-around;
        border-radius: 6px;
        box-shadow: 1px 1px 4px -1px #8888 ;
        background-color: #ffff;
        align-content: center;
        display: block;
        margin: 5px 0px 5px 0px;
    }

    .box-cont{
        display: flex;
        flex-direction: row;
        margin: 5px;
        width: 100%;
        padding: 10px 20px 10px 0px;
    }

    .btn-cat{
        color: #000;
        background-color: #FF906A;
        display: flow-root;
        border-radius: 50px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        width: 200px;
        height: 60px;
        cursor: pointer;
    }

    th p{
        align-items: center;
    }

    .btn-cat:hover{
        color: #fff;
        box-shadow: 0px 0px 5px 1px #FE7445 ;
    }

    thead.categories{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        overflow-x: scroll;
        border-radius: 30px 0px 0px 30px;
        margin: 0px 0px 15px 0px;
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

      .close-btn  {
        height: 24px;
        width:24px;
        float: left;
        cursor: pointer;
    }

    .tituloModal{
      margin-left: 30px;
    }

    .modal-header{
      justify-content: start !important;
      align-items: baseline;
    }

    .btns{
      background-color: #DDDD;
      border-radius: 50px;
      height: 40px;
    }

    .btn-filtrar{
    background-color: #FE7445;
    border-radius: 50px;
    text-align: center;
    width: 100px;
    color: #FFF;
    font-size: 2vw;
    font-weight: 500;
    padding: 5px;
    }

    .btn-inc{
        border-radius: 50px;
        width: 24px;
        height: 24px;
        align-content: center;
        background-color: #FE7445;
    }

    .operation{
        display: flex;
        flex-direction:row;
    }

    .btn-add{
        background-color: #FE7445;
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50px;
        align-content: center;
        display: inline-grid;
        align-content: normal;
        justify-content: center;
        
    }

    .title{
        line-height:18px;
    }

    .btn-add:hover{
       background-color: #000000;
       color: #ffffff;
    }

        .qtd{
            width: 20px;
            height: 24px;
            background-color: #ffffff;
            border-radius: 5px 0px 0px 5px;
            box-shadow: -2px 0px 4px -1px #8888;
            font-weight: 500;
            text-align: center;
            align-content: center;
            justify-content: center;
            float: left;
        }

        .qtd-dec{
            width: 20px;
            height: 24px;
            background-color: #ffffff;
            border-radius: 5px 0px 0px 5px;
            box-shadow: 2px 0px 4px -1px #8888;
            font-weight: 500;
            text-align: center;
            align-content: center;
            justify-content: center;
            float: right;
        }

        .itens{
        color: #000;
        margin-right: 2%;
        background-color: #fff;
        padding: 10px;
        font-weight: 500;
        border-radius: 50px;
        align-self: flex-end;
        z-index: 1;
        width: 70px;
        position: fixed;
        top: 589px;
    }

    .clearfix:after {
        content: " ";
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
    }

    .btn-qtd{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 50px;
    }

    .btn-count{
        display: flex;
        justify-content: center;
        text-align-last: center;
    }
</style>
