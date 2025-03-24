<template>
  <div class="window">
    <h1>
      Введите информацию истории болезни
    </h1>

    <select v-model="historyData.surnamePatient">
      <option value="" disabled>Выберите пациента</option>
      <option v-for="patient in patients" :key="patient.id" :value="patient.id">
        {{ patient.patient_surname }}
      </option>
    </select>

    <select v-model="historyData.surnameDoctor">
      <option value="" disabled>Выберите врача</option>
      <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
        {{ doctor.doctor_surname }}
      </option>
    </select>

    <select v-model="historyData.nameDiseases">
      <option value="" disabled>Выберите диагноз</option>
      <option v-for="dis in diseases" :key="dis.id" :value="dis.id">
        {{ dis.diseases_name }}
      </option>
    </select>

    <input type="date" v-model="historyData.dateRecord" placeholder="Дата записи">

    <select v-model="historyData.recordStatus">
      <option value="" disabled>Статус лечения</option>
      <option>Лечение</option>
      <option>Завершено</option>
    </select>

    <div className="btn_window">
      <button @click="saveDiseasesHistory">
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
      historyData: {
        surnamePatient: '',
        surnameDoctor: '',
        dateRecord : '',
        nameDiseases: '',
        recordStatus : ''
      },
      patients: [],
      doctors: [],
      diseases: [],
    }
  },
  async mounted() {
    await this.loadPatients();
    await this.loadDoctors();
    await this.loadDiseases();
  },

  methods: {
    async loadPatients() {
      try {
        const response = await axios.get('http://localhost:3000/api/patients');
        this.patients = response.data; 
      } catch (error) {
        console.error("Ошибка при загрузке специализаций:", error);
      }
    },

    async loadDoctors() {
      try {
        const response = await axios.get('http://localhost:3000/api/doctors');
        this.doctors = response.data; 
      } catch (error) {
        console.error("Ошибка при загрузке больниц:", error);
      }
    },

    async loadDiseases() {
      try {
        const response = await axios.get('http://localhost:3000/api/diseases');
        this.diseases = response.data; 
      } catch (error) {
        console.error("Ошибка при загрузке больниц:", error);
      }
    },

    async saveDiseasesHistory() {
      if (this.historyData) {
        try {
          await axios.post('http://localhost:3000/api/history', {
            patient_surname : this.historyData.surnamePatient,
            doctor_surname : this.historyData.surnameDoctor,
            date_record : this.historyData.dateRecord,
            diseases_name : this.historyData.nameDiseases,
            record_status : this.historyData.recordStatus,
          });
          this.$emit('historyAdded'); 
        } catch (error) {
          console.error("Ошибка при добавлении истории болезни:", error);
        } finally {
            this.historyData = {
              surnamePatient: '',
              surnameDoctor: '',
              dateRecord : '',
              nameDiseases: '',
              recordStatus : ''
            };
            this.$emit('changePage', 'firstHistory');
          }
      } else {
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

select {
  width: 62.8%;
  padding: 10px;
  font-size: 20px;
  margin-top: 15px;
  cursor: pointer;
}

</style>
