<template>
    <div class="wrapper">
        <div class="block_1">
            <widgetInput @changePage="changePage" @search="handleSearch"/>
        </div>

        <div class="block-container">
            <div class="block_4">
                <widgetBtn @changePage="changePage"/>
            </div>

            <div class="block_2">
                <component 
                    :is="currentComponent" 
                    :historys="filteredHistory" 
                    @changePage="changePage"
                    @history-deleted="handleHistoryDeleted"
                />  
            </div>

            <div class="block_3">
                <widgetDoctor />
            </div>
        </div>
    </div>
</template>

<script>
    import firstHistory from './components/first_history.vue';
    import widgetBtn from './components/widget_btn.vue';
    import widgetDoctor from './components/widget_doctor.vue';
    import widgetInput from './components/widget_input.vue';
    import listDoctors from './components/list/list_doctors.vue';
    import listDiagnosis from './components/list/list_diagnosis.vue';
    import listPatients from './components/list/list_patients.vue';
    import listSpecializations from './components/list/list_specializations.vue';
    import listHospitals from './components/list/list_hospitals.vue';
    import listSearch from './components/list/list_search.vue';

    import addingDiagnosis from './components/adding/adding_diagnosis.vue';
    import addingDoctor from './components/adding/adding_doctor.vue';
    import addingHospital from './components/adding/adding_hospital.vue';
    import addingMedicalHistory from './components/adding/adding_medical_history.vue';
    import addingPatient from './components/adding/adding_patient.vue';
    import addingSpecialization from './components/adding/adding_specialization.vue';

    import axios from 'axios';

    export default {

        name: 'app',

        data() {
            return {
                currentComponent: 'firstHistory',
                historys: [], 
                searchQuery: '',
            }
        },

        components: {
            firstHistory,
            widgetBtn,
            widgetDoctor,
            widgetInput,
            addingDiagnosis,
            listDoctors,
            listDiagnosis,
            listPatients,
            listSpecializations,
            listHospitals,
            listSearch,
            addingDoctor,
            addingHospital,
            addingMedicalHistory,
            addingPatient,
            addingSpecialization,
        },
        computed: {
            filteredHistory() {
                if (this.currentComponent === 'listSearch') {
                    return this.historys.filter(history => 
                        history.patient_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        history.doctor_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        history.diseases_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        history.record_status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        history.id.toString().includes(this.searchQuery)
                    );
                }
                return this.historys;
            }
        },

        methods: {
            changePage(component) {
                this.currentComponent = component;
            },

            handleSearch(query) {
                this.searchQuery = query;
                this.changePage('listSearch');
            },

            async fetchHistory() {
                try {
                    const response = await axios.get('http://localhost:3000/api/history');
                    this.historys = response.data;
                } catch (error) {
                    console.error("Ошибка при получении истории болезни:", error);
                    alert("Не удалось загрузить историю болезни. Пожалуйста, попробуйте позже.");
                }
            },

            handleHistoryDeleted(id) {
                // Удаляем историю из списка
                this.historys = this.historys.filter(history => history.id !== id);
            }
        },

        mounted() {
            this.fetchHistory();
        },
    };
</script>

<style scoped>

</style>