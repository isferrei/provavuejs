<template>
    <div class="carrinho">
    <div class="row upbar-title">
   
        <img class="icon-bag" src="../assets/cart.svg"><h2 class="cart-title">SACOLA</h2>
        <router-link to="/">
            <img class="btn-back" src="../assets/back.png">
        </router-link>
    </div>
        <p class="cart-empty" v-if="total == 0">Sua sacola está vazia!</p>
        <div class="items" v-else>
            <div class="item" v-for="item in items" :key="item.IdProduto">
                <img :src="item.image" class="miniatura">
                <div class="item-details">
                    <p class="item-title">Produto: <span>{{item.title}}</span></p>
                    <p class="item-price">Valor: 
                        <span>{{item.qtd}} x</span>
                        <span class="right"> R${{item.qtd * item.price}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="cart-total">
            <p>Total: <span class="right">R${{total}} </span></p> 
        </div>
    </div>
</template>
<script>
import State from "../shoppingCartState"
import _ from "lodash"
import axios from 'axios';

export default {
    data(){
        return{
            items: State.data.cart,
            item: '',
            info: '',
            produtos: [],
            produto: '',
            categories:'',
            category: '',
            NomeStr: '',
            search: ''
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

    computed: {
        total(){
            return _.sumBy(this.items, function(item){
                return (item.price * item.qtd)
            })
        }
    }
}
</script>
<style scoped>
    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .cart-title{
        font-weight: 600;
        color: #000;
    }

    .icon-bag{
        width: 15%;
        margin-left: 10%;
    }

    .upbar-title{
        background-color: #FF906A;
        padding: 15px;
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-evenly;
    }

    .cart-empty{
        margin: 20px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        
    }
    
    .miniatura{ 
        margin: 15px;
    }

    .item p{
        margin: 15px;
        font-size: 18px;
        font-weight:500;
    }
    
    .item span{
        font-weight: 600;
        color: #000;
    }

    .cart-total{
        background-color: #DDDD;
        display: flex;
        flex-direction: row;
        color: #000;
        height: 60px;
        padding: 15px 15px 0px 15px;
    }   

    .cart-total p{
        font-size: 18px;
        font-weight: 600;
    }

    .cart-total span{
    font-size: 18px;
    font-weight: bold;
    }


</style>