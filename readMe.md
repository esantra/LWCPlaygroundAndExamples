How to communicate with LWC:

From Child to Parent(s)
1. Create and dispatch an event (name: dispatchEvent)
2. Create a handler where you need it (handler name: ondispatchevent)
3. Handle the communcation on the method used in the handler like ondispatchevent={handlemethod}
4. If you need it to bubble up, use bubbles:true
