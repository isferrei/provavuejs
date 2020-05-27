<template>
  <div class="container">
    <h3>LOJA.COM</h3>
    <table>
        <thead></thead>
        <tr class="categories">
            <th>Bebidas</th>
            <th>Frutas</th>
            <th>Limpeza</th>
            <th>Congelados</th>
        </tr>
        <tr>
            <td>
                <img class="miniatura" src="../assets/cerveja.png">
                <div class="text-box">
                    <p class="title">Cerveja</p>
                    <p class="desc">Lorem Ipsum</p>
                </div>
                <img class="btn-add" src="../assets/star.svg">
            </td>
            <td>
                <img class="miniatura" src="../assets/ninho.png">
                <div class="text-box">
                    <p class="title">Leite ninho</p>
                    <p class="desc">Lorem Ipsum</p>
                </div>
                <button class="btn btn-add">+</button>
            </td>
            <td>
                <img class="miniatura" src="../assets/coca.png">
                <div class="text-box">
                    <p class="title">Coca-cola</p>
                    <p class="desc">Lorem Ipsum</p>
                </div>
               <button class="btn btn-add">+</button> 
            </td>
            <td>
                <img class="miniatura" src="../assets/cafe.png">
                <div class="text-box">
                    <p class="title">Café Pilão</p>
                    <p class="desc">Lorem Ipsum</p>
                </div>
                <button class="btn btn-add">+</button>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
    return {
      info: null
        }
    },
    mounted () {
        const sendData = {
        IdEntrega: 0,
        IdTipoProduto: 0,
        IdVitrine: null,
        ListaIdCategoria: [],
        ListaIdEncarte: [],
        NomeProdutoPesquisaStr: '',
        NomeProdutoStr: '',
        OrdemSecao: 0
      }
      axios
        .post('https://boardapihomolog.smartretail.app/api/PromocoesGeraisMobile?idLoja=10719&pagina=0&quantidadePorPagina=150', sendData)
        .then(response => (this.info = response.info))
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

    body{
        background-color: #FAFAFA;
    }

    table{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    td{
        padding: 30px 20px 20px 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 6px;
        box-shadow: 1px 1px 4px -1px #8888 ;
        background-color: #ffff;
    }

    th{
        background-color: #ffff;
        color:#F98056;
        padding: 20px;
        border-radius: 100px;
    }

    th:hover{
        background-color: #F98056;
        color:#fff;
    }

    tr.categories{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .btn-add{
        color: #8888;
        font-size: 18px;
        font-weight: bold;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }

    .miniatura{
        width: 80px;
        height: 80px;
    }

    .text-box{
        line-height: 8px;
        background-color: transparent;

    }

    .desc{
        font-weight: 400;
        color: #898989;
    }
</style>
