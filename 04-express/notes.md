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

Now its time to slowly start building our API that we have been using for the frontend of the project. Previously it was made by MiduDev now we will do it by ourselves.
