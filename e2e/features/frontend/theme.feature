@frontend
Feature: Dark/light theme
  On first start the theme follows the system color scheme;
  once a theme is cached, the cached choice wins

  Scenario: First start with a dark system theme uses dark mode
    Given the browser is open with a "dark" system color scheme
    When I navigate to the homepage
    Then the page should be in "dark" mode

  Scenario: First start with a light system theme uses light mode
    Given the browser is open with a "light" system color scheme
    When I navigate to the homepage
    Then the page should be in "light" mode

  Scenario: Toggled theme persists across reloads regardless of system theme
    Given the browser is open with a "dark" system color scheme
    When I navigate to the homepage
    And I click the theme toggle
    And I reload the page
    Then the page should be in "light" mode

  Scenario: Cached theme is not overridden when the system theme changes
    Given the browser is open with a "light" system color scheme
    When I navigate to the homepage
    And the system color scheme changes to "dark"
    And I reload the page
    Then the page should be in "light" mode
