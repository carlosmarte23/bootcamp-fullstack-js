# Module 04: Express

Coming from the previous part of Module 04 where we built the server using just Node’s native http module I can understand better how a server works but building it "raw" becomes a nightmare to maintain pretty fast (manual routing, parsing URLs, handling streams, etc).

This is where Express comes in. It’s a minimal framework for Node that saves us from writing so much boilerplate code.

## Why is it better? (Pain points vs Vanilla Node):

- No more giant if/else blocks just to match routes.
- We don't have to parse the body or query strings manually anymore.
- Much easier to reuse logic across different routes.
- Response handling (JSON, status codes) is way cleaner.

TL;DR: Express sits on top of the Node server but gives us a much friendlier API to:

- Define routes.
- Add middleware (reusable functions, this is key).
- Handle errors in one spot.
- Send responses without jumping through hoops.

Now it's time to slowly start building our API that we have been using for the frontend of the project. Previously it was made by MiduDev now we will do it by ourselves.

## What we did:

- Create a new Express app.
- Defined PORT and constants in .env and config.js.
- Defined a health endpoint and jobs REST API endpoints.
- Added pagination with limit and offset query parameters.
- Added a new route to get a job by its id.

## MVC architecture:

We'll be using the Model-View-Controller architecture to separate the logic of our API. This is a very common pattern when building APIs. The main idea is to separate the logic of our API from the presentation layer.

- The Model is the data, this is where we store our data (JSON, Database, etc).
- The View (Routes in our case) is where we define the API endpoints and associate them with the corresponding controller.
- The Controller is the logic of our API, this is where we'll extract the data from the request (query parameters, body, etc) and send the response.

## Load data from JSON file:

For now, we load jobs data from a local JSON file.

Because we already migrated to MVC, the main changes happen in the **model**. Controllers and routes mostly stay the same, with small adjustments to align request/response fields and validations with the real JSON structure.

Since we have the data in a JSON file, I decided to import it once when the server starts (ESM), then create an in-memory copy to mutate the data.

### Notes:

- Since we don’t have persistence, changes made through POST/PATCH/DELETE are **in-memory only.**

## Next steps:

- Modify the source to get jobs from a database instead of in-memory storage.
