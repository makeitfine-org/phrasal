@frontend
Feature: Accounts in the browser

  Background:
    Given the browser is open

  Scenario: Signing up logs the user in
    When I sign up through the form with a new email
    Then the user menu should show my email

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
