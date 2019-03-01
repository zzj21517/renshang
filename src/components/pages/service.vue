<template>
    <div>
        service
        {{msg}}
        <el-button @click="addState">新增</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            
            }
        },
        computed:{
            msg(){
                return this.$store.getters.caseInfo
            }
        },
        methods:{
            addState(){
                this.$store.commit('SET_CASEINFO','demo')
            }
        }
    }
</script>

<style scoped>
.demo{
    display: flex;
    flex-direction: column;
}
.main{
    flex: 1;
}
.footer{
    width: 100%;
    height: 120px;
}
</style>