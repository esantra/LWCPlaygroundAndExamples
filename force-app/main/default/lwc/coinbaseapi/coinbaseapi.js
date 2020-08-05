import { LightningElement, track } from "lwc";

const fromoptions = [
  { label: "BTC", value: "BTC" },
  { label: "XTZ", value: "XTZ" },
  { label: "LINK", value: "LINK" },
  { label: "ATOM", value: "ATOM" },
  { label: "ALGO", value: "ALGO" },
  { label: "EOS", value: "EOS" }
];

const tooptions = [{ label: "USD", value: "USD" }];

export default class HTTPCalloutInLWC extends LightningElement {
  @track fromCurrencyValue;
  @track toCurrencyValue;
  @track options = fromoptions;
  @track toCurrencyOptions = tooptions;
  @track conversionData;
  @track url;

  handleFromCurrencyChange(event) {
    this.fromCurrencyValue = event.detail.value;
  }

  handleToCurrencyChange(event) {
    this.toCurrencyValue = event.detail.value;
    this.url =
      "https://api.coinbase.com/v2/prices/" +
      this.fromCurrencyValue +
      "-" +
      this.toCurrencyValue +
      "/buy";
  }

  handleCurrencyConversion() {
    fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "OAuth abd90df5f27a7b170cd775abf89d632b350b7c1c9d53e08b340cd9832ce52c2c"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(this.url);
        //{"data":{"base":"BTC","currency":"USD","amount":"11308.88"}}
        let objData = {
          base: "",
          currency: "",
          amount: ""
        };

        window.console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        let exchangeData = jsonResponse["data"];

        // adding data object
        objData.base = exchangeData["base"];
        objData.currency = exchangeData["currency"];
        objData.amount = exchangeData["amount"];

        // adding data object to show in UI
        this.conversionData = objData;
      })
      .catch((error) => {
        window.console.log("callout error ===> " + JSON.stringify(error));
      });
  }
}
