Feature: Button
    So that I can automate web applications with buttons,
    I want to have a button element

    Scenario: Exist and Not Exist
        When I am viewing the Button Test page
        Then a SignUp button should exist
        But a Foo button should not exist

    Scenario: Enabled and Disabled
        When I am viewing the Button Test page
        Then the SignUp button should be enabled
        But a DeleteDatabase button should be disabled

    @focus
    Scenario: Click
        Given I am viewing the Button Test page
        When I click the SignUp button
        Then I should see a submit count of 1

    Scenario: Clicking Twice
        Given I am viewing the Button Test page
        When I click the SignUp button
        And I click the SignUp button
        Then I should see a submit count of 2
