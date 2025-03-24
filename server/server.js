// server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// Создаем приложение Express
const app = express();

// Middleware для парсинга JSON
app.use(express.json());
app.use(cors());

// Создаем подключение к базе данных
const db = mysql.createConnection({
  host: 'localhost', // адрес базы данных
  user: 'root', // имя пользователя
  password: '1234', // пароль
  database: 'medical_db', // имя вашей базы данных
});

// Подключаемся к базе данных
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }
  console.log('Подключение к базе данных успешно!');
});

//.................Диагнозы....................................

// Получение всех диагнозов
app.get('/api/diseases', (req, res) => {
  db.query('SELECT * FROM diseases', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении диагнозов.' });
    }
    console.log('Полученные диагнозы:', results); // Лог для проверки полученных данных
    res.json(results); // Возвращаем все диагнозы в формате JSON
  });
});

// Добавление нового диагноза
app.post('/api/diseases', (req, res) => {
  const { diseases_name } = req.body; // Получаем имя диагноза из тела запроса

  console.log(`Добавление диагноза: ${diseases_name}`); // Выводим название диагноза в консоль

  if (!diseases_name) {
    return res.status(400).json({ error: 'Имя диагноза не может быть пустым.' });
  }

  const query = 'INSERT INTO diseases (diseases_name) VALUES (?)';
  db.query(query, [diseases_name], (err, results) => {
    if (err) {
      console.error('Ошибка при добавлении диагноза:', err); // Выводим ошибку в консоль
      return res.status(500).json({ error: 'Ошибка при добавлении диагноза.' });
    }
    res.status(201).json({ message: 'Диагноз добавлен успешно!', id: results.insertId });
  });
});

// Удаление диагноза
app.delete('/api/diseases/:id', (req, res) => {
  const diagnosisId = req.params.id; // Получаем ID диагноза из параметров пути
  
  const query = 'DELETE FROM diseases WHERE id = ?';
  db.query(query, [diagnosisId], (err, results) => {
    if (err) {
      console.error('Ошибка при удалении диагноза:', err);
      return res.status(500).json({ error: 'Ошибка при удалении диагноза.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Диагноз не найден.' }); // Если нет затронутых строк
    }

    res.status(200).json({ message: 'Диагноз удален успешно!' }); // Успешное удаление
  });
});

//.................Пациенты....................................

// Получение всех пациентов
app.get('/api/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении данных.' });
    }
    res.json(results);
  });
});

// Добавление нового пациента
app.post('/api/patients', (req, res) => {
  const { patient_name, patient_surname, date_of_birth, gender, address_mail, patient_number } = req.body;

  const query = 'INSERT INTO patients (patient_name, patient_surname, date_of_birth, gender, address_mail, patient_number) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [patient_name, patient_surname, date_of_birth, gender, address_mail, patient_number], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении пациента.' });
    }
    res.status(201).json({ message: 'Пациент добавлен успешно!', id: results.insertId });
  });
});

// Удаление пациента
app.delete('/api/patients/:id', (req, res) => {
  const patientId = req.params.id;

  const query = 'DELETE FROM patients WHERE id = ?';
  db.query(query, [patientId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при удалении пациента.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Пациент не найден.' });
    }
    res.json({ message: 'Пациент успешно удален.' });
  });
});

//.................Специализация....................................

// Получение всех специализаций
app.get('/api/specializations', (req, res) => {
  db.query('SELECT * FROM specialization', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении specialization.' });
    }
    console.log('Полученные specialization:', results); // Лог для проверки полученных данных
    res.json(results); // Возвращаем все диагнозы в формате JSON
  });
});

// Добавление новой специализации
app.post('/api/specializations', (req, res) => {
  const { specialization_name } = req.body; // Получаем имя диагноза из тела запроса

  console.log(`Добавление специализации: ${specialization_name}`); // Выводим название диагноза в консоль

  if (!specialization_name) {
    return res.status(400).json({ error: 'Имя специализации не может быть пустым.' });
  }

  const query = 'INSERT INTO specialization (specialization_name) VALUES (?)';
  db.query(query, [specialization_name], (err, results) => {
    if (err) {
      console.error('Ошибка при добавлении специализации:', err); // Выводим ошибку в консоль
      return res.status(500).json({ error: 'Ошибка при добавлении специализации.' });
    }
    res.status(201).json({ message: 'Специализация добавлена успешно!', id: results.insertId });
  });
});

