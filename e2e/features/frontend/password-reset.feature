@frontend
Feature: Password reset in the browser

  Background:
    Given the browser is open

  Scenario: Forgot password, emailed link, new password, log in
    Given a registered user exists
    When I click the forgot-password link on the login page
    Then the forgot-password email field should contain my email
    When I request a password reset through the form
    Then I should see the forgot-password check-your-inbox message
    When I open the password reset link from my email in the browser
    And I set the new password "e2e-other-password-456" through the form
    Then I should see the reset state "success"
    When I log in through the form with the new password "e2e-other-password-456"
    Then the user menu should show my email

  Scenario: A made-up reset link is rejected and offers a new one
    When I open the reset page with the token "not-a-real-token"
    And I set the new password "e2e-other-password-456" through the form
    Then I should see the reset state "invalid"
    And I should see the request-a-new-link option

  Scenario: The reset page without a token offers a new link
    When I open the reset page without a token
    Then I should see the reset state "incomplete"
    And I should see the request-a-new-link option

  Scenario: A mismatched confirmation is rejected in the form
    Given a registered user exists
    When I request a password reset
    And I open the password reset link from my email in the browser
    And I set the new password "e2e-other-password-456" with the confirmation "e2e-another-password-789" through the form
    Then I should see the reset confirmation field error
    And I should see the reset state "form"

  Scenario: A password containing the email is rejected by the server and the same link still works
    Given a registered user exists
    When I request a password reset
    And I open the password reset link from my email in the browser
    And I set the new password "x-<email>-x" through the form
    Then I should see the reset password field error mentioning "email"
    And I should see the reset state "form"
    When I set the new password "e2e-other-password-456" through the form
    Then I should see the reset state "success"

  Scenario: Resetting in a logged-in browser logs it out
    When I sign up through the form with a new email
    And I request a password reset
    And I open the password reset link from my email in the browser
    And I set the new password "e2e-other-password-456" through the form
    Then I should see the reset state "success"
    And I should see the "Log in" link in the navigation
