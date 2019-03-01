<template>
    <div>
        <div class="single" :style="btnColor">
            {{msg}}
        </div>
    </div>
</template>

<script>
    export default {
       
        props:['msg',"btnColor"],
      
    }
</script>

<style scoped>
    .single{
        width:200px;
        height:200px;
        float:left;
        text-align: center;
        line-height: 200px;
        color: #fff;
        margin:50px;
        border-radius: 10px;
        cursor: pointer;
    }
</style>