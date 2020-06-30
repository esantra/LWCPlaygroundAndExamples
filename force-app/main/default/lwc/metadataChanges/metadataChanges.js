import { LightningElement, api, wire, track } from "lwc";
import getApexClassChangesRecords from "@salesforce/apex/MetaDataChangesClass.getApexClassChanges";
import getApexTriggerChangesRecords from "@salesforce/apex/MetaDataChangesClass.getApexTriggerChanges";
import getLightningComponentChangesRecords from "@salesforce/apex/MetaDataChangesClass.getLightningComponentChanges";

export default class MetadataChanges extends LightningElement {
  dvalue = "2020-01-01T00:00:00Z";
  @track recordslist = [];
  @track triggerList = [];
  @track lightningComponentsList = [];
  @track lwclist = [];
  @track error;
  columns = [
    { label: "LastModifiedDate", fieldName: "LastModifiedDate", type: "date" },
    {
      label: "Name",
      fieldName: "recordLink",
      type: "url",
      typeAttributes: { label: { fieldName: "Name" }, target: "_blank" }
    },
    {
      label: "LastModifiedBy",
      fieldName: "LastModifiedLink",
      type: "url",
      typeAttributes: {
        label: { fieldName: "LastModifiedById" },
        target: "_blank"
      }
    }
  ];

  lccolumns = [
    { label: "LastModifiedDate", fieldName: "LastModifiedDate", type: "date" },
    { label: "DeveloperName", fieldName: "DeveloperName" },
    { label: "LastModifiedById", fieldName: "LastModifiedById" }
  ];

  handleChange(event) {
    this.dvalue = new Date(event.target.value).toISOString();
  }

  @wire(getApexClassChangesRecords)
  wiredList({ error, data }) {
    if (data) {
      //log(JSON.stringify(data));
      var apexClassList = [];
      for (var i = 0; i < data.length; i++) {
        let tempRecord = Object.assign({}, data[i]);
        tempRecord.recordLink = "/" + tempRecord.Id;
        tempRecord.LastModifiedLink = "/" + tempRecord.LastModifiedById;
        apexClassList.push(tempRecord);
      }
      console.log("clickable class data returned");
      this.recordslist = apexClassList;
      this.error = undefined;
    } else if (error) {
      console.log("class error returned");
      console.log(error);
      this.error = error;
      this.recordslist = undefined;
    }
  }

  @wire(getApexTriggerChangesRecords)
  wiredListB({ error, data }) {
    if (data) {
      console.log("trigger data returned");
      this.triggerList = data;
      this.error = undefined;
    } else if (error) {
      console.log("triggers error returned");
      console.log(error);
      this.error = error;
      this.triggerList = undefined;
    }
  }

  @wire(getLightningComponentChangesRecords)
  wiredListC({ error, data }) {
    if (data) {
      console.log("lightning component data returned");
      this.lightningComponentsList = data;
      this.error = undefined;
    } else if (error) {
      console.log("lightning component error returned");
      console.log(error);
      this.error = error;
      this.lightningComponentsList = undefined;
    }
  }
}
