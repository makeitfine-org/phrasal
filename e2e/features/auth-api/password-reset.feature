@api
Feature: Password reset API

  Background:
    Given the API is available

  Scenario: Asking for a reset sends an email
    Given a registered user exists
    When I request a password reset
    Then the response status should be 202
    And the response should be the check-your-inbox message
    And I should receive a password reset email

  Scenario: Asking for an unknown address looks the same and sends nothing
    When I request a password reset for an unknown address
    Then the response status should be 202
    And the response should be the check-your-inbox message
    And no password reset email should have been sent to that address

  Scenario: The emailed link sets a new password
    Given a registered user exists
    When I request a password reset
    And I reset my password to "e2e-brand-new-password-1" with the link from my email
    Then the response status should be 204
    When I log in with the current email and password "e2e-password-123"
    Then the response status should be 401
    When I log in with the current email and password "e2e-brand-new-password-1"
    Then the response status should be 200
    And I should receive a password changed notice

  Scenario: The link works only once
    Given a registered user exists
    When I request a password reset
    And I reset my password to "e2e-brand-new-password-1" with the link from my email
    Then the response status should be 204
    When I use the same reset link again with the password "e2e-brand-new-password-2"
    Then the response status should be 400

  Scenario: An invented token is rejected
    When I reset my password to "e2e-brand-new-password-1" with the token "this-token-was-never-issued-by-the-server-0000"
    Then the response status should be 400

  Scenario: A weak password is rejected and the link keeps working
    Given a registered user exists
    When I request a password reset
    And I reset my password to "short" with the link from my email
    Then the response status should be 400
    When I reset my password to "e2e-brand-new-password-1" with the link from my email
    Then the response status should be 204

  Scenario: A new request invalidates the previous link
    Given a registered user exists
    When I request a password reset 2 times
    Then I should have received 2 password reset emails
    And the previous password reset link should no longer work
    When I reset my password to "e2e-brand-new-password-1" with the link from my email
    Then the response status should be 204

  Scenario: Resetting logs out other sessions
    Given I am logged in as a new user
    When I request a password reset
    And I reset my password to "e2e-brand-new-password-1" from another device
    Then the response status should be 204
    When I request my profile
    Then the response status should be 401

  Scenario: An unverified user can reset the password and log in
    Given an unverified user exists
    When I request a password reset
    And I reset my password to "e2e-brand-new-password-1" with the link from my email
    Then the response status should be 204
    When I log in with the current email and password "e2e-brand-new-password-1"
    Then the response status should be 200

  Scenario: Asking too often for one address is rate limited
    Given a registered user exists
    When I request a password reset 4 times
    Then the response status should be 429
