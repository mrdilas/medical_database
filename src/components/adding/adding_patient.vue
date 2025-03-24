<template>
  <div class="window">
    <h1>
      Введите информацию о пациенте
    </h1>

    <input type="text" v-model="patientData.name" placeholder="Имя">

    <input type="text" v-model="patientData.surname" placeholder="Фамилия">

    <input type="date" v-model="patientData.dateOfBirth" placeholder="Дата рождения">

    <input type="text" v-model="patientData.gender" placeholder="Пол">

    <input type="email" v-model="patientData.addressMail" placeholder="Почта">

    <input type="text" v-model="patientData.number" placeholder="Номер пациента">

    <div className="btn_window">
      <button @click="savePatients">
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
      patientData: {
        name: '',
        surname: '',
        dateOfBirth: '',
        gender: '',
        addressMail: '',
        number: ''
      }
    };
  },
  methods: {
    async savePatients() {
      if (this.patientData) { // Предполагаем, что patientData - это объект с информацией о пациенте
        try {
          // Отправляем запрос на сервер для сохранения пациента
          await axios.post('http://localhost:3000/api/patients', {
            patient_name: this.patientData.name,
            patient_surname: this.patientData.surname,
            date_of_birth: this.patientData.dateOfBirth,
            gender: this.patientData.gender,
            address_mail: this.patientData.addressMail,
            patient_number: this.patientData.number
          });
          this.$emit('patientAdded'); // Информируем родительский компонент о добавлении
        } catch (error) {
          console.error("Ошибка при добавлении пациента:", error);
        } finally {
          // В любом случае очищаем данные и переключаем страницу
            this.patientData = { // Очищаем данные пациента
              name: '',
              surname: '',
              dateOfBirth: '',
              gender: '',
              addressMail: '',
              number: ''
            };
            this.$emit('changePage', 'listPatients'); // Меняем страницу
          }
      } else {
        // Можно добавить уведомление об ошибке, если имя или фамилия пустые
        alert("Имя и фамилия обязательны");
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
