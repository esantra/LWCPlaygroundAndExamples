import { createElement } from "lwc";
import MetadataChanges from "c/metadataChanges";
import { registerApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";

// Import mock data to send through the wire adapter.
const mockGetRecords = require("./data/getApexClassChangesRecords.json");
// Register a test wire/apex adapter to control @wire(getRecord)
import getApexClassChangesRecords from "@salesforce/apex/MetadataChangesClass.getApexClassChanges";
const getApexClassChangesAdapter = registerApexTestWireAdapter(
  getApexClassChangesRecords
);

import getApexTriggerChangesRecords from "@salesforce/apex/MetadataChangesClass.getApexClassChanges";
const getApexTriggerChangesAdapter = registerApexTestWireAdapter(
  getApexTriggerChangesRecords
);

import getLightningComponentChangesRecords from "@salesforce/apex/MetadataChangesClass.getApexClassChanges";
const getLightningComponentChangesRecordsAdapter = registerApexTestWireAdapter(
  getLightningComponentChangesRecords
);

describe("c-metadata-changes", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("displays heading", () => {
    // Create element
    const element = createElement("c-metadata-changes", {
      is: MetadataChanges
    });
    document.body.appendChild(element);

    // Verify displayed header message
    const div = element.shadowRoot.querySelector("div");
    expect(div.textContent).toBe("Please input the starting date.");
  });

  test("Apex Class data table is populated.", async () => {
    const element = createElement("c-metadata-changes", {
      is: MetadataChanges
    });
    document.body.appendChild(element);
    getApexClassChangesAdapter.emit(mockGetRecords);
    await Promise.resolve();

    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    console.log(mockGetRecords[0].Name);
    const nameField = mockGetRecords[0].Name;
    expect(datatable).not.toBe(null);
    expect(datatable.data.length).toBe(mockGetRecords.length);
  });
});
