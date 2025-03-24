<template>
    <button @click="openListHospitals" class="btn_table">
        Больницы
    </button>
    <button @click="openListDoctor" class="btn_table">
        Врачи
    </button>
    <button @click="openListSpecialization" class="btn_table">
        Специализация
    </button>
    <button @click="openListDiagnosis" class="btn_table">
        Заболевания
    </button>
    <button @click="openListPatients" class="btn_table">
        Пациенты
    </button>
    <button @click="openAddingMedicalHistory" class="btn_table">
        Добавить историю болезни
    </button>
</template>

<script>
    export default {
        name: 'widgetBtn',
        
        data() {
            return{
                vSigment: '',
            }
        },
        methods: {
        openListHospitals() {
            this.$emit('changePage', 'listHospitals'); // Отправляем событие для перехода на компонент генерации
        },
        openListDiagnosis() {
            this.$emit('changePage', 'listDiagnosis'); // Отправляем событие для перехода на компонент моделей (предполагается, что такой компонент у вас есть)
        },
        openListDoctor() {
            this.$emit('changePage', 'listDoctors'); // Отправляем событие для перехода на компонент магазинов (предполагается, что такой компонент у вас есть)
        },
        openAddingMedicalHistory() {
            this.$emit('changePage', 'addingMedicalHistory'); // Отправляем событие для перехода на компонент контактов (предполагается, что такой компонент у вас есть)
        },
        openListPatients() {
            this.$emit('changePage', 'listPatients'); // Отправляем событие для перехода на компонент интерьеров (предполагается, что такой компонент у вас есть)
        },
        openListSpecialization() {
            this.$emit('changePage', 'listSpecializations'); // Отправляем событие для перехода на компонент интерьеров (предполагается, что такой компонент у вас есть)
        }
    }
    }
</script>

<style scoped>
</style>