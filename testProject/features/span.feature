Feature:  Span
    So that I can automate web applications with Spans,
    I want to have a span element available

    # TODO: Create a page just for testing spans rather than using button page.
    Scenario: Reading text from the page
        When I am viewing the Button Test page
        Then I should see a submit count of 0
