# Final project

Это последнее задание в курсе. Дедлайн - **25.11**!

Для выполнения этого ДЗ Вам понадобятся следующие npm-пакеты:

* react
* react-dom
* react-router-dom
* webpack
* json-server
* redux

Выше описаны только самые необходимые пакеты, вероятно в процессе выполнения выяснится, что необходимо что-то еще.

**Задание**. Необходимо создать приложение `pokedex`.

### Общие требования:

1. **Пагинация**. Может быть реализована любым способом: 
    * Кнопка "Load more", которая подгружает следующую страницу в общий список
    * Endless scroll. Принцип тот же, что и у load more за исключеним того, что следующая порция должна подгружаться автоматически при достижении конца страницы.
    * Традиционная пагинация с номерами страниц

2. **Адаптивный дизайн**

3. **Должна присутствовать навигация (меню).**

4. **Желательно воспользоваться redux для state management**

### Требования:

1. **Главная страница**. Здесь должен выводиться список покемонов плашками. В каждой плашке должна быть картинка покемона, его имя и кнопка "Поймать". Если покемон уже пойман - кнопка должна быть `disabled`. При нажатии на покемона - нужно переходить на страничку покемона.

2. **Страница покемона**. Здесь должна выводится информация по указанному покемону: id, имя, картинка, статус (пойман или нет). Если покемон пойман, то нужно еще показывать дату его поимки.

3. **Пойманные покемоны**. Здесь логика точно такая же, как и на главной странице, за исключением того, что выводиться должны только пойманные покемоны.

### Рекомендации

1. Используйте какой-нибудь css-framework, чтобы верстка заняла минимум времени.

2. Пойманных покемонов лучше выносить в отдельную коллекцию и затем связывать их средствами json-server. Подробности можно найти в документации.

3. Постарайтесь показать себя во всей красе. Если есть какой-то опыт с дополнительными пакетами, не указанными в списке - не стесняйтесь их использовать.

4. Приветствуется создание доступного интерфейса.

5. Постарайтесь построить хорошую архитектуру приложения. Как минимум, стоит отделить бизнес-логику приложения от ее презентационного слоя (`view`).

6. Приветствуется покрытие unit-тестами.

7. Поддержка браузеров: последние версии современных браузеров, ie 11

### Примечание

Картинки покемонов и `db.json` для `json-server` можно найти в этом репозитории.

### Если не любите покемонов

Если есть особая нетерпимость к покемонам, то можно воспользоваться любым понравившимся api и реализовать все фичи из задания (функциональность по поимке покемона можно заменить закладками, лайками и т.п.)
