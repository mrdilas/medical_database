<template>
  <div class="window">
    <h1>
      Введите информацию о больнице
    </h1>

    <input type="text" v-model="hospitalData.name" placeholder="Наименование больницы">

    <input type="text" v-model="hospitalData.type" placeholder="Тип больницы">

    <input type="text" v-model="hospitalData.address" placeholder="Адрес">

    <input type="text" v-model="hospitalData.contact" placeholder="Контактная информация">

    <div className="btn_window">
      <button @click="saveHospital">
        Сохранить
      </button>

      <button @click="openFirstHistory">
        Отменить
      </button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default{
  data() {
    return{
      hospitalData: {
        name: '',
        type: '',
        address: '',
        contact: ''
      }
    };
  },
  methods: {
    async saveHospital() {
      if (this.hospitalData) { 
        try {
          // Отправляем запрос на сервер для сохранения пациента
          await axios.post('http://localhost:3000/api/hospitals', {
            institution_name: this.hospitalData.name,
            type_hospital: this.hospitalData.type,
            address: this.hospitalData.address,
            contact_information: this.hospitalData.contact,
          });
          this.$emit('hospitalAdded'); // Информируем родительский компонент о добавлении
        } catch (error) {
          console.error("Ошибка при добавлении больницы:", error);
        } finally {
          // В любом случае очищаем данные и переключаем страницу
            this.hospitalData = {
              name: '',
              type: '',
              address: '',
              contact: '',
            };
            this.$emit('changePage', 'listHospitals'); // Меняем страницу
          }
      } else {
        // Можно добавить уведомление об ошибке, если имя или фамилия пустые
        alert("Название обязательно к заполнению");
      }
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
  border-radius: var(--border-radius);
  background-color: white;
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

input {
  width: 60%;
  padding: 10px;
  font-size: 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
