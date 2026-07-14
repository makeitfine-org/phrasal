@frontend
Feature: Skeleton Loading States
  Pages should show animated skeleton placeholders instead of "Loading..." text
  while data is being fetched from the backend.

  Background:
    Given the browser is open

  Scenario: Phrasal verb quiz shows skeleton while loading
    Given the API route "/api/v1/phrasal-verbs*" is delayed
    When I start navigating to "/phrasal-verbs/test-most-popular"
    Then I should see skeleton placeholders
    And I should not see any loading text
    When the delayed API response is released
    Then I should see the heading "Quiz Phrasal Verbs"

  Scenario: Grammar quiz shows skeleton while loading
    Given the API route "/api/v1/grammar-entries*" is delayed
    When I start navigating to "/grammar/i-wish-if-only"
    Then I should see skeleton placeholders
    And I should not see any loading text
    When the delayed API response is released
    Then I should see the heading "I wish / If only"

  Scenario: Verb list page shows skeleton while loading
    Given the API route "/api/v1/verb-details?*" is delayed
    When I start navigating to "/phrasal-verbs/list"
    Then I should see skeleton placeholders
    And I should not see any loading text
    When the delayed API response is released
    Then I should see the heading "Phrasal Verbs List"

  Scenario: Verb detail page shows skeleton while loading
    Given the API route "/api/v1/verb-details/by-verb/*" is delayed
    When I start navigating to "/phrasal-verbs/list/get"
    Then I should see skeleton placeholders
    And I should not see any loading text
    When the delayed API response is released
    Then I should see the heading "Get"

  Scenario: Skeleton transitions to real content on quiz page
    Given the API route "/api/v1/phrasal-verbs*" is delayed
    When I start navigating to "/phrasal-verbs/test-most-popular"
    Then I should see skeleton placeholders
    When the delayed API response is released
    Then I should see a quiz input field
    And skeleton placeholders should no longer be visible
