@frontend
Feature: Accounts in the browser

  Background:
    Given the browser is open

  Scenario: Signing up and confirming the email logs the user in
    When I sign up through the form with a new email
    Then the user menu should show my email

  Scenario: The sign-up form tips which password is acceptable
    When I open the "sign up" page
    Then I should see the password tip mentioning letters, digits and symbols
    And the password length rule should be unmet

  Scenario: The password length rule turns met once the password is long enough
    When I open the "sign up" page
    And I type the password "e2e-password-123" on the sign-up form
    Then the password length rule should be met

  Scenario: The sign-up form rejects a common password with the server explanation
    When I open the "sign up" page
    And I submit the sign-up form with the password "Password123"
    Then I should see the password field error mentioning "too common"

  Scenario: The sign-up form warns live when the password contains the email
    When I open the "sign up" page
    And I type the email "janedoe@phrasal.test" and the password "my-janedoe-pass" on the sign-up form
    Then the password email rule should be unmet

  Scenario: Logging out brings back the Log in link
    When I sign up through the form with a new email
    And I log out through the user menu
    Then I should see the "Log in" link in the navigation

  Scenario: A registered user logs in through the form
    Given a registered user exists
    When I log in through the form
    Then the user menu should show my email

  Scenario: Wrong password shows an error and keeps the visitor anonymous
    Given a registered user exists
    When I log in through the form with password "wrong-password-999"
    Then I should see an auth error
    And I should see the "Log in" link in the navigation

  Scenario: The session survives a page reload
    Given a registered user exists
    When I log in through the form
    And I reload the page
    Then the user menu should show my email

  Scenario: Anonymous visitor still sees the quiz
    When I navigate to the phrasal verbs quiz
    Then I should see a quiz input field
    And I should see the "Log in" link in the navigation

  Scenario: The privacy policy is public
    When I open the privacy policy while logged out
    Then I should see the heading "Privacy Policy"
    And I should see a link to "info@phrasalbox.com"
