<template>
    <div class="window">
        <div v-if="historys.length === 0">
            <h1>
                История болезни не найдена.
            </h1>
        </div>
        <div div v-for="his in historys" :key="his.id" class="card_patient">
            <div class="header-container">
                <h1>{{ his.patient_surname }}</h1> 
                <p>Диагноз: {{ his.diseases_name }}</p>
            </div>

            <div class="header-container">
                <p>ID: {{ his.id }}</p>
                <p>Статус: {{ his.record_status }}</p> 
                <p>Врач: {{ his.doctor_surname }}</p>
                <p>Дата записи: {{ his.date_record }}</p>
                <button class="icon-button" @click="deleteHistory(his.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'firstHistory',
    name: 'DeleteOutlined',
    data() {
        return{
            historys: [],
        };
    },
    mounted() {
      this.fetchHistory(); // Загружаем диагнозы при монтировании компонента
    },
    methods: {
        async fetchHistory() {
          try {
              const response = await axios.get('http://localhost:3000/api/history');
              this.historys = response.data;
          } catch (error) {
              console.error("Ошибка при получении истории болезни:", error);
              alert("Не удалось загрузить историю болезни. Пожалуйста, попробуйте позже."); 
          }
        },
      
        async deleteHistory(id) {
          // Запрашиваем подтверждение удаления
          const confirmDelete = confirm("Вы уверены, что хотите удалить эту историю болезни?");
          if (!confirmDelete) {
              return; // Если пользователь отменил, выходим из функции
          }

          try {
              await axios.delete(`http://localhost:3000/api/history/${id}`);
              this.historys = this.historys.filter(history => history.id !== id);
          } catch (error) {
              console.error("Ошибка при удалении истории болезни:", error);
              alert("Не удалось удалить историю болезни. Пожалуйста, попробуйте позже."); // Уведомление пользователя
          }
        },
        openAddingHistory(){
            this.$emit('changePage', 'addingMedicalHistory');
        },
    }

}
</script>

<style scoped>
.window {
  width: 100ph;
  height: 100ph;
  padding: 30px;
  border-radius: var(--border-radius);
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