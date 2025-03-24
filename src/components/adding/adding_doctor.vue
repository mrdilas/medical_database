<template>
  <div class="window">
    <h1>
      Введите информацию о новом враче
    </h1>

    <input type="text" v-model="doctorData.name" placeholder="Имя">

    <input type="text" v-model="doctorData.surname" placeholder="Фамилия">

    <select v-model="doctorData.specialization">
      <option value="" disabled>Выберите специализацию</option>
      <option v-for="spec in specializations" :key="spec.id" :value="spec.id">
        {{ spec.specialization_name }}
      </option>
    </select>
  
    <input type="text" v-model="doctorData.licenseNumber" placeholder="Номер лицензии">

    <input type="text" v-model="doctorData.contactInformation" placeholder="Контактная информация">
    
    <select v-model="doctorData.hospital">
      <option value="" disabled>Выберите больницу</option>
      <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">
        {{ hospital.institution_name }}
      </option>
    </select>

    <div className="btn_window">
      <button @click="saveDoctor">
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
      doctorData: {
        name: '',
        surname: '',
        specialization: '',
        licenseNumber: '',
        contactInformation : '',
        hospital: ''
      },
      specializations: [],
      hospitals: []
    };
  },

  async mounted() {
    await this.loadSpecializations();
    await this.loadHospitals();
  },

  methods: {

    async loadSpecializations() {
      try {
        const response = await axios.get('http://localhost:3000/api/specializations');
        this.specializations = response.data; 
      } catch (error) {
        console.error("Ошибка при загрузке специализаций:", error);
      }
    },

    async loadHospitals() {
      try {
        const response = await axios.get('http://localhost:3000/api/hospitals');
        this.hospitals = response.data; 
      } catch (error) {
        console.error("Ошибка при загрузке больниц:", error);
      }
    },

    async saveDoctor() {
      if (this.doctorData.name && this.doctorData.surname) {
        try {
          await axios.post('http://localhost:3000/api/doctors', {
            doctor_name: this.doctorData.name,
            doctor_surname: this.doctorData.surname,
            specialization: this.doctorData.specialization,
            license_number: this.doctorData.licenseNumber,
            contact_information: this.doctorData.contactInformation,
            hospital: this.doctorData.hospital
          });
          this.$emit('doctorAdded'); 
        } catch (error) {
          console.error("Ошибка при добавлении врача:", error);
        } finally {
            this.doctorData = {
              name: '',
              surname: '',
              specialization: '',
              licenseNumber: '',
              contactInformation: '',
              hospital: ''
            };
            this.$emit('changePage', 'listDoctors');
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
