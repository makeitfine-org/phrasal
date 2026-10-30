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
    And the response should not contain "isLearned"

  Scenario: Anonymous visitor cannot create a phrasal verb
    When I create a phrasal verb with verb "Test out" and definition "To test something"
    Then the response status should be 401

  Scenario: Regular user cannot create a phrasal verb
    Given I am logged in as a new user
    When I create a phrasal verb with verb "Test out" and definition "To test something"
    Then the response status should be 403

  Scenario: Admin without two-factor cannot create a phrasal verb
    Given I am logged in as the admin without two-factor
    When I create a phrasal verb with verb "Test out" and definition "To test something"
    Then the response status should be 403

  Scenario: Admin creates a phrasal verb
    Given I am logged in as the admin
    When I create a phrasal verb with verb "E2E admin verb" and definition "Created by the admin scenario"
    Then the response status should be 201
    And the response should contain a numeric id

  Scenario: Return 404 for non-existent verb
    When I request GET "/api/v1/phrasal-verbs/99999"
    Then the response status should be 404
