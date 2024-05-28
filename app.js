let selectedCircle = null;

function changeColor(circleId, value) {
    const circle = document.getElementById(circleId);
    if (selectedCircle) {
        selectedCircle.classList.remove('selected');
    }
    selectedCircle = circle;
    selectedCircle.classList.add('selected');
    document.getElementById('CircleError').textContent = '';
}

function togglePhoneInput() {
    const phoneInput = document.getElementById('phoneInput');
    const anonymousRadio = document.getElementById('anonymousRadio');
    phoneInput.disabled = anonymousRadio.checked;

    if (anonymousRadio.checked) {
        phoneInput.value = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('NumberError').textContent = '';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    const phoneInput = document.getElementById('phoneInput');
    const phone = phoneInput.value.trim();
    const anonymousRadio = document.getElementById('anonymousRadio');
    const messageError = document.getElementById('messageError');
    const phoneError = document.getElementById('phoneError');
    const numberError = document.getElementById('NumberError');
    const circleError = document.getElementById('CircleError');

    messageError.textContent = '';
    phoneError.textContent = '';
    numberError.textContent = '';
    circleError.textContent = '';

    const phonePattern = /^\d{11}$/;

    let isValid = true;

    if (!anonymousRadio.checked) {
        if (!phone) {
            phoneError.textContent = 'Это поле является обязательным для заполнения';
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            numberError.textContent = 'Неверный формат номера телефона';
            isValid = false;
        }
    }

    if (!message) {
        messageError.textContent = 'Это поле является обязательным для заполнения';
        isValid = false;
    }

    if (!selectedCircle) {
        circleError.textContent = 'Пожалуйста, выберите рейтинг';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const rating = selectedCircle.getAttribute('data-value');

    const botToken = '6188248886:AAFoutLzyYQ_GbEl9kxKXca5RQWEMmRvhFI';
    const chatId = '516504642';

    const text = `Оценка: ${rating}\nСообщение: ${message}\nНомер телефона: ${anonymousRadio.checked ? 'Анонимно' : phone}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка отправки сообщения');
            }
            alert('Ваше сообщение отправлено. Спасибо, что поделились!');
            messageInput.value = '';
            phoneInput.value = '';
            if (selectedCircle) {
                selectedCircle.classList.remove('selected');
            }
            selectedCircle = null;
            anonymousRadio.checked = false;
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения в Telegram:', error);
        });
}
