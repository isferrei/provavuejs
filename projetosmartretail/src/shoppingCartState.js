
import _ from 'lodash';
export default{
    data: {
        cart: [
            {id: 0, title: '', price: 0 , image: '', qtd: 1}
        ]
    },

    add (produto){
        var found = _.find(this.data.cart, ['id', produto.IdProduto])
        if(typeof found != 'object') {
            this.data.cart.push({
                id: produto.IdProduto,
                title: produto.NomeStr,
                price: produto.PrecoDoub,
                image: produto.NomeStr,
                qtd: 1
            })
        }
    },
      inc (produto) {
        var found = _.find(this.data.cart, ['id', produto.IdProduto])
        if(typeof found == 'object') {
          var index = _.indexOf(this.data.cart, found)
          this.data.cart[index].qtd++
        }
      },
      dec (produto) {
        var found = _.find(this.data.cart, ['id', produto.IdProduto])
        if(typeof found == 'object') {
          var index = _.indexOf(this.data.cart, found)
    
          if(this.data.cart[index].qtd == 1) {
            this.data.cart.$remove(found)
          } else {
            this.data.cart[index].qtd--
          }
        }
      }


}