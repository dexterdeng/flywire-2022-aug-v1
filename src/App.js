import { useState } from "react";
import { configurations } from "./configurations";
import "./styles.css";

export default function App() {
  const [currency, setCurrency] = useState("sg");

  const paymenHandler = () => {
    const config = {
      ...configurations[currency],

      // >0 for Seed Payment; 0 for Zero-Value Tokenization
      amount: 100,
      recurringType: "tokenization",

      // Display payer and custom field input boxes
      requestPayerInfo: true,
      requestRecipientInfo: false,

      firstName: "John",
      lastName: "Doe",
      email: "john.doe@flywire.com",
      phone: "+44 1234 567 890",
      address: "1753 Red Maple Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90042",
      country: "US",

      // Pass in partial custom field information (missing parameters can
      // alternatively be omitted rather than included with empty or null
      // values)
      recipientFields: {
        airhost_client_id: "AHT",
        airhost_transaction_id: "payment-uuid"
      },

      // Recommended (not required) validation error handler
      onInvalidInput: function (errors) {
        errors.forEach(function (error) {
          alert(error.msg);
        });
      },

      onCompleteCallback: function (args) {
        alert(args);
      },


      nonce: "REF1234",
      returnUrl: "https://httpbin.org/get",
      // Enable payment status notification callbacks
      callbackId: "REF1234",
      callbackUrl: "https://api2-stage.airhost.co/api/one/pms/flywire_notifications.json",
      callbackVersion: "2"
    };

    var modal = window.FlywirePayment.initiate(config);
    modal.render();
  };

  const changeHandler = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="App">
      <div className="locale">
        <label>locale and currency:</label>
        <select onChange={changeHandler}>
          <option value="sg">SG</option>
          <option value="jp">JP</option>
        </select>
      </div>
      <button className="button" onClick={paymenHandler}>
        Display Flywire Payment Modal
      </button>
    </div>
  );
}
