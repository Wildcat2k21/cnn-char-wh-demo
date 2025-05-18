import './style.css';
import Component from '@utils/Component';
import LoadFile from './components/LoadFile';
import Metrics from './components/Metrics';

const AppContent = Component({
  html: /*html*/`
    <main class="main">
      <h1>📖 Анализ метрик рукописного текста</h1>
      <h2>📏 (Средняя высота и ширина символов)</h2>
    </main>
  `
});

// Добавляем root элемент
document.querySelector("#app").appendChild(AppContent._element);
AppContent.applyComp(Metrics);
AppContent.applyComp(LoadFile);
