"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_page_1 = require("./page-objects/events-page");
describe('Events', function () {
    var page;
    beforeEach(function () {
        page = new events_page_1.EventsPage();
    });
    it('should display the Page Heading Text', function () {
        page.navigateTo();
        page.getPageHeadingText().then(function (text) {
            expect(text).toEqual('Upcoming Angular 2 Events');
        });
    });
    it('should display the first event heading text', function () {
        page.navigateTo();
        var eventHeading = page.getEventHeading(page.getFirstEvent());
        eventHeading.then(function (text) {
            expect(text).toEqual('ANGULAR CONNECT');
        });
    });
});
//# sourceMappingURL=events.e2e-spec.js.map