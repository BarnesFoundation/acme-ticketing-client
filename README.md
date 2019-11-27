# ACME Ticketing Client
This is a Node JS client for the [ACME Ticketing](https://www.acmeticketing.com/) API, built for open-source by the Barnes Foundation.  

It is very much in the process of being built, but general usage, once available, should be something like this

```ts
import { ACMETicketingClient, TicketingFunctions, EventFunctions } from  '../src/index';

// Get credentials from .env
const b2cTenantId = '<Your tenant id>';
const apiKey = '<Your API key>';
const apiRootUrl = '<Your Sandbox URL. Otherwise, defaults to the production API URL>';

// Setup client
const ac = new ACMETicketingClient({ b2cTenantId, apiKey, apiRootUrl });

// Get all events, since we supplied no filter criteria
const allMyEvents = await EventFunctions.listEvents();
```

As you can tell from the above, you can import only the modules you need, which makes accessing functions via these modules much easier. 

