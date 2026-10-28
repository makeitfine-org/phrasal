@api
Feature: Authentication API

  Background:
    Given the API is available

  Scenario: Register a new account
    When I register with a new email and password "e2e-password-123"
    Then the response status should be 202

  Scenario: Registering an existing email looks the same as a new one
    Given a registered user exists
    When I register again with the same email
    Then the response status should be 202
    And the response should equal the first registration response

  Scenario: An unverified user cannot log in
    Given an unverified user exists
    When I log in with the current email and password "e2e-password-123"
    Then the response status should be 403

  Scenario: Login works after verification
    Given an unverified user exists
    When I open the verification link from my email
    And I log in with the current email and password "e2e-password-123"
    Then the response status should be 200

  Scenario: A too short password is rejected
    When I register with a new email and password "short"
    Then the response status should be 400

  Scenario: Log in and read my profile
    Given a registered user exists
    When I log in with the current email and password "e2e-password-123"
    Then the response status should be 200
    When I request my profile
    Then the response status should be 200
    And the profile email should be the current email

  Scenario: Wrong password is rejected
    Given a registered user exists
    When I log in with the current email and password "wrong-password-999"
    Then the response status should be 401

  Scenario: Anonymous visitor has no profile
    When I request my profile
    Then the response status should be 401

  Scenario: Log out ends the session
    Given I am logged in as a new user
    When I log out
    Then the response status should be 204
    When I request my profile
    Then the response status should be 401

  Scenario: Repeated failed logins are rate limited
    Given a registered user exists
    When I fail to log in 6 times
    Then the response status should be 429
