import { global } from "./global.js";
import { getData } from "./api/getData.js";
import { generateTemplate } from "../js/utils/generateTemplate.js";
import { tabsComponent } from "./components/tabs.js";
import { search } from "./api/searchServices.js";

/**
 * Инициализирует функции в зависимости от страницы.
 */
function init() {
  switch (global.currentPage) {
    // Если текущая страница корневая или index.html
    case "/":
    case "/index.html":
      // Вызываем функции для отображения фильмов в прокате (слайдер), а также популярных фильмов и сериалов
      processFilmsAndShowsData("movie/now_playing");
      processFilmsAndShowsData("movie/popular");
      processFilmsAndShowsData("tv/popular");
      tabsComponent();

      break;
    case "/search.html":
      // Вызываем функцию для выполнения поиска
      search();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);

/**
 * Функция для обработки данных о фильмах и сериалах.
 *
 * @param {string} endpoint - Конечная точка API.
 */
export const processFilmsAndShowsData = async (endpoint) => {
  const { results } = await getData(endpoint);

  // Определяем контейнер и тип контента в зависимости от эндпоинта
  const resultsConfig = {
    "movie/now_playing": {
      container: ".swiper-wrapper",
    },
    "movie/popular": {
      container: ".popular-movies",
    },
    "tv/popular": {
      container: ".popular-tv",
      type: "tv",
    },
  };

  const config = resultsConfig[endpoint];

  // Генерируем шаблон
  generateTemplate(results, {
    containerSelector: config.container,
    useSlider: endpoint === "movie/now_playing",
    type: config.type,
  });
};
