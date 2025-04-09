import { getData } from "../api/getData";
import { Sidebar } from "../components/sidebar";
import { generateTemplateForDetails } from "./generateTemplate";
/**
 * Функция для обработки клика по карточке и получения детальной информации.
 * @param {Event} event - Событие клика.
 */
export const handleCardClickAndGetData = async (event) => {
  // Получаем id карточки
  const id = event?.currentTarget?.getAttribute("data-id");

  // Запрос на получение фильма по id
  const data = await getData(`movie/${id}`);

  // Генерируем детальную информацию по карточке.
  generateTemplateForDetails(data, { containerSelector: "#sidebar-list" });

  // Открываем сайдбар
  const sidebarInfo = new Sidebar(`[data-id="${id}"]`)?.open();
};

/**
 * Функция для прикрепления обработчика события клика к карточкам фильмов/сериалов.
 */
export const attachListeners = () => {
  const cards = document.querySelectorAll("[data-id]");

  cards.forEach((card) => {
    card.addEventListener("dblclick", handleCardClickAndGetData);
  });
};
