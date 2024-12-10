const TOKEN = "7759369845:AAFExU3zFGdNtJZEybSftmeGA3eQpZvtFdc";
const CHAT_ID = "-1002460784573";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById("tg").addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `<b>Заявка зі сайту!</b>\n`;
    message += `<b>Товар: </b> ${this.product_name.value}\n`;
    message += `<b>Прізвище, Ім'я: </b> ${this.name.value}\n`;
    message += `<b>Номер телефону: </b> ${this.phone.value}\n`;
    message += `<b>E-mail: </b> ${this.email.value}\n`;
    message += `<b>Місто: </b> ${this.city.value}\n`;
    message += `<b>Адреса доставки: </b> ${this.address.value}\n`;
    message += `<b>Поштова служба: </b> ${this.poshta.value}\n`;
    message += `<b>Оплата: </b> ${this.oplata.value}\n`;
    message += `<b>Не зв'язуватися: </b> ${this['no-call'].checked ? 'Так' : 'Ні'}`;

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
})
