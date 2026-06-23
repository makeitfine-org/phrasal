@frontend
Feature: Frontend Quiz Integration

  Background:
    Given the browser is open

  Scenario: Homepage loads and displays navigation
    When I navigate to the homepage
    Then I should see the heading "English Tutorial"
    And I should see a link to "Phrasal Verbs"
    And I should see a link to "Grammar"

  Scenario: Phrasal verb quiz loads data from backend
    When I navigate to the phrasal verbs quiz
    Then I should see the heading "Quiz Phrasal Verbs"
    And I should see a quiz input field

  Scenario: Grammar quiz loads data from backend
    When I navigate to the grammar quiz
    Then I should see the heading "I wish / If only"
    And I should see a quiz input field
