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

        beforeEach(function() {
            body = document.body;
            menuIconLink = document.querySelector('a[class="menu-icon-link"]');
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
        it('toggle visibility when click is triggered', function() {
            // does the menu display when clicked?
            menuIconLink.click();
            expect(body.className).not.toContain('menu-hidden');
            // does it hide when clicked again?
            menuIconLink.click();
            expect(body.className).toContain('menu-hidden');
        });
    });

    /* 3. Test Suite: Initial Entries
     * This suite is all about the async load of
     * the initial feed entries in our application.
     */
    describe('Initial Entries', function() {
        var container = document.querySelector('.feed');

        // wait till asynchronous function finished
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* 1. Test
         * Ensure that there is at least a single .entry
         * element within the .feed container when the loadFeed
         * function is called and completes its work.
         */
        it('contains at least one entry', function(done) {
            var entry = container.querySelector('.entry');

            expect(entry).not.toBe(null);
            done();
        });
    });

    /* 4. Test Suite: New Feed Selection
     * This suite is all about the async load of
     * new feeds in our application.
     */
    describe('New Feed Selection', function() {
        var container = document.querySelector('.feed');
        var entryLink;

        // wait till asynchronous funciton finished
        beforeEach(function(done) {
            // loading first feed
            loadFeed(0, function() {
                entryLink = container.querySelector('.entry-link');
                done();
            });
        });

        /* 1. Test
         * Ensures that the content actually changes
         * when a new feed is loaded by the loadFeed function.
         */
        it('changed content', function(done) {
            // loading second feed
            loadFeed(1, function() {
                var newEntryLink = container.querySelector('.entry-link');

                // content changed?
                expect(entryLink.href).not.toBe(newEntryLink.href);
                done();
            });
        });
    });
}());
