import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ApplicationURL from '../../helpers/ApplicationURL';
import ProductsPage from '../../pages/ProductsPage';
import YourCartPage from '../../pages/YourCartPage';
import PageTitles from '../../helpers/PageTitles';
import CheckoutYourInformationPage from '../../pages/CheckoutYourInformationPage';
import CheckoutOverviewPage from '../../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../../pages/CheckoutCompletePage';

test.describe('Sanity Tests Block', () => {
  const products = ['Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie'];

  test('Validate doing simple transaction', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutYourInformationPage = new CheckoutYourInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await loginPage.loginToApplication();
    await productPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productPage.validateTitle(PageTitles.INVENTORY_PAGE);
    await productPage.chooseProductByTitle(products[0]);
    await productPage.chooseProductByTitle(products[1]);
    await productPage.validateNumberOfItems(products.length.toString());
    await productPage.goToCart();
    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(products.length)
    await yourCartPage.validateItemExistsInCart(products[0]);
    await yourCartPage.validateItemExistsInCart(products[1]);
    await yourCartPage.goToCheckout();
    await checkoutYourInformationPage.validatePageUrl(ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL);
    await checkoutYourInformationPage.validateTitle(PageTitles.CHECKOUT_YOUR_INFO_PAGE);
    await checkoutYourInformationPage.fillInformation("Tomer", "Asheknazi", "544679");
    await checkoutYourInformationPage.goToCheckoutOverview();
    await checkoutOverviewPage.validatePageUrl(ApplicationURL.CHECKOUT_OVERVIEW_PAGE_URL);
    await checkoutOverviewPage.validateTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE);
    await checkoutOverviewPage.clickFinishButton();
    await checkoutCompletePage.validatePageUrl(ApplicationURL.CHECKOUT_COMPLETE_PAGE_URL);
    await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE);
    await checkoutCompletePage.validateFinalMessage("Thank you for your order!");
    await checkoutCompletePage.clickBackHome()
    await productPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productPage.validateTitle(PageTitles.INVENTORY_PAGE);
  });
});
