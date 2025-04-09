export class Sidebar {
  /**
    Компонент сайдбар.
    @param {string} openBtnSelector - Селектор кнопки для открытия боковой панели.
    @param {string} align - Позиционирование компонента ('left' или 'right').
    */
  constructor(openBtnSelector, align = "right") {
    this.sidebar = document.querySelector("#sidebar");
    this.openBtn = document.querySelector(openBtnSelector);
    this.closeBtn = this.sidebar.querySelector("#close-sidebar");

    // Привязываем обработчики событий к экземпляру класса
    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.sidebar.addEventListener(
      "click",
      this.closeOnBackdropClick.bind(this)
    );

    // Устанавливаем атрибут data-align
    this.sidebar.setAttribute("data-align", align);

    this.attachListeners();
  }

  /**
   * Открывает сайдбар.
   */
  open() {
    this.sidebar.showModal();
  }

  /**
   * Закрывает сайдбар.
   */
  close() {
    this.sidebar.close();
  }

  /**
   * Добавляет обработчик события клика на сайдбар для закрытия.
   * Закрытие панели при клике на зайдний фон
   * @param {MouseEvent} event - Событие клика мыши.
   */
  closeOnBackdropClick(event) {
    const isClickedOnBackdrop = event.target === this.sidebar;

    if (isClickedOnBackdrop) {
      this.close();
    }
  }

  /**
   * Прикрепляет обработчики событий.
   */
  attachListeners() {
    this.openBtn.addEventListener("click", this.handleOpenClick);
    this.closeBtn.addEventListener("click", this.handleCloseClick);
    this.sidebar.addEventListener("keydown", this.handleKeyDown);
  }

  /**
   * Удаляет обработчики событий.
   */
  removeListeners() {
    this.openBtn.removeEventListener("click", this.handleOpenClick);
    this.closeBtn.removeEventListener("click", this.handleCloseClick);
    this.sidebar.removeEventListener("keydown", this.handleKeyDown);
  }

  /**
   * Обработчик события клика на кнопке открытия.
   */
  handleOpenClick() {
    this.open();
  }

  /**
   * Обработчик события клика на кнопке закрытия.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Обработчик события нажатия клавиши.
   * @param {KeyboardEvent} event - Событие нажатия клавиши.
   */
  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.handleCloseClick();
    }
  }
}
