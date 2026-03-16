<template>
  <form id="payment-form" @submit.prevent="submit">
    <div id="payment-element">
      <!--Stripe.js injects the Payment Element-->
    </div>
    <div id="payment-message" class="hidden"></div>
  </form>
</template>

<script>
import {mapMutations} from "vuex";
const secret = window.location.hostname === 'myfridgehk.com' || window.location.hostname === 'student.myfridgehk.com' ? 'pk_live_Sr5ht6m4JXknPl1WND5s0ntD' : 'pk_test_JsJD8ERDBNBpWkgOT7jxHETt'
const stripe = Stripe(secret)

export default {
  name : "Stripe",
  mounted () {
  },
  created () {

  },
  data    : () => ({
    stripe,
    elements : null,
    order    : null
  }),
  methods : {
    ...mapMutations(['pushSnackbarMessages']),

    // Fetches a payment intent and captures the client secret
    async initialize (orderPlaced) {
      this.order = orderPlaced.order
      const appearance = {
        theme  : 'stripe',
        labels : 'floating',
      }
      const locale = this.$i18n.locale === 'zh' ? 'zh-HK' : 'en'
      this.elements = this.stripe.elements({ appearance, clientSecret : orderPlaced.clientSecret, locale });

      const paymentElement = this.elements.create("payment");
      paymentElement.mount("#payment-element");
    },

    async checkPaymentRequestButton () {
      const paymentRequest = this.stripe.paymentRequest({
        country  : 'HK',
        currency : 'hkd',
        total    : { label : 'test request', amount : 1000 },
      });

      return paymentRequest.canMakePayment()
    },

    async submit () {
      const result = await this.stripe.confirmPayment({
        elements : this.elements,
        redirect : 'if_required'
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (result.error) {
        const error = result.error
        if (error.type === "card_error" || error.type === "validation_error") {
          // this.pushSnackbarMessages('付款失敗，信用卡出錯或驗證失敗，錯誤代碼：' + error.code)
        } else {
          this.pushSnackbarMessages('付款失敗，錯誤代碼：' + error.code)
        }

        return null
      }

      return result
    },


    // ------- UI helpers -------
    showMessage (messageText) {
      const messageContainer = document.querySelector("#payment-message");

      messageContainer.classList.remove("hidden");
      messageContainer.textContent = messageText;

      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
      }, 4000);
    },


    // Fetches the payment intent status after payment submission
    async checkStatus () {
      const { paymentIntent } = await this.stripe.retrievePaymentIntent(this.order.payment.paymentRef);

      switch (paymentIntent.status) {
        case "succeeded":
          this.showMessage("Payment succeeded!");
          break;
        case "processing":
          this.showMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          this.showMessage("Your payment was not successful, please try again.");
          break;
        default:
          this.showMessage("Something went wrong.");
          break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
#payment-form {
  width: 100%;
  padding: 20px;
  @media(max-width: 500px) {
    position: fixed;
    left: 0;
  }
}
</style>
