<template>
<div>
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
        <div  v-for="produto in produtos" :key="produto.IdTipoProduto">
            <th><button class="btn-cat">{{produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr}}</button></th>
        </div>
        </thead>
    
        <tr>
        <div  v-for="produto in filteredItems" :key="produto.IdProduto">
          <div v-if="produto" >
            <Shop :produto="produto"></Shop>
          </div>
        </div>
        </tr>
    </table>
    </div>
    
    <Filtro />
    <Cart></Cart>
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
            values: ''
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
      }
    },

    computed: {
        filteredItems: function(){
            return this.produtos.filter((produto) => {
                return produto.Estoques[0].Produto.NomeStr.toLowerCase() && produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr.toLowerCase().match(this.search);
            });
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
</style>
