/**
 * Компонент спиннер.
 * @param {boolean} isVisible - Показывать/скрывать компонент.
 */
export const toggleSpinner = (isVisible) => {
  const spinner = document.querySelector(".spinner");
  if (spinner) {
    spinner.classList.toggle("show", isVisible);
  }
};