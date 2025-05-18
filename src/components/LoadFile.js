import Component from "@utils/Component";
import * as tf from '@tensorflow/tfjs';

export default Component({
  html: /*html*/`
    <div class="upload-file">
      <h3>Загрузите картинку</h3>
      <div class="upload-file__upload-btn-wrapper">
        <button class="upload__decorated-btn">
          Выбрать файл
          <input type="file" id="upload" accept="image/*" />
        </button>
      </div>
      <img id="preview" style="max-width: 300px; margin-top: 10px;" />
      <img id="preview-converted" style="max-width: 300px; margin-top: 10px;" />
    </div>
  `,
  callback: (elem) => {
    const $upload = elem.querySelector("#upload");
    const $preview = elem.querySelector("#preview");
    const $converted = elem.querySelector("#preview-converted");
    const $customBtn = elem.querySelector('.upload__decorated-btn');

    $customBtn.addEventListener('click', () => $upload.click());

    $upload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      $preview.src = URL.createObjectURL(file);

      $preview.onload = async () => {
        // 1) Подготовка тензора с поворотом
        const tensor = tf.tidy(() => {
          let t = tf.browser.fromPixels($preview);   // [H,W,3]
          t = t.mean(2).expandDims(-1);              // [H,W,1]
          // Поворот на 90° CW:
          t = t.transpose([1, 0, 2]);                // [W,H,1]
          t = t.reverse(1);                          // [W,H,1] повернуто
          // Ресайз обратно на [200,266]
          t = tf.image.resizeBilinear(t, [200, 266]); // [200,266,1]
          // Нормализация
          return t.div(255);
        });

        // 2) Визуализация результата
        const canvas = document.createElement("canvas");
        canvas.width = 266;
        canvas.height = 200;
        await tf.browser.toPixels(tensor.squeeze(), canvas);
        $converted.src = canvas.toDataURL();

        // Отображаем метрики
        window.displayCharMetrics(tensor);
      };
    });
  }
});
