<template>
    <div class="window"> 
        <div v-if="doctors.length === 0">
            <h1>
                Врачи не найдены.
            </h1>
        </div>

        <div v-for="doctor in doctors" :key="doctor.id" class="card_patient">
            <div class="header-container">
                <h1>{{ doctor.doctor_surname }} {{ doctor.doctor_name }}</h1> 
                <p>Специализация: {{ doctor.specialization_name }}</p>
                <p>Лицензия: {{doctor.license_number}}</p>
            </div>

            <div class="header-container">
                <p>ID: {{ doctor.id }}</p>
                <p>Контактная информация: {{ doctor.contact_information }}</p> 
                <p>Место работы: {{ doctor.institution_name }}</p>

                <button class="icon-button" @click="deleteDoctor(doctor.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <button @click="openAddingDoctor">
            Добавить врача
        </button>

        <button @click="openFirstHistory">
            Назад
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default{

    name: 'DeleteOutlined',

    data() {
        return{
            doctors: [],
        };
    },
    mounted() {
      this.fetchDoctors(); // Загружаем диагнозы при монтировании компонента
    },
    methods: {
        async fetchDoctors() {
          try {
              const response = await axios.get('http://localhost:3000/api/doctors');
              this.doctors = response.data;
          } catch (error) {
              console.error("Ошибка при получении врачей:", error);
              alert("Не удалось загрузить врачей. Пожалуйста, попробуйте позже."); 
          }
        },
      
        async deleteDoctor(id) {
          const confirmDelete = confirm("Вы уверены, что хотите удалить этого врача?");
          if (!confirmDelete) {
              return;
          }

          try {
              await axios.delete(`http://localhost:3000/api/doctors/${id}`);
              this.doctors = this.doctors.filter(doctor => doctor.id !== id);
          } catch (error) {
              console.error("Ошибка при удалении врача:", error);
              alert("Не удалось удалить врача. Числится в истории болезни."); 
          }
        },
        openAddingDoctor(){
            this.$emit('changePage', 'addingDoctor');
        },

        openFirstHistory() {
            this.$emit('changePage', 'firstHistory');
        },
    }
}
</script>

<style scoped>
:root {
  --font: "Roboto", serif;

  --accent: #12C0DD;
  --accent-rgb: 18, 192, 221;
  --light: #FFFFFF;

  --border-radius: 10px;
  --width-line: 2px;
  --tr: .3s;
}

.window {
  width: 100ph;
  height: 100ph;
  padding: 30px;
}

.btn_window {
  width: 100ph;
  display: flex;
  padding: 20px 0px;
}

button {
  margin-right: 20px;
  font-size: 20px;
  border-radius: var(--border-radius);
  padding: 10px 15px;
  transition: var(--tr);
  cursor: pointer;
}

button:hover {
  background-color: var(--accent);
}

.icon-button {
  background-color: transparent; /* Убираем фон */
  border: none;                 /* Убираем границу */
  cursor: pointer;              /* Курсор в виде указателя */
}

.card_button {
  display: flex;               /* Включаем Flexbox */
  align-items: center;        /* Выравнивание по центру по вертикали */
  justify-content: space-between; /* Выравнивание по горизонтали с отступами */
}
</style>