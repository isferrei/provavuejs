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
        <tr v-for="produto of produtos" :key="produto.IdProduto">
            <td>
                <img class="miniatura" src="../assets/cerveja.png">
                <div class="text-box">
                    <p class="title">{{produto.NomeStr}}</p>
                    <p class="price">{{produto.PrecoDoub}}</p>
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
import Shop from './components/Shop.vue';
import Cart from './Cart.vue';
export default {
  name: 'App',
  components: {
    Shop,
    Cart
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
