@api
Feature: Email verification API

  Background:
    Given the API is available

  Scenario: Registering sends a verification email
    When I register with a new email and password "e2e-password-123"
    Then the response status should be 202
    And I should receive a verification email

  Scenario: The verification link verifies the address and can be opened again
    Given an unverified user exists
    When I open the verification link from my email
    Then the response status should be 204
    When I open the verification link from my email
    Then the response status should be 204

  Scenario: An invented token is rejected
    When I verify with the token "this-token-was-never-issued-by-the-server-0000"
    Then the response status should be 400

  Scenario: Resending invalidates the previous link
    Given an unverified user exists
    When I request a new verification email
    Then the response status should be 202
    And I should have received 2 verification emails
    And the previous verification link should no longer work
    When I open the verification link from my email
    Then the response status should be 204

  Scenario: Resending for an unknown address sends nothing
    When I request a new verification email for an unknown address
    Then the response status should be 202
    And no email should have been sent to that address

  Scenario: Resending for a verified user sends nothing new
    Given a registered user exists
    When I request a new verification email
    Then the response status should be 202
    And I should have received 1 verification emails
