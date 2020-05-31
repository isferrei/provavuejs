<template>
    
<div class="modal fade" id="modalfiltro" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close-btn" data-dismiss="modal" aria-label="Fechar">
        <img src="../assets/back.png">
        </button>
        <h5 class="tituloModal">Filtros</h5>
        
      </div>
      <div class="modal-body">
       <div v-for="produto in produtos" :key="produto.IdProduto">
        <button class="btns" v-if="produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr">{{produto.Estoques[0].Produto.TipoProduto.NomeTipoProdutoStr}}</button>
      </div>
      </div>
      <div class="modal-footer">
        <button class="btn-filtrar"><img src="../assets/slider.png" width="20px" height="20px">FILTRAR</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
    data () {
    return {
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
          IdProduto: 0,
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
            this.categories =(response.data.data.categoriasEmPromocao)
          })
          .catch((err) => {
              console.error(err)
          })
          console.log(this.categories)
        console.log('INFO', responseData)
        }
    },
}
</script>
<style scoped>
    .close-btn  {
        height: 24px;
        width:24px;
        float: left;
        cursor: pointer;
    }

    .modal-body{
      display: flex;
    flex-wrap: wrap;
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
      font-weight: 400;
      padding: 0px 15px 0px 15px;
      cursor: pointer;
    }

    .btns:hover{
      background-color: #FE7445;
      color: #FFF;
    }

    .modal-footer{
      
    align-self: center;
    }

    .btn-filtrar{
    background-color: #FE7445;
    border-radius: 50px;
    text-align: center;
    width: 150px;
    color: #FFF;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    }
</style>