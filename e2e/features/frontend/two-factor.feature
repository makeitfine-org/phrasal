@frontend
Feature: Two-factor authentication in the browser

  Background:
    Given the browser is open

  Scenario: A user turns on two-factor authentication and gets recovery codes
    Given a registered user exists
    When I log in through the form
    And I turn on two-factor authentication through the account security page
    Then I should see 10 recovery codes
    When I finish saving my recovery codes
    Then the account security page should show two-factor authentication as "on"

  Scenario: Login asks for a code and a valid code logs the user in
    Given a registered user exists
    When I log in through the form
    And I turn on two-factor authentication through the account security page
    And I log out through the user menu
    And I log in through the form and reach the two-factor code page
    Then I should be on the two-factor code page
    When I enter a valid two-factor code
    Then the user menu should show my email

  Scenario: A wrong code shows an error and keeps the user on the code page
    Given a registered user exists
    When I log in through the form
    And I turn on two-factor authentication through the account security page
    And I log out through the user menu
    And I log in through the form and reach the two-factor code page
    And I enter the two-factor code "000000"
    Then I should be on the two-factor code page

  Scenario: A recovery code logs the user in
    Given a registered user exists
    When I log in through the form
    And I turn on two-factor authentication through the account security page
    And I log out through the user menu
    And I log in through the form and reach the two-factor code page
    And I enter recovery code number 1
    Then the user menu should show my email

  Scenario: Turning two-factor authentication off removes the code step
    Given a registered user exists
    When I log in through the form
    And I turn on two-factor authentication through the account security page
    And I turn off two-factor authentication with a valid code
    Then the account security page should show two-factor authentication as "off"
    When I log out through the user menu
    And I log in through the form
    Then the user menu should show my email

  @admin-two-factor
  Scenario: An admin without two-factor sees the enrollment banner until it is turned on
    Given I am logged in through the form as the admin without two-factor
    Then I should see the two-factor enrollment banner
    When I turn on two-factor authentication through the account security page as the admin
    And I finish saving my recovery codes
    Then I should not see the two-factor enrollment banner

  Scenario: The account security page asks an anonymous visitor to log in
    When I visit the account security page
    Then I should be on the login page
