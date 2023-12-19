const {webURL} =require("../config")

class LoginPage {
    constructor(page) {
      this.page = page;
      this.webURL=webURL
    }
  
    async navigateTo() {
      await this.page.goto(this.webURL);
      // await this.page.goto("/")
    }
  
    async login(username, password) {
      await this.page.fill('#user-name', username);
      await this.page.fill('#password', password);
      await this.page.click('#login-button');
    }
    async isLoggedIn() {
      try {
        await this.page.waitForSelector('.inventory_container', { timeout: 5000 });
        // Check if a specific element that appears after successful login is present
        return true; // Return true if the expected element is found
      } catch (error) {
        return false; // Return false if the expected element is not found within the timeout
      }
    }

  }
  
  module.exports = LoginPage;
  