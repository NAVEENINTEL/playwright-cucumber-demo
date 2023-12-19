Feature: Verify final price accuracy at checkout and Thank You page


Scenario Outline: Verify final price accuracy for different user and shipping details
  Given I am on the SauceDemo login page
  When I log in with "<Username>" and "<Password>"
  Then I should be logged in successfully
  And I add items to the cart
  And I proceed to checkout
  And I fill shipping details with "<FirstName>", "<LastName>", and "<PostalCode>"
  Then I verify the total price accuracy
  And I complete the checkout
  And I verify the Thank You page

Examples:
  | Username         | Password | FirstName | LastName | PostalCode |
  | standard_user | secret_sauce | John      | Doe      | 12345      |
