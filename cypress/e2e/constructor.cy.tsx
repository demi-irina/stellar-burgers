describe('Страница конструктора бургера', () => {
  const bunId = 'bun1';
  const mainId = 'main1';
  const sauceId = 'sauce1';
  const orderNumber = '42424';
  const bunName = 'Краторная булка N-200i';
  const mainName = 'Биокотлета из марсианской Магнолии';
  const sauceName = 'Соус фирменный Space Sauce';

  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(`[data-cy="ingredient-add-${bunId}"]`).contains('Добавить').click();
    cy.get(`[data-cy="ingredient-add-${mainId}"]`).contains('Добавить').click();
    cy.get(`[data-cy="ingredient-add-${sauceId}"]`)
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('contain', bunName);
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', bunName);
    cy.get('[data-cy="constructor-fillings"]')
      .find('[data-cy="constructor-filling"]')
      .should('have.length', 2);
    cy.get('[data-cy="burger-constructor"]').should('contain', mainName);
    cy.get('[data-cy="burger-constructor"]').should('contain', sauceName);
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(`[data-cy="ingredient-link-${mainId}"]`).click();
    });

    it('Открытие модального окна ингредиента', () => {
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details"]').should('contain', mainName);
      cy.get('[data-cy="ingredient-details"]').should('contain', '4242');
    });

    it('Закрытие по клику на крестик', () => {
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    const submitOrder = () => {
      cy.contains('button', 'Оформить заказ').click();
      return cy.wait('@createOrder');
    };

    beforeEach(() => {
      cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );

      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', 'test-refresh-token');
          win.document.cookie = 'accessToken=test-access-token;path=/';
        }
      });

      cy.wait('@getIngredients');
      cy.wait('@getUser');

      cy.get(`[data-cy="ingredient-add-${bunId}"]`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy="ingredient-add-${mainId}"]`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy="ingredient-add-${sauceId}"]`)
        .contains('Добавить')
        .click();
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.clearLocalStorage();
    });

    it('Собирается бургер и отправляется заказ', () => {
      cy.getCookie('accessToken')
        .its('value')
        .should('eq', 'test-access-token');
      cy.window()
        .its('localStorage')
        .invoke('getItem', 'refreshToken')
        .should('eq', 'test-refresh-token');

      submitOrder().then((interception) => {
        expect(interception.request.headers.authorization).to.eq(
          'test-access-token'
        );
        expect(interception.request.body).to.deep.equal({
          ingredients: [bunId, mainId, sauceId, bunId]
        });
      });
    });

    it('Открывается модальное окно заказа с верным номером', () => {
      submitOrder();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', orderNumber);
    });

    it('Закрывается модальное окно заказа и очищается конструктор', () => {
      submitOrder();

      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-top-placeholder"]').should(
        'be.visible'
      );
      cy.get('[data-cy="constructor-bun-bottom-placeholder"]').should(
        'be.visible'
      );
      cy.get('[data-cy="constructor-fillings"]')
        .find('[data-cy="constructor-filling"]')
        .should('have.length', 0);
    });
  });
});
