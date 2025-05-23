import Component from "@utils/Component"
import * as tf from '@tensorflow/tfjs';

// Средняя высота символа рассчитывате в соответсвии с форматом foolio СНГ тетради,
// Который составляет 20см в высоту и 16см в ширину,
// В отличии от А5 листа, отношение высоты к ширине страницы равен 20.5 / 16.5 ~ 1.24;
// Метрики ширины и высоты символа выводятся в % от ширины тетради foolio
// Таким образом чтобы получить среднюю высоту и ширину символа в см нужно выполнить преобразование:
// 20.5 * char_w (или char_h);

export default new Component({
    html: /*html*/`
        <div class="metrics">
            <h3 class="metrics__header">Метрики текста изображения</h3>
            <p class="metrics__text"></p>
        </div>
    `,
    callback: (elem) => {

        // Добавляем метод для отображения метрик как глобальный объект
        // Для передачи между компонентами
       window.displayCharMetrics = async (tensor) => {
            const $metricsText = elem.querySelector(".metrics__text");

            if (!tensor) return console.warn("Тензор изображения не найден");

            // Используем модель классификатора
            const model = await tf.loadLayersModel('/ai-models/classifier/model.json');
            const batched = tensor.expandDims(0);

            // Используем tidy только для синхронных операций
            const data = await tf.tidy(() => {
                const prediction = model.predict(batched);
                const result = prediction.dataSync(); // sync, без await
                tf.dispose([prediction]);
                return result;
            });

            tf.dispose(batched);

            const [
                correctImage,
                shortText, 
                badZoom,
                badOrient,
                badAngle,
                forceBlur,
                glimmer
            ] = data.map(clsVal => Math.round(clsVal));

            if(correctImage) {
                $metricsText.textContent = "Изображение соответствует категории 1 - пригодно для анализа";
                return;
            }
            else if(shortText) {
                $metricsText.textContent = "Изображение соответствует категории 2 - Мало текста для проведения анализа";
                return;
            }
            else if(badZoom) {
                $metricsText.textContent = "Изображение соответствует категории 3 - Плохой маштаб изображения для анализа";
                return;
            }
            else if(badOrient) {
                $metricsText.textContent = "Изображение соответствует категории 4 - Необходим поворот изображения";
                return;
            }
            else if(badAngle) {
                $metricsText.textContent = "Изображение соответствует категории 5 - Слишком большой угол поворота";
                return;
            }
            else if(forceBlur) {
                $metricsText.textContent = "Изображение соответствует категории 6 - Изображение сильно размыто";
                return;
            }
            else if(glimmer) {
                $metricsText.textContent = "Изображение соответствует категории 7 - Тусклое изображение";
                return;
            }
        };

    }
});