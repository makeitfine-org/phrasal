@frontend
Feature: Sign in with Google in the browser

  Background:
    Given the browser is open

  Scenario: The login and sign-up pages offer Continue with Google
    When I open the "log in" page
    Then I should see the Google sign-in button
    When I open the "sign up" page
    Then I should see the Google sign-in button

  Scenario: A new Google user is signed in and has no password
    When I continue with Google as a new Google user
    Then the user menu should show my email
    And my account should be linked to Google without a password

  Scenario: The same Google user signs in again to the same account
    When I continue with Google as a new Google user
    And I log out through the user menu
    And I continue with Google again as the same Google user
    Then the user menu should show my email
    And there should be one account for my Google user

  Scenario: A registered user links Google and can still use the password
    Given a registered user exists
    When I continue with Google with my email
    Then the user menu should show my email
    When I log out through the user menu
    And I log in through the form
    Then the user menu should show my email

  Scenario: Google takes over an unverified registration and its password stops working
    Given an unverified user exists
    When I continue with Google with my email
    Then the user menu should show my email
    When I log out through the user menu
    And I log in through the form with password "e2e-password-123"
    Then I should see an auth error

  Scenario: An unverified Google email is refused
    When I continue with Google with an unverified email
    Then I should see the Google error "Google hasn't confirmed this email address"

  Scenario: An admin account is refused
    When I continue with Google with the admin email
    Then I should see the Google error "Admin accounts sign in with email and password"

  Scenario: A user with two-factor authentication still has to enter a code
    Given I am logged in as a new user
    And I have two-factor authentication enabled
    When I continue with Google with my email
    Then I should be on the two-factor code page
    When I enter a valid two-factor code
    Then the user menu should show my email

  Scenario: A Google-only user sets a password by email
    When I continue with Google as a new Google user
    And I ask for a link to set a password
    Then I should see the set-password check-your-inbox message
    When I open the password reset link from my email in the browser
    And I set the new password "e2e-password-123" through the form
    Then I should see the reset state "success"
    When I log in through the form with the password I just set
    Then the user menu should show my email

  Scenario: A cancelled Google sign-in shows the generic message
    When I open the Google callback with an access-denied error in the browser
    Then I should see the Google error "Google sign-in didn't finish"
