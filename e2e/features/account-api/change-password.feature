@api
Feature: Change password API

  Background:
    Given the API is available

  Scenario: The new password replaces the old one
    Given I am logged in as a new user
    When I change my password from "e2e-password-123" to "e2e-brand-new-password-1"
    Then the response status should be 204
    When I log out
    And I log in with the current email and password "e2e-password-123"
    Then the response status should be 401
    When I log in with the current email and password "e2e-brand-new-password-1"
    Then the response status should be 200

  Scenario: Other devices are logged out and this one stays logged in
    Given I am logged in as a new user
    And I am also logged in on another device
    When I change my password from "e2e-password-123" to "e2e-brand-new-password-1"
    Then the response status should be 204
    When I request the profile on the other device
    Then the response status should be 401
    When I request my profile
    Then the response status should be 200

  Scenario: A password changed notice is sent
    Given I am logged in as a new user
    When I change my password from "e2e-password-123" to "e2e-brand-new-password-1"
    Then the response status should be 204
    And I should receive a password changed notice

  Scenario: A wrong current password is rejected
    Given I am logged in as a new user
    When I change my password with the wrong current password
    Then the response status should be 400

  Scenario: A weak new password is rejected
    Given I am logged in as a new user
    When I change my password from "e2e-password-123" to "short"
    Then the response status should be 400
    And the new password error should mention "at least 10"

  Scenario: An anonymous caller is rejected
    When I change my password from "e2e-password-123" to "e2e-brand-new-password-1"
    Then the response status should be 401
