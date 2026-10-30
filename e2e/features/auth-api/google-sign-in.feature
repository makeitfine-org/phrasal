@api
Feature: Google sign-in endpoints

  Scenario: The providers endpoint reports Google as enabled
    When I request the sign-in providers
    Then the response status should be 200
    And Google sign-in should be enabled

  Scenario: Starting a Google sign-in redirects to the stand-in provider
    When I start a Google sign-in
    Then I should be redirected to the Google stand-in with the app's callback URL

  Scenario: A callback without a started sign-in goes back to the login page
    When I open the Google callback without starting a sign-in
    Then I should be redirected to the login page with the error "google"
