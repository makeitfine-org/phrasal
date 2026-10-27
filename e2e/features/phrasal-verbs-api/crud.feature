@api
Feature: Phrasal Verbs API CRUD

  Background:
    Given the API is available

  Scenario: List all phrasal verbs
    When I request GET "/api/v1/phrasal-verbs?size=5"
    Then the response status should be 200
    And the response should contain a paginated list

  Scenario: Get a single phrasal verb
    When I request GET "/api/v1/phrasal-verbs/1"
    Then the response status should be 200
    And the response should contain "verb"

  Scenario: Anonymous visitor cannot create a phrasal verb
    When I create a phrasal verb with verb "Test out" and definition "To test something"
    Then the response status should be 401

  Scenario: Return 404 for non-existent verb
    When I request GET "/api/v1/phrasal-verbs/99999"
    Then the response status should be 404
