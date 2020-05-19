# ACME Ticketing Client
This is a Node JS client for the [ACME Ticketing](https://www.acmeticketing.com/) API, built for open-source by the Barnes Foundation.  

General usage is the following. Once you've initialized the client, you can use your desired modules as needed.

```ts
import { ACMETicketingClient, TicketingFunctions, EventFunctions } from  '../src/index';

// Get credentials from .env
const b2cTenantId = '<Your tenant id>';
const apiKey = '<Your API key>';
const apiRootUrl = '<Your Sandbox URL. Otherwise, defaults to the production API URL>';

// Setup client - initializes the client for usage across your app
new ACMETicketingClient({ b2cTenantId, apiKey, apiRootUrl });

// Get all events, since we supplied no filter criteria
const allMyEvents = await EventFunctions.listEvents();
```

As you can tell from the above, you're able to import only the modules you need, which makes accessing functions via these modules much easier, straightforward, and simple for encapsulating logic in your applications. 

100% of modules have included [TSDoc](https://github.com/microsoft/tsdoc) so you can easily see method signatures, giving you helpful information like what parameters a method accepts, it's purpose, what it returns, etc.

You can see example usage of several of the modules over in the testing file [test.ts](https://github.com/BarnesFoundation/acme-ticketing-client/blob/master/tests/test.ts).
