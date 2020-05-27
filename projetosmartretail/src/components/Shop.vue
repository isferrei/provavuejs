<template>
  <div class="container">
    <h3>LOJA.COM</h3>
    <table>
        <thead></thead>
        <tr>
            <th>
                <button class="btn btn-add">+</button>
                <div class="text-box">
                    <p class="title">Titulo</p>
                    <p class="desc">Lorem Ipsum</p>
                </div>
                <img class="miniatura" src="../assets/logo.png">
            </th>
        </tr>
    </table>
  </div>
</template>

<script>


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
    }
}

import axios from 'axios';

axios
.post('https://boardapihomolog.smartretail.app/api/PromocoesGeraisMobile?idLoja=10719&pagina=0&quantidadePorPagina=150', sendData)
.then(response => (this.info = response.info))
.catch(error => console.log(error))
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    table{
        width: 30%;
    }

    th{
        padding-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .btn-add{
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        background-color: orangered;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    .miniatura{
        width: 40px;
        height: 40px;
    }

    .text-box{
        line-height: 8px;

    }

    .desc{
        font-weight: 400;
        color: #898989;
    }
</style>
