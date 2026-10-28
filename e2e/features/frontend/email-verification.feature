@frontend
Feature: Email verification in the browser

  Background:
    Given the browser is open

  Scenario: Signing up, opening the emailed link and logging in
    When I submit the sign-up form with a new email
    Then I should see the check-your-inbox message
    When I open the verification link from my email in the browser
    Then I should see that my email is confirmed
    When I log in through the form
    Then the user menu should show my email

  Scenario: A made-up link is rejected and offers a new one
    When I open the verification page with the token "not-a-real-token"
    Then I should see the verification state "invalid"
    And I should see the resend form

  Scenario: The verification page without a token offers a new link
    When I open the verification page without a token
    Then I should see the verification state "incomplete"
    And I should see the resend form

  Scenario: Asking for another email from the check-your-inbox panel
    When I submit the sign-up form with a new email
    And I ask for a new verification email
    Then I should see the resend confirmation
    And I should have received 2 verification emails

  Scenario: An unverified user sees a resend option on the login page
    Given an unverified user exists
    When I try to log in through the form
    Then I should see the email-not-verified message with a resend option
