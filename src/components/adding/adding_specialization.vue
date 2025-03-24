<template>
  <div class="window">
    <h1>
      Введите информацию об специализации
    </h1>

    <input type="text" v-model="newSpecializations" placeholder="Наименование специализации">


    <div className="btn_window">
      <button @click="saveSpecializations">
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
      newSpecializations: '',
    };
  },
  methods: {
    async saveSpecializations() {
      if (this.newSpecializations) {
        try {
          // Отправляем запрос на сервер для сохранения диагноза
          await axios.post('http://localhost:3000/api/specializations', { specialization_name: this.newSpecializations });
          this.$emit('specializationsAdded'); // Информируем родительский компонент о добавлении
        } catch (error) {
          console.error("Ошибка при добавлении специализации:", error);
        } finally {
          // В любом случае очищаем поле ввода и переключаем страницу
          this.newSpecializations = ''; // Очищаем поле ввода элемента
          this.$emit('changePage', 'listSpecializations');
        }
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
