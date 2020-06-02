
import _ from 'lodash';
export default{
    data: {
        cart: [ ]
    },

    add (produto){
        var found = _.find(this.data.cart, ['id', produto.Estoques[0].Produto.IdProduto])
        if(typeof found != 'object') {
            this.data.cart.push({
                id: produto.Estoques[0].Produto.IdProduto,
                title: produto.Estoques[0].Produto.NomeStr,
                price: produto.PrecoDoub,
                image: produto.ImagemPrincipal.NomeStr,
                qtd: 1
            })
        }
    },
      inc (produto) {
        var found = _.find(this.data.cart, ['id', produto.Estoques[0].Produto.IdProduto])
        if(typeof found == 'object') {
          var index = _.indexOf(this.data.cart, found)
          this.data.cart[index].qtd++
        }
      },
      dec (produto) {
        var found = _.find(this.data.cart, ['id', produto.Estoques[0].Produto.IdProduto])
        if(typeof found == 'object') {
          var index = _.indexOf(this.data.cart, found)
    
          if(this.data.cart[index].qtd == 1) {
            this.data.cart.splice(index, 1)
          } else {
            this.data.cart[index].qtd--
          }
        }
      }


}