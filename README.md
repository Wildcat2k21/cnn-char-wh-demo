# CalliMetrics Demo

Демонстрация работы модуля измерения ширины и высоты символов по каллиграфическим метрикам.

---

## 🚀 Быстрый старт

### Требования

* **Node.js** версии **23** или новее
* **npm** (или **yarn**)

### Установка и инициализация

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/Wildcat2k21/cnn-char-wh-demo.git
   cd cnn-char-wh-demo
   ```

2. Установите зависимости:

   ```bash
   npm install
   # или
   yarn install
   ```

3. Проверьте наличие файлов модели:

   * `public/models/charWH/model.json`
   * `public/models/charWH/group1-shard1of1.bin`

4. Запустите дев-сервер Vite:

   ```bash
   npm run dev
   # или
   yarn dev
   ```

5. Откройте в браузере:

   ```
   ```

[http://localhost:5173](http://localhost:5173)

```


## 🏗 Структура проекта

```

├─ public/
│  └─ ai-models/charWH/   # предобученная модель TensorFlow\.js
│     ├─ model.json
│     └─ \*.bin
├─ src/
│  ├─ main.js          # точка входа
│  └─ utils/
│     └─ Component.js  # простой UI-компонент
├─ index.html          # шаблон HTML
├─ package.json
└─ vite.config.js      # конфиг Vite с алиасами

```

## 🔧 Использование

1. **Загрузите** изображение через кнопку "Выбрать файл".
2. **Просмотрите** исходное изображение и конвертированное (200×266, grayscale).
3. **Получите** метрики ширины и высоты символов (в см) — выводится под изображением.


## 💡 Технологии

- **Vite** (ESM, HMR)
- **Vanilla JavaScript**
- **TensorFlow.js** (in-browser inference)
- **MIT License**

---

**Лицензия**: MIT

```
