@frontend
Feature: Navigation menu
  The navigation menu provides persistent navigation across all non-home pages

  Background:
    Given the browser is open

  Scenario: Navigation menu is not visible on home page
    When I navigate to the homepage
    Then I should not see the navigation menu

  Scenario: Navigation menu is visible on phrasal verbs page
    When I navigate to the phrasal verbs hub
    Then I should see the navigation menu
    And the navigation menu should contain a home link

  Scenario: Phrasal Verbs dropdown shows sub-items
    When I navigate to the phrasal verbs hub
    And I click the Phrasal Verbs dropdown
    Then I should see a dropdown with links "Quiz", "List", "Particles"

  Scenario: Grammar dropdown shows sub-items
    When I navigate to the grammar hub
    And I click the Grammar dropdown
    Then I should see a dropdown with link "I wish / If only"

  Scenario: Navigating via the menu to the quiz page
    When I navigate to the phrasal verbs hub
    And I click the Phrasal Verbs dropdown
    And I click the dropdown link "Quiz" and wait for the quiz
    Then I should see a quiz input field

  Scenario: Navigating via the menu to the grammar quiz
    When I navigate to the phrasal verbs hub
    And I click the Grammar dropdown
    And I click the dropdown link "I wish / If only" and wait for the quiz
    Then I should see a quiz input field

  Scenario: Home link in navigation menu leads to home page
    When I navigate to the phrasal verbs hub
    And I click the home link in the navigation menu
    Then I should see the heading "English Tutorial"

  Scenario: Theme toggle and expand-collapse buttons do not overlap on verb list
    When I navigate to the verb list page
    Then the theme toggle and expand-collapse buttons should not overlap
