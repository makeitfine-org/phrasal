@frontend
Feature: Quiz progress follows the account

  Background:
    Given the browser is open

  Scenario: Progress survives clearing the browser storage
    When I sign up through the form with a new email
    And I navigate to the phrasal verbs quiz
    And I exclude the current quiz item and wait for the progress save
    And I clear the browser storage and reload
    Then the excluded count should be 1

  Scenario: The first sign-up uploads the anonymous progress
    When I navigate to the phrasal verbs quiz
    And I exclude the current quiz item
    And I sign up through the form with a new email
    And I navigate to the phrasal verbs quiz
    Then my saved "phrasal-verbs" progress should have 1 excluded items

  Scenario: Another account does not see my progress and logging back in restores it
    When I sign up through the form with a new email
    And I remember this account as "A"
    And I navigate to the phrasal verbs quiz
    And I exclude the current quiz item and wait for the progress save
    And I log out through the user menu
    And I navigate to the phrasal verbs quiz
    Then the excluded count should be 0
    When I sign up through the form with a new email
    And I navigate to the phrasal verbs quiz
    Then the excluded count should be 0
    When I log out through the user menu
    And I log in as the remembered account "A"
    And I navigate to the phrasal verbs quiz
    Then the excluded count should be 1

  Scenario: An anonymous visitor sends no progress requests
    Given I record progress requests
    When I navigate to the phrasal verbs quiz
    And I exclude the current quiz item
    Then no quiz progress request should have been sent
