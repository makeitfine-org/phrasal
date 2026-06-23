@frontend
Feature: Verb List and Detail Pages

  Background:
    Given the browser is open

  Scenario: Verb list page loads verbs from backend
    When I navigate to the verb list page
    Then I should see the heading "Phrasal Verbs List"
    And I should see at least 10 verb cards

  Scenario: Verb list shows verb labels alphabetically
    When I navigate to the verb list page
    Then I should see a verb card for "Act"
    And I should see a verb card for "Get"
    And I should see a verb card for "Zip"

  Scenario: Verb detail page loads from backend
    When I navigate to the verb detail page for "get"
    Then I should see the heading "Get"
    And I should see at least one particle section

  Scenario: Navigate from verb list to verb detail
    When I navigate to the verb list page
    And I click on the verb card for "Act"
    Then I should see the heading "Act"
    And I should see at least one particle section
