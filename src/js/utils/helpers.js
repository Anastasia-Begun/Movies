import { getData } from "../api/getData";
import { Sidebar } from "../components/sidebar";
import { generateTemplateForDetails } from "./generateTemplate";
/**
 * Функция для обработки клика по карточке и получения детальной информации.
 * @param {Event} event - Событие клика.
 */
export const handleCardClickAndGetData = async (event) => {
  const card = event?.currentTarget;
  const id = card?.getAttribute("data-id");
  const type = card?.getAttribute("data-type");

  // Запрос на получение данных по id и типу
  const data = await getData(`${type}/${id}`);

  // Генерируем детальную информацию по карточке
  generateTemplateForDetails(data, { containerSelector: "#sidebar-list" });

  // Открываем сайдбар
  new Sidebar(`[data-id="${id}"]`)?.open();
};

// Функция для прикрепления обработчика события клика к карточкам.
export const attachListeners = () => {
  const cards = document.querySelectorAll("[data-id]");

  cards.forEach((card) => {
    card.addEventListener("dblclick", handleCardClickAndGetData);
  });
};
