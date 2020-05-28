<template>
    <div class="row boottom-bar">
        <img src="../assets/cart.svg" class="cart">
        <p>SACOLA</p>
        <div class="itens">3 itens</div>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0px;
        padding: 0px;
    }

    .row{
        height: 60px;
        width: 100%;
        margin: 0px 0px 0px -10px;
        background-color: #FF906A;
        position: fixed;
        top: 89%;
        box-shadow: 1px -1px 5px -1px #8888 ;
        justify-content: center;
        align-items: center;
    }

    .cart{
        padding: 10px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 2%;
    }

    .cart:hover{
        background-color: #ffff;
        border-radius: 50px;
    }

    p{
        font-weight: 500;
        color: #000;
    }

    .itens{
        color: #000;
        margin-left: 10px;
        background-color: #fff;
        padding: 10px;
        font-weight: 500;
        border-radius: 50px;
    }
 
</style>
