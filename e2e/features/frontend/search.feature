@frontend
Feature: Search functionality with partial and fuzzy matching

  Background:
    Given the browser is open

  Scenario: Open search modal on verb list page
    When I navigate to the verb list page
    And I click the search button
    Then I should see the search modal
    And I should see the search input

  Scenario: Search by exact verb name
    When I navigate to the verb list page
    And I click the search button
    And I type "get off" in the search input
    Then I should see search results
    And I should see a search result containing "Get"

  Scenario: Search by partial word in definition
    When I navigate to the verb list page
    And I click the search button
    And I type "postpone" in the search input
    Then I should see search results

  Scenario: Search with typo finds fuzzy match
    When I navigate to the verb list page
    And I click the search button
    And I type "postponn" in the search input
    Then I should see search results

  Scenario: Search with no results shows empty state
    When I navigate to the verb list page
    And I click the search button
    And I type "zzznomatchxyz" in the search input
    Then I should see "No matches found" in the search modal

  Scenario: Close search modal with Escape key
    When I navigate to the verb list page
    And I click the search button
    And I press Escape
    Then the search modal should be closed

  Scenario: Select search result navigates to verb detail
    When I navigate to the verb list page
    And I click the search button
    And I type "get off" in the search input
    And I click the first search result
    Then I should see the heading "Get"
