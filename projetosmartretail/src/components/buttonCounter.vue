<template>
<div>
<button @click="addToCart" class="btn-add"><p>+</p></button>
</div>               
</template>
<script>
import State from "../shoppingCartState.js";
export default {
    data: function () {
    return {
      count: 0
    }
  },

  methods: {
      
       addToCart () {
        State.add(this.produto)
      },
  }
}
</script>

<style>
.btn-count{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
    .btn-add{
        background: url("../assets/plus.png");
        width: 24px;
        height: 24px;
        align-content: center;
        display: flex;
        
    }

    .btn-add:hover{
        background: url("../assets/plushover.png");
        width: 24px;
        height: 24px;
    }

        .qtd{
        width: 24px;
        height: 24px;
        background-color: #ffffff;
        border-radius: 5px 0px 0px 5px;
        box-shadow: -2px 0px 4px -1px #8888;
        margin-left: -90%;
        font-weight: 500;
        text-align: center;
        align-content: center;
        justify-content: center;
    }

</style>>