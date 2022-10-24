[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд
Сервис Mesto - это учебная интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки. В проекте применялись следущие технологии:
- Создание сервера при помощи Express
- Работа с NoSQL базой данных на примере MongoDB
- Mongoose (создание схем и моделей)
- Middleware
- Использование роутов и контроллеров для структуризации кода

## При помощи перечисленных технологий был реализован фунционал проекта:

- Получение данных о пользователях
- Создание пользователя
- Обновление профиля пользователя и его аватара
- Получение данных всех карточек пользователей
- Создание и удаление новых пользовательских карточек
- Возможность ставить и снимать лайк с карточки

## Ссылка на репозиторий

https://github.com/svet-ko/express-mesto-gha

## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
