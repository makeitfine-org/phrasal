@api
Feature: Two-factor authentication API

  Background:
    Given the API is available

  Scenario: Enabling 2FA returns recovery codes and sends a notice
    Given I am logged in as a new user
    When I start two-factor setup with my password
    Then the response status should be 200
    When I confirm two-factor setup with a valid code
    Then the response status should be 200
    And I should receive 10 recovery codes
    And the two-factor status should be "enabled"
    And I should receive the email "Two-factor authentication is on for your Phrasal account"

  Scenario: A wrong confirmation code does not enable 2FA
    Given I am logged in as a new user
    When I start two-factor setup with my password
    And I confirm two-factor setup with code "000000"
    Then the response status should be 400
    And the two-factor status should be "disabled"

  Scenario: Setup with a wrong password is rejected
    Given I am logged in as a new user
    When I start two-factor setup with password "definitely-wrong-password"
    Then the response status should be 400

  Scenario: Login asks for a second factor before it grants access
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I log out
    And I log in again with the current email and password
    Then the login should ask for a second factor
    When I request my profile
    Then the response status should be 401
    When I submit a valid two-factor code
    Then the response status should be 200
    When I request my profile
    Then the response status should be 200

  Scenario: The same code cannot be used twice
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I log out
    And I log in again with the current email and password
    And I submit a valid two-factor code
    Then the response status should be 200
    When I log out
    And I log in again with the current email and password
    And I submit the same two-factor code again
    Then the response status should be 400

  Scenario: A recovery code works once
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I log out
    And I log in again with the current email and password
    And I submit recovery code number 1
    Then the response status should be 200
    When I log out
    And I log in again with the current email and password
    And I submit recovery code number 1
    Then the response status should be 400

  Scenario: Regenerated recovery codes replace the old ones
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I regenerate recovery codes with a valid code
    Then the response status should be 200
    And I should receive 10 recovery codes
    When I log out
    And I log in again with the current email and password
    And I submit the old recovery code number 1
    Then the response status should be 400
    When I submit recovery code number 1
    Then the response status should be 200

  Scenario: Disabling 2FA removes the second step
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I disable two-factor authentication with a valid code
    Then the response status should be 204
    And I should receive the email "Two-factor authentication is off for your Phrasal account"
    When I log out
    And I log in again with the current email and password
    Then the response status should be 200

  Scenario: The second step needs a first step
    When I submit two-factor code "123456"
    Then the response status should be 401

  Scenario: Too many wrong codes are rate limited
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I log out
    And I log in again with the current email and password
    And I submit 6 wrong two-factor codes
    Then the response status should be 429

  Scenario: Admin signs in with a code and edits content
    Given I am logged in as the admin
    When I log out
    And I log in again as the admin
    Then the login should ask for a second factor
    When I submit the admin two-factor code
    Then the response status should be 200
    When I create a phrasal verb with verb "E2E admin verb" and definition "Created after a 2FA login"
    Then the response status should be 201
