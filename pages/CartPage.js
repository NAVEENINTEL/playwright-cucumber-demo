class CartPage {
    constructor(page) {
      this.page = page;
    }
  
    async goToCart() {
      await this.page.click('.shopping_cart_link');
    }
  
    async getAddedItemsDetails() {
      const addedItems = await this.page.$$eval('.cart_item', (items) => {
        return items.map((item) => {
          const name = item.querySelector('.inventory_item_name').innerText;
          const price = item.querySelector('.inventory_item_price').innerText;
          return { name, price };
        });
      });
      return addedItems;
    }
  
    async calculateSubtotal() {
      const itemPrices = await this.page.$$('.inventory_item_price');
      const prices = await Promise.all(itemPrices.map(async (element) => {
        const text = await element.textContent();
        return parseFloat(text.replace('$', ''));
      }));
      return prices.reduce((acc, price) => acc + price, 0);
    }
  
    async proceedToCheckout() {
      await this.page.click('[data-test=checkout]');
    }
  
    async fillShippingDetails(firstName, lastName, postalCode) {
      console.log('Filling shipping details...');
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', postalCode);
      await this.page.click('#continue');
      console.log('Shipping details filled.');
    }
  
    async getTotalPrice() {
      const totalPriceOnCheckoutElement = await this.page.$('.summary_total_label');
      if (!totalPriceOnCheckoutElement) {
        throw new Error('Total price element not found on checkout page');
      }
  
      const totalPriceText = await totalPriceOnCheckoutElement.innerText();
      const totalPriceMatch = totalPriceText.match(/\d+\.\d+/);
  
      if (!totalPriceMatch) {
        throw new Error('Total price not found or invalid format');
      }
  
      return parseFloat(totalPriceMatch[0]).toFixed(2);
    }
  
    async completeCheckout() {
      await this.page.click('[data-test=finish]');
    }
  
    async verifyThankYouPage() {
      await this.page.waitForSelector('.complete-header');
      const thankYouMessage = await this.page.textContent('.complete-header');
      return thankYouMessage;
    }
  }
  
  module.exports = CartPage;
  