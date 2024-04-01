 // Функція для збереження даних опитування в LocalStorage
 function saveSurveyData() {
    // Отримуємо форму
    var form = document.getElementById("surveyForm");
    
    // Отримуємо дані з форми
    var formData = new FormData(form);
    
    // Конвертуємо дані у об'єкт JSON
    var jsonData = {};
    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });
    
    // Зберігаємо об'єкт JSON у LocalStorage
    localStorage.setItem("surveyData", JSON.stringify(jsonData));
}

// Додаємо обробник події "submit" до форми
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    // Забороняємо формі надсилати дані стандартним шляхом
    event.preventDefault();
    
    // Викликаємо функцію для збереження даних опитування
    saveSurveyData();
    
    // Очищаємо дані введені користувачем з форми
    this.reset();
    
    // Додайте будь-яке додаткове повідомлення або логіку, якщо потрібно
});