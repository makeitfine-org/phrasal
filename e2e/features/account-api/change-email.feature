@api
Feature: Change email API

  Background:
    Given the API is available

  Scenario: The link goes to the new address and the profile keeps the old email
    Given I am logged in as a new user
    When I request an email change to a new address with password "e2e-password-123"
    Then the response status should be 202
    And I should receive an email change link at the new address
    When I request my profile
    Then the response status should be 200
    And the profile email should be the current email

  Scenario: Confirming moves the account, closes the session and notifies the old address
    Given I am logged in as a new user
    When I request an email change to a new address with password "e2e-password-123"
    And I confirm the email change with the link from my email
    Then the response status should be 204
    When I request my profile
    Then the response status should be 401
    When I log in with the new email and password "e2e-password-123"
    Then the response status should be 200
    When I log out
    And I log in with the current email and password "e2e-password-123"
    Then the response status should be 401
    And the old address should receive an email changed notice

  Scenario: The link works once
    Given I am logged in as a new user
    When I request an email change to a new address with password "e2e-password-123"
    And I confirm the email change with the link from my email
    Then the response status should be 204
    When I confirm the email change with the link from my email again
    Then the response status should be 400

  Scenario: A taken address looks the same and the owner is told
    Given I am logged in as a new user
    When I request an email change to the address of another registered user
    Then the response status should be 202
    And the other user's address should receive an account exists notice
    And no email change link should be sent to the new address

  Scenario: My current address is rejected
    Given I am logged in as a new user
    When I request an email change to my current address
    Then the response status should be 400

  Scenario: A wrong password is rejected
    Given I am logged in as a new user
    When I request an email change to a new address with password "not-my-password"
    Then the response status should be 400
