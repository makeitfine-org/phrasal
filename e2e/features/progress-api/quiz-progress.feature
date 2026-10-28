@api
Feature: Quiz progress API

  Background:
    Given the API is available

  Scenario: Anonymous visitor cannot read progress
    When I request my "phrasal-verbs" quiz progress
    Then the response status should be 401

  Scenario: Nothing is stored before the first save
    Given I am logged in as a new user
    When I request my "phrasal-verbs" quiz progress
    Then the response status should be 404

  Scenario: Save and read back progress
    Given I am logged in as a new user
    When I save my "phrasal-verbs" quiz progress with 3 excluded items
    Then the response status should be 200
    When I request my "phrasal-verbs" quiz progress
    Then the response status should be 200
    And the quiz progress should have 3 excluded items
    And the quiz progress version should be 0

  Scenario: Saving again replaces the state and bumps the version
    Given I am logged in as a new user
    When I save my "phrasal-verbs" quiz progress with 3 excluded items
    And I save my "phrasal-verbs" quiz progress with 1 excluded items
    Then the response status should be 200
    And the quiz progress should have 1 excluded items
    And the quiz progress version should be 1

  Scenario: Another user cannot see my progress
    Given I am logged in as a new user
    When I save my "phrasal-verbs" quiz progress with 3 excluded items
    And I am logged in as a new user
    And I request my "phrasal-verbs" quiz progress
    Then the response status should be 404

  Scenario: An unknown quiz key is rejected
    Given I am logged in as a new user
    When I request my "unknown-quiz" quiz progress
    Then the response status should be 400

  Scenario: A state that is not an object is rejected
    Given I am logged in as a new user
    When I save a raw quiz progress body '{"state":[1,2]}' for "phrasal-verbs"
    Then the response status should be 400

  Scenario: An oversized state is rejected
    Given I am logged in as a new user
    When I save an oversized "phrasal-verbs" quiz progress
    Then the response status should be 400
