class ProductsPage {
    constructor(page) {
      this.page = page;
    }
  
    async sortByPriceLowToHigh() {
      await this.page.selectOption('.product_sort_container', 'lohi');
    }
  
    async sortByAlphabeticalOrder() {
      await this.page.selectOption('.product_sort_container', 'az');
    }
  
    async addToCart(productName) {
        const productLocator = this.convertProductNameToLocator(productName);
        await this.page.click(productLocator);
      }
  
    async getLeastExpensiveItemName() {
      const leastExpensiveItem = await this.page.$('.inventory_item_name');
      return await leastExpensiveItem.innerText();
    }
  
    async getFirstAlphabeticalItemName() {
      const firstAlphabeticalItem = await this.page.$('.inventory_item_name');
      return await firstAlphabeticalItem.innerText();
    }
  
    convertProductNameToLocator(productName) {
        return `[data-test=add-to-cart-${productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}]`;
      }

  }
  
  module.exports = ProductsPage;
  