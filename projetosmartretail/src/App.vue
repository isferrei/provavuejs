<template>
<div>
<div class="head">
    <Cart></Cart><div class="itens">{{ quantidade }} itens</div>
  </div>
<router-view class="view">
<Carrinho />
</router-view>
  
  <div class="content">
  <div class="wrapper">
    <h3 class="logo">LOJA.COM</h3>
    <p class="location">Av. Pinheiro Laranja, nº 50</p>

    <div class="row up-bar">
        <input type="text" v-model="search" class="search-bar" placeholder="Pesquisar">
        <button type="button"  data-toggle="modal" data-target="#modalfiltro"><img src="./assets/filter.png" class="filter"></button>
        
    </div>

    <table v-if="produtos">
        <thead class="categories">
        <div  v-for="produto in filtoCategorias" :key="produto.IdTipoProduto">
            <th>
            <Filtro></Filtro>
              <button class="btn-cat" @click.prevent="search=produto.toLowerCase()">
                {{produto}}
              </button>
            </th>
        </div>
        </thead>
    
        <tr>
        <div  v-for="produto in filteredItems" :key="produto.IdProduto">
          <div v-if="produto" >
            <Shop :produto="produto" v-on:incrementar="adicionarQuantidade" v-on:decrementar="removerQuantidade"></Shop>
          </div>
        </div>
        </tr>
    </table>
    </div>
    </div>
</div>

</template>

<script>
import Shop from './components/Shop.vue';
import Carrinho from './components/Carrinho.vue';
import Cart from './components/Cart.vue';
import Filtro from './components/Filtro.vue';
import axios from 'axios';
import State from "./shoppingCartState.js";

export default {
  name: 'App',
  components: {
    Shop,
    Carrinho,
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
            shared: State.data,
            values: '',
            quantidade: 0
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
      forceRerender() {
        this.renderprodutos = false;
        
        this.$nextTick(() => {
          this.renderprodutos = true;
        });
      },
      adicionarQuantidade() {
        this.quantidade++
    },
      removerQuantidade() {
        this.quantidade--
    }
    },

    computed: {
        filteredItems: function(){
            return this.produtos.filter((produto) => {
                return  produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr.toLowerCase().match(this.search) || produto.Estoques[0].Produto.NomeStr.toLowerCase().match(this.search);
            });
        },

        groupedItems() {
          return this.produtos.filter(produto => {
            return produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          });
          },

        filtoCategorias: function () {
          return [...new Set(this.produtos.map(i=>i.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr))]
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


        .itens{
        color: #000;
        background-color: #fff;
        margin: 8px 0px 0px 0px;
        font-weight: 500;
        padding: 10px;
        margin-left: -5%;
        font-weight: 500;
        border-radius: 50px;
        text-align: center;
        align-self: flex-end;
        z-index: 1;
        width: 80px;
        display: block;
        position: fixed;
        top: 0px;
    }

    .head{
      display: flex;
      flex-direction: column;
    }

  .content{
    margin: 74px 15px 15px 15px;
  }
</style>
