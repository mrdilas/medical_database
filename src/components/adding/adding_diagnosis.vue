<template>
  <div class="window">
    <h1>
      Введите информацию о диагнозе
    </h1>

    <input type="text" v-model="newDiagnosis" placeholder="Наименование диагноза">

    <div className="btn_window">
      <button @click="saveDiagnosis">
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
      newDiagnosis: '', // Отображаемое имя диагноза
    }
  },
  methods: {
    async saveDiagnosis() {
      if (this.newDiagnosis) {
        try {
          // Отправляем запрос на сервер для сохранения диагноза
          await axios.post('http://localhost:3000/api/diseases', { diseases_name: this.newDiagnosis });
          this.$emit('diagnosisAdded'); // Информируем родительский компонент о добавлении
        } catch (error) {
          console.error("Ошибка при добавлении диагноза:", error);
        } finally {
          // В любом случае очищаем поле ввода и переключаем страницу
          this.newDiagnosis = ''; // Очищаем поле ввода элемента
          this.$emit('changePage', 'listDiagnosis');
        }
      }
    },

    openFirstHistory() {
      this.newDiagnosis = ''; // Очищаем поле ввода элемента
      this.$emit('changePage', 'firstHistory'); // Отправляем событие для перехода на компонент генерации
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
