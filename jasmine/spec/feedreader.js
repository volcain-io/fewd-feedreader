/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* 1. Test Suite: RSS Feeds
     * This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* 1. Test:
         * It tests to make sure that the allFeeds variable has
         * been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 2. Test:
         * It ensures that each allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are valid', function() {
            allFeeds.forEach(function(feed) {
                /* URL throws an DOMException
                 * if the provided string is NOT a valid URL
                 * and the test fails
                 */
                thisURL = new URL(feed.url);
                // no exception thrown, so both URLs should match
                expect(feed.url).toBe(thisURL.href);
            });
        });


        /* 3. Test:
         * It ensures that each allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('names are set and not empty', function() {
            allFeeds.forEach(function(feed) {
                // be a string
                expect(feed.name).toEqual(jasmine.any(String));
                // not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* 2. Test Suite: The menu
     * This suite is all about the menu in our application.
     */
    describe('The menu', function() {
        var body;
        var menuIconLink;

        beforeEach(function(done) {
            body = document.body;
            menuIconLink = document.querySelector('a[class="menu-icon-link"]');
            done();
        });

        /* 1. Test
         * It ensures the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect(body.className).toContain('menu-hidden');
        });

         /* 2. Test
          * It ensures the menu changes visibility
          * when the menu icon is clicked.
          * This test have two expectations:
          * does the menu display when clicked?
          * does it hide when clicked again?
          */
        it('toggle visibility when click is triggered', function(done) {
            // does the menu display when clicked?
            menuIconLink.click();
            expect(body.className).not.toContain('menu-hidden');
            setTimeout(function() {
                // does it hide when clicked again?
                menuIconLink.click();
                expect(body.className).toContain('menu-hidden');
                done();
            }, 250);
        });
    });

    /* 3. Test Suite: Initial Entries
     * This suite is all about the async load of
     * the initial feed entries in our application.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            done();
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    });

    /* 4. Test Suite: New Feed Selection
     * This suite is all about the async load of
     * new feeds in our application.
     */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    });
}());
