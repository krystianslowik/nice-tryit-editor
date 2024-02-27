import React, { useEffect, useState } from "react";
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Tooltip, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Ensure this import is correctly placed in your project structure

const Navbar = ({ onSnippetInsert, isMobile, onChangeView, onClear }) => {
  const [selectedSnippet, setSelectedSnippet] = useState("");

  const snippets = [
    {
      key: "Trustbadge 5",
      value: `<script async
    data-desktop-y-offset="0"
    data-mobile-y-offset="0"
    data-desktop-disable-reviews="false"
    data-desktop-enable-custom="false"
    data-desktop-position="right"
    data-desktop-custom-opening-direction="topright"
    data-desktop-custom-width="150"
    data-desktop-enable-fadeout="false"
    data-disable-mobile="false"
    data-disable-trustbadge="false"
    data-mobile-custom-width="150"
    data-mobile-custom-opening-direction="topright"
    data-mobile-disable-reviews="false"
    data-mobile-enable-custom="false"
    data-mobile-position="left"
    data-mobile-enable-topbar="false"
    data-color-scheme="light"
    charset="UTF-8"
    src="//widgets.trustedshops.com/js/XA2A8D35838AF5F63E5EB0E05847B1CB8.js">
  </script>`,
    },
    {
      key: "Trustbadge 4",
      value: `<script type="text/javascript">
    (function () {
      var _tsid = 'XA2A8D35838AF5F63E5EB0E05847B1CB8';
      _tsConfig = {
        'yOffset': '0', /* offset from page bottom */
        'variant': 'reviews', /* default, reviews, custom, custom_reviews */
        'customElementId': '', /* required for variants custom and custom_reviews */
        'trustcardDirection': '', /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */
        'customBadgeWidth': '', /* for custom variants: 40 - 90 (in pixels) */
        'customBadgeHeight': '', /* for custom variants: 40 - 90 (in pixels) */
        'disableResponsive': 'false', /* deactivate responsive behaviour */
        'disableTrustbadge': 'false' /* deactivate trustbadge */
      };
      var _ts = document.createElement('script');
      _ts.type = 'text/javascript';
      _ts.charset = 'utf-8';
      _ts.async = true;
      _ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js';
      var __ts = document.getElementsByTagName('script')[0];
      __ts.parentNode.insertBefore(_ts, __ts);
    })();
  </script>`,
    },
    {
      key: "Checkout SR",
      value: `<div id="trustedShopsCheckout" style="display: none;">
    <span id="tsCheckoutOrderNr">order_variable</span>
    <span id="tsCheckoutBuyerEmail">cs-testorder@trustedshops.com</span>
    <span id="tsCheckoutOrderAmount">1</span>
    <span id="tsCheckoutOrderCurrency">EUR</span>
    <span id="tsCheckoutOrderPaymentType">COD</span>
    <span id="tsCheckoutOrderEstDeliveryDate">10.12.2023</span>
    </div>`,
    },
    {
      key: "Checkout PR",
      value: `<div id="trustedShopsCheckout" style="display: none;">
    <span id="tsCheckoutOrderNr">1234_4321</span>
    <span id="tsCheckoutBuyerEmail">cs-testorder@trustedshops.com</span>
    <span id="tsCheckoutOrderAmount">amount_variable</span>
    <span id="tsCheckoutOrderCurrency">currency_variable</span>
    <span id="tsCheckoutOrderPaymentType">paymentMethod_variable</span>
    <span id="tsCheckoutOrderEstDeliveryDate">10.12.2023</span>
    
   <!-- product reviews start -->
    <!-- for each product in the basket, full set of data is required -->
    <span class="tsCheckoutProductItem">
    <span class="tsCheckoutProductUrl">https://trustedshops.com</span>
    <span class="tsCheckoutProductImageUrl">https://trustedshops.com</span>
    <span class="tsCheckoutProductName">Some Product Name</span>
    <span class="tsCheckoutProductSKU">1234</span>
    <span class="tsCheckoutProductGTIN">333333333333</span>
    <span class="tsCheckoutProductMPN">SomeMPN</span>
    <span class="tsCheckoutProductBrand">SomeBRAND</span>
    </span>
    <!-- product reviews end -->
    </div>`,
    },
    {
      key: "Trustbadge 5 + Chechout SR",
      value: `<script async
  data-desktop-y-offset="0"
  data-mobile-y-offset="0"
  data-desktop-disable-reviews="false"
  data-desktop-enable-custom="false"
  data-desktop-position="right"
  data-desktop-custom-opening-direction="topright"
  data-desktop-custom-width="150"
  data-desktop-enable-fadeout="false"
  data-disable-mobile="false"
  data-disable-trustbadge="false"
  data-mobile-custom-width="150"
  data-mobile-custom-opening-direction="topright"
  data-mobile-disable-reviews="false"
  data-mobile-enable-custom="false"
  data-mobile-position="left"
  data-mobile-enable-topbar="false"
  data-color-scheme="light"
  charset="UTF-8"
  src="//widgets.trustedshops.com/js/XA2A8D35838AF5F63E5EB0E05847B1CB8.js">
</script>
<div id="trustedShopsCheckout" style="display: none;">
    <span id="tsCheckoutOrderNr">order_variable</span>
    <span id="tsCheckoutBuyerEmail">cs-testorder@trustedshops.com</span>
    <span id="tsCheckoutOrderAmount">1</span>
    <span id="tsCheckoutOrderCurrency">EUR</span>
    <span id="tsCheckoutOrderPaymentType">COD</span>
    <span id="tsCheckoutOrderEstDeliveryDate">10.12.2023</span>
    </div>
`,
    },
    {
      key: "Trustbadge 5 + Chechout PR",
      value: `<script async
  data-desktop-y-offset="0"
  data-mobile-y-offset="0"
  data-desktop-disable-reviews="false"
  data-desktop-enable-custom="false"
  data-desktop-position="right"
  data-desktop-custom-opening-direction="topright"
  data-desktop-custom-width="150"
  data-desktop-enable-fadeout="false"
  data-disable-mobile="false"
  data-disable-trustbadge="false"
  data-mobile-custom-width="150"
  data-mobile-custom-opening-direction="topright"
  data-mobile-disable-reviews="false"
  data-mobile-enable-custom="false"
  data-mobile-position="left"
  data-mobile-enable-topbar="false"
  data-color-scheme="light"
  charset="UTF-8"
  src="//widgets.trustedshops.com/js/XA2A8D35838AF5F63E5EB0E05847B1CB8.js">
</script>
<div id="trustedShopsCheckout" style="display: none;">
    <span id="tsCheckoutOrderNr">order_variable</span>
    <span id="tsCheckoutBuyerEmail">cs-testorder@trustedshops.com</span>
    <span id="tsCheckoutOrderAmount">1</span>
    <span id="tsCheckoutOrderCurrency">EUR</span>
    <span id="tsCheckoutOrderPaymentType">COD</span>
    <span id="tsCheckoutOrderEstDeliveryDate">10.12.2023</span>
    <!-- product reviews start -->
    <!-- for each product in the basket, full set of data is required -->
    <span class="tsCheckoutProductItem">
    <span class="tsCheckoutProductUrl">https://trustedshops.com</span>
    <span class="tsCheckoutProductImageUrl">https://trustedshops.com</span>
    <span class="tsCheckoutProductName">Some Product Name</span>
    <span class="tsCheckoutProductSKU">1234</span>
    <span class="tsCheckoutProductGTIN">333333333333</span>
    <span class="tsCheckoutProductMPN">SomeMPN</span>
    <span class="tsCheckoutProductBrand">SomeBRAND</span>
    </span>
    <!-- product reviews end -->
    </div>
`,
    },
  ];
  const handleSnippetChange = (e) => setSelectedSnippet(e.target.value);
  const handleInsertClick = () => onSnippetInsert(selectedSnippet);
  const handleViewChange = () => onChangeView();

  useEffect(() => {
    snippets.length > 0 && setSelectedSnippet(snippets[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderClearTooltip = <Tooltip>Clear code editor</Tooltip>;
  const renderViewTooltip = (
    <Tooltip>Change to {isMobile ? "desktop" : "mobile"} view</Tooltip>
  );

  return (
    <div
      className="flex justify-between items-center text-white px-4 py-4"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div>
        <select
          className="bg-gray-700 p-2 rounded mr-4"
          value={selectedSnippet}
          onChange={handleSnippetChange}
        >
          {snippets.map((snippet) => (
            <option key={snippet.key} value={snippet.value}>
              {snippet.key}
            </option>
          ))}
        </select>
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleInsertClick}
        >
          Insert Snippet
        </button>
      </div>
      <div className="flex flex-row">
        <Whisper // whisper do tooltipa
          placement="bottom"
          trigger="hover"
          speaker={renderViewTooltip}
          enterable
        >
          <div
            onClick={handleViewChange}
            className={`bg-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 w-12 p-2 mx-2 rounded-md cursor-pointer`}
          >
            {isMobile ? (
              <ComputerDesktopIcon className="text-white h-6 w-6" />
            ) : (
              <DevicePhoneMobileIcon className="text-white h-6 w-6" />
            )}
          </div>
        </Whisper>
        <Whisper
          placement="bottom"
          trigger="hover"
          speaker={renderClearTooltip}
          enterable
        >
          <div
            onClick={onClear}
            className={`bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 w-12 p-2 rounded-md cursor-pointer`}
          >
            <TrashIcon className="text-white h-6 w-6" />
          </div>
        </Whisper>
      </div>
    </div>
  );
};

export default Navbar;
