How to communicate with LWC:

From Child to Parent(s)
1. Create and dispatch an event (name: dispatchEvent)
2. Create a handler where you need it (handler name: ondispatchevent)
3. Handle the communcation on the method used in the handler like ondispatchevent={handlemethod}
4. If you need it to bubble up, use bubbles:true

From Parent to Child
1. The @api decorator in the child component exposes a property, making it public, so that the parent component can update it.
2. The @api decorator in the child component exposes a function, making it public, so that the parent component can call it.