// Удаление специализации
app.delete('/api/specializations/:id', (req, res) => {
  const specializationId = req.params.id; // Получаем ID диагноза из параметров пути
  
  const query = 'DELETE FROM specialization WHERE id = ?';
  db.query(query, [specializationId], (err, results) => {
    if (err) {
      console.error('Ошибка при удалении специализации:', err);
      return res.status(500).json({ error: 'Ошибка при удалении специализации.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Специализация не найден.' }); // Если нет затронутых строк
    }

    res.status(200).json({ message: 'Специализация удалена успешно!' }); // Успешное удаление
  });
});

//.................Больница....................................

// Получение всех больниц
app.get('/api/hospitals', (req, res) => {
  db.query('SELECT * FROM medical_institution', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении данных.' });
    }
    res.json(results);
  });
});

// Добавление новой больницы
app.post('/api/hospitals', (req, res) => {
  const { institution_name, type_hospital, address, contact_information} = req.body;

  const query = 'INSERT INTO medical_institution (institution_name, type_hospital, address, contact_information) VALUES (?, ?, ?, ?)';
  db.query(query, [institution_name, type_hospital, address, contact_information], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении больницы.' });
    }
    res.status(201).json({ message: 'Больница добавлена успешно!', id: results.insertId });
  });
});

// Удаление больницы
app.delete('/api/hospitals/:id', (req, res) => {
  const hospitalId = req.params.id;

  const query = 'DELETE FROM medical_institution WHERE id = ?';
  db.query(query, [hospitalId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при удалении больницы.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Больница не найдена.' });
    }
    res.json({ message: 'Больница успешно удалена.' });
  });
});

//.................Врачи....................................

// Получение всех врачей
app.get('/api/doctors', (req, res) => {
  const query = `
    SELECT 
      d.id,
      d.doctor_name,
      d.doctor_surname,
      d.license_number,
      d.contact_information,
      s.specialization_name,
      mi.institution_name
    FROM 
      doctors d
    LEFT JOIN 
      specialization s ON d.specialization = s.id
    LEFT JOIN 
      medical_institution mi ON d.hospital = mi.id`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Ошибка при выполнении SQL-запроса:", err); // Логирование ошибки
      return res.status(500).json({ error: 'Ошибка при получении данных.' });
    }
    res.json(results);
  });
});

// Добавление нового врача
app.post('/api/doctors', (req, res) => {
  const { doctor_name, doctor_surname, specialization, license_number, contact_information, hospital } = req.body;

  const query = 'INSERT INTO doctors (doctor_name, doctor_surname, specialization, license_number, contact_information, hospital) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [doctor_name, doctor_surname, specialization, license_number, contact_information, hospital], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении врача.' });
    }
    res.status(201).json({ message: 'Врач добавлен успешно!', id: results.insertId });
  });
});

// Удаление врача
app.delete('/api/doctors/:id', (req, res) => {
  const doctorId = req.params.id;

  const query = 'DELETE FROM doctors WHERE id = ?';
  db.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при удалении врача.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Врач не найден.' });
    }
    res.json({ message: 'Врач успешно удален.' });
  });
});

//.................История болезни....................................

// Получение всех историй болезни
app.get('/api/history', (req, res) => {
  const query = `
    SELECT 
      d.id,
      p.patient_surname,
      n.doctor_surname,
      d.date_record,
      s.diseases_name,
      d.record_status
    FROM 
      diseases_history d
    LEFT JOIN 
      patients p ON d.patient_surname = p.id
    LEFT JOIN 
      doctors n ON d.doctor_surname = n.id
    LEFT JOIN 
      diseases s ON d.diseases_name = s.id`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Ошибка при выполнении SQL-запроса:", err); // Логирование ошибки
      return res.status(500).json({ error: 'Ошибка при получении данных.' });
    }
    res.json(results);
  });
});

// Добавление новой истории болезни
app.post('/api/history', (req, res) => {
  const { patient_surname , doctor_surname , date_record , diseases_name , record_status} = req.body;

  const query = 'INSERT INTO diseases_history  (patient_surname , doctor_surname , date_record , diseases_name , record_status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [patient_surname , doctor_surname , date_record , diseases_name , record_status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении истории болезни.' });
    }
    res.status(201).json({ message: 'История болезни добавлена успешно!', id: results.insertId });
  });
});

// Удаление истории болезни
app.delete('/api/history/:id', (req, res) => {
  const historyId = req.params.id;

  const query = 'DELETE FROM diseases_history  WHERE id = ?';
  db.query(query, [historyId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при удалении истории болезни.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'История болезни не найдена.' });
    }
    res.json({ message: 'История болезни успешно удалена.' });
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
