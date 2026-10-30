@api
Feature: Delete account API

  Background:
    Given the API is available

  Scenario: Deleting ends the session, sends a notice and frees the address
    Given I am logged in as a new user
    When I delete my account with password "e2e-password-123"
    Then the response status should be 204
    When I request my profile
    Then the response status should be 401
    When I log in with the current email and password "e2e-password-123"
    Then the response status should be 401
    And I should receive an account deleted notice
    When I register again with my old email
    Then the response status should be 202

  Scenario: A wrong password deletes nothing
    Given I am logged in as a new user
    When I delete my account with password "wrong-password-123"
    Then the response status should be 400
    When I request my profile
    Then the response status should be 200

  Scenario: A two-factor account needs a code
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I delete my account with password "e2e-password-123"
    Then the response status should be 400
    When I delete my account with password "e2e-password-123" and a valid two-factor code
    Then the response status should be 204

  Scenario: The admin account cannot be deleted
    Given I am logged in as the admin
    When I delete my account with password "wrong-for-admin"
    Then the response status should be 403
