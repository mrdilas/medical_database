<template>
    <input class="form_input" type="text" v-model="search" placeholder="Введите пациента, врача, заболевание, статус или id истории">
    <button class="form_btn" @click="searchHistory">
        Поиск пациента
    </button>
</template>

<script>

export default {
    
    name: 'widgetInput',

    data() {
        return {
            search: '',
        }
    },

    mounted() {
      
    },

    methods: {

        async searchHistory(){
            this.$emit('search', this.search);
            this.$emit('changePage', 'listSearch');
        },
            
    },
}
</script>

<style scoped>

</style>