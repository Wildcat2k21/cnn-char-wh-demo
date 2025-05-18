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
            <p class="metrics__char-w">
                Средняя ширина символов:
                <b><span id="metrics-char-w-val">0см</span></b>
            </p>
            <p class="metrics__char-h">
                Средняя ширина высота символов:
                <b><span id="metrics-char-h-val">0см</span></b>
            </p>
        </div>
    `,
    callback: (elem) => {

        // Добавляем метод для отображения метрик как глобальный объект
        // Для передачи между компонентами
       window.displayCharMetrics = async (tensor) => {
            const $charWidthSpan = elem.querySelector("#metrics-char-h-val");
            const $charHeoghtSpan = elem.querySelector("#metrics-char-w-val");
;
            if (!tensor) return console.warn("Тензор изображения не найден");

            const model = await tf.loadLayersModel('/ai-models/charWH/model.json');
            const batched = tensor.expandDims(0);

            // Используем tidy только для синхронных операций
            const data = await tf.tidy(() => {
                const prediction = model.predict(batched);
                const result = prediction.dataSync(); // sync, без await
                tf.dispose([prediction]);
                return result;
            });

            tf.dispose(batched);

            const [charW, charH] = data;
            const charWcm = (charW * 16 / 100).toFixed(2);
            const charHcm = (charH * 20.5 / 100).toFixed(2);

            $charWidthSpan.textContent = `${charWcm}см`;
            $charHeoghtSpan.textContent = `${charHcm}см`;
        };

    }
});