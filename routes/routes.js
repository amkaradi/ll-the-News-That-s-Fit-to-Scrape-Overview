const request = require("request");

module.exports = function(router) {
    console.log("Successfully loaded routes");

    // HANDLE THE "/" ROUTE BEING REQUESTED BY THE USER
    router.get("/", function(req, res) {
        res.render("home");
    });

    // HANDLE THE "/NEWS" ROUTE BEING REQUESTED BY THE USER
    router.get("/news", function(req, res) {
        res.render("news");
    });

    router.get("/all", function(req, res) {
        // Find all results from the scrapedData collection in the db
        db.scrapedData.find({}, function(error, found) {
            // Throw any errors to the console
            if (error) {
                console.log(error);
            }
            // If there are no errors, send the data to the browser as a json
            else {
                res.json(found);
            };
        });
    });

    router.get("/scrape", function(req, res) {
        // Make a request for the news section of chicago it events
        request("http://chicagotechevents.com/", function(error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            // For each element with a "title" class
            $(".title").each(function(i, element) {
                // Save the text of each link enclosed in the current element
                var title = $(this).children("a").text();
                // Save the href value of each link enclosed in the current element
                var link = $(this).children("a").attr("href");

                // If this title element had both a title and a link
                if (title && link) {
                    // Save the data in the scrapedData db
                    db.scrapedData.save({
                            title: title,
                            link: link
                        },
                        function(error, saved) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(saved);
                            }
                        });
                };
            });
        });

        // This will send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
    });

};