@frontend
Feature: Account settings in the browser

  Background:
    Given the browser is open

  Scenario: A user changes the password through the form and logs in with the new one
    Given a registered user exists
    When I log in through the form
    And I visit the account security page
    And I change my password to "e2e-brand-new-password-1" through the form
    Then I should see the password changed message
    When I log out through the user menu
    And I log in again through the form with the password "e2e-brand-new-password-1"
    Then the user menu should show my email
