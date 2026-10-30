@api
Feature: Abuse protection API

  Background:
    Given the API is available

  Scenario: A filled honeypot is answered like a normal registration but creates nothing
    When I register with a new email and the honeypot field filled
    Then the response status should be 202
    And the response should be the check-your-inbox message
    And no email should have been sent to that address
    When I log in with the current email and password "e2e-password-123"
    Then the response status should be 401

  Scenario: Too many wrong current passwords are rate limited
    Given I am logged in as a new user
    When I try to change my password with a wrong current password 6 times
    Then the response status should be 429
