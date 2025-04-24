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
    this.reviewForm = this.sidebar.querySelector("#review-form");
    this.nameInput = this.sidebar.querySelector("#name-input");
    this.reviewInput = this.sidebar.querySelector("#review-input");
    this.reviewMessages = this.sidebar.querySelector("#review-messages");

    // Привязываем обработчики событий к экземпляру класса
    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this); // Привязываем обработчик отправки отзыва
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
    this.loadReviews();
  }

  loadReviews() {
    // Загрузка существующих отзывов из localStorage
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Очищаем текущие отзывы перед загрузкой новых
    this.reviewMessages.innerHTML = "";

    // Проходимся по каждому отзыву и добавляем его в интерфейс
    storedReviews.forEach((review) => {
      const reviewElement = document.createElement("p");
      reviewElement.textContent = `${review.name}: ${review.review}`; // Отображаем имя и текст отзыва
      this.reviewMessages.appendChild(reviewElement);
    });
  }
  /**
   * Закрывает сайдбар.
   */
  close() {
    this.sidebar.close();
  }

  /**
   * Добавляет обработчик события клика на сайдбар для закрытия.
   * Закрытие панели при клике на задний фон
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
    this.reviewForm.addEventListener("submit", this.handleReviewSubmit);
  }

  /**
   * Удаляет обработчики событий.
   */
  removeListeners() {
    this.openBtn.removeEventListener("click", this.handleOpenClick);
    this.closeBtn.removeEventListener("click", this.handleCloseClick);
    this.sidebar.removeEventListener("keydown", this.handleKeyDown);
    this.reviewForm.removeEventListener("submit", this.handleReviewSubmit);
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

  /**
   * Обработчик отправки формы отзывов.
   * @param {Event} event - Событие отправки формы.
   */
  handleReviewSubmit(event) {
    event.preventDefault();

    const nameText = this.nameInput.value.trim(); 
    const reviewText = this.reviewInput.value.trim();

    if (nameText && reviewText) {
      // Создаем объект отзыва с правильным доступом к свойству
      const review = { name: nameText, review: reviewText };

      // Получаем отзывы из localStorage
      const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      // Добавляем новый отзыв в массив
      storedReviews.push(review);
      // Сохраняем обновленный массив в localStorage
      localStorage.setItem("reviews", JSON.stringify(storedReviews));

      this.nameInput.value = "";
      this.reviewInput.value = "";

      // загружаем отзывы снова, чтобы обновить интерфейс
      this.loadReviews();
    } else {
      alert("Пожалуйста, введите ваше имя и отзыв."); // Уведомление, если одно из полей пустое
    }
  }
}
