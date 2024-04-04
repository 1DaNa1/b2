// Додавання обробника події "submit" до форми
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Забороняємо формі надсилати дані стандартним шляхом
    saveFormData(); // Зберігаємо дані в LocalStorage
});

// Функція для збереження даних у LocalStorage
function saveFormData() {
    let formData = {
        "fullname": document.forms["surveyForm"]["fullname"].value,
        "email": document.forms["surveyForm"]["email"].value,
        "phone": document.forms["surveyForm"]["phone"].value,
        "faculty": document.forms["surveyForm"]["faculty"].value,
        "stream": document.querySelector('input[name="stream"]:checked').value,
        "group": document.forms["surveyForm"]["group"].value,
        "curator": [],
        "grade": parseInt(document.forms["surveyForm"]["grade"].value),
        "meeting_time": document.forms["surveyForm"]["meeting-time"].value,
        "student_id": document.forms["surveyForm"]["student-id"].value
    };

    let checkboxes = document.querySelectorAll('input[name="curator"]:checked');
    checkboxes.forEach(function(checkbox) {
        formData.curator.push(checkbox.value);
    });

    let formEntries = JSON.parse(localStorage.getItem('formEntries'))  ;
    formEntries.push(formData);
    localStorage.setItem('formEntries', JSON.stringify(formEntries));

    // Очищення форми
    document.getElementById("surveyForm").reset();

    // Скидання значення балів на початкове
    document.getElementById("gradeValue").innerText = "50";

    // Виведення повідомлення про успішне збереження
    alert("Відповідь збережено");

    
};