const setupMobileNavigation = () => {
  const navigationToggleButton = document.querySelector(
    "#navigation-toggle-button"
  );
  const navigationWrapper = document.querySelector(".header__body");

  navigationToggleButton.addEventListener("click", () => {
    const currentlyActive = navigationToggleButton.classList.contains(
      "is-active"
    );

    if (currentlyActive) {
      navigationToggleButton.classList.remove("is-active");
      navigationWrapper.classList.remove("header__body--open");

      return;
    }

    navigationToggleButton.classList.add("is-active");
    navigationWrapper.classList.add("header__body--open");
  });
};

export default setupMobileNavigation;
