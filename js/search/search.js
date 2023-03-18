'use strict';

let text_1 = "Очень долго республика Карелия была широко известна в узких кругах любителей дикого туризма, охоты и рыбалки, но теперь все изменилось. Завораживающие скалы, обилие невероятных водопадов, будоражащие воображение болота, и множество троп, уходящих вглубь Тайги — это всё среди нас, это все — Карелия. Карелия открылась для всех видов туризма. Нет такого направления туризма, который нельзя встретить в этом дивном крае";


function isSearch(text, value) {
    let temp = value;
    if (text.toLowerCase().includes(value.toLowerCase())) {
        window.alert("Find " + temp);
    }
    return true;
}

function contentAdd(text) {
// Создаем новый элемент с указанным именем тега
const div = document.createElement("div");
// Добавляем к div класс black
div.classList.add('black');
// Добавляем в конец body тег div
document.body.append(div);
// Вставка текста в тег div
div.innerHTML = text;
}

document.getElementById('search').addEventListener('submit', function (e) { 
    // что бы не отправилась форма.  
    e.preventDefault();  
    let value = document.getElementById('Inputtext').value;
    if (isSearch(text_1, value)) {
        window.location.href = 'search.html' + '#' + text_1;
        localStorage.setItem('selected', value);
        // contentAdd(text_1);
    }
})

