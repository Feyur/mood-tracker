const calendar = document.getElementById('calendar');
const moodButtons = document.querySelectorAll('.mood-picker span');
let selectedMood = null;

// Загружаем сохранённые данные
let moods = JSON.parse(localStorage.getItem('moods')) || {};

// Генерация календаря на текущий месяц
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let day = 1; day <= daysInMonth; day++) {
  const div = document.createElement('div');
  div.classList.add('day');
  div.textContent = moods[day] || day;
  div.dataset.day = day;
  calendar.appendChild(div);
}

// Выбор эмоции
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMood = btn.dataset.mood;
  });
});

// Установка настроения в календарь
calendar.addEventListener('click', e => {
  if (e.target.classList.contains('day') && selectedMood) {
    const day = e.target.dataset.day;
    e.target.textContent = selectedMood;
    moods[day] = selectedMood;
    localStorage.setItem('moods', JSON.stringify(moods));
  }
});