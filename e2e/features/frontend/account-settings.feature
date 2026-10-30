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

  Scenario: A user changes the email through the form and logs in with the new address
    Given a registered user exists
    When I log in through the form
    And I visit the account security page
    And I request an email change to a new address through the form
    Then I should see the email change check-your-inbox message
    When I open the email change link from my email in the browser
    Then I should see the email change state "done"
    When I log in through the form with the new email
    Then the user menu should show my email
