<template>
  <!--    floating cart button-->
  <div v-if="prize">
    <v-btn v-if="show" class="mx-2 prize-floating-btn" top fixed right fab dark depressed color="transparent" v-bind="$attrs">
      <v-avatar size="60" class="shake" tile>
        <v-img @click.stop="prizeDrawer = true" :src="prize.images[0].small.path"></v-img>
      </v-avatar>
      <div class="close cursor-pointer" @click.stop="show = false">
        <v-icon x-small>{{ icons.mdiClose }}</v-icon>
      </div>
    </v-btn>

    <v-dialog v-model="prizeDrawer" max-width="100%" overlay-opacity="0.9" width="500" persistent content-class="noshadow nomargin nopadding myfridge-prize">
      <v-card elevation="0" color="transparent" class="position-relative">
        <v-card-text class="px-2">
          <div class="machine-1">
            <div class="game-info">
              <div class="d-flex align-center justify-center">
                <img width="50" :src="prize.images[0].small.path" style="margin-left: -10px;"></img>
                <div class="ml-1">{{ prize.name[$i18n.locale] }}</div>
              </div>
            </div>
          </div>
          <div class="machine-2"></div>
          <div class="machine-3">
            <div class="prize-content d-flex flex-wrap justify-space-between">
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no0">
                <div class="cash red-packets" v-if="prize.items[0].type === 'cash'">
                  <span>${{ prize.items[0].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[0].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[0].product.images  && prize.items[0].product.images.length ? prize.items[0].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no1">
                <div class="cash red-packets" v-if="prize.items[1].type === 'cash'">
                  <span>${{ prize.items[1].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[1].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[1].product.images  && prize.items[1].product.images.length ? prize.items[1].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no2">
                <div class="cash red-packets" v-if="prize.items[2].type === 'cash'">
                  <span>${{ prize.items[2].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[2].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[2].product.images  && prize.items[2].product.images.length ? prize.items[2].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no7">
                <div class="cash red-packets" v-if="prize.items[7].type === 'cash'">
                  <span>${{ prize.items[7].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[7].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[7].product.images  && prize.items[7].product.images.length ? prize.items[7].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize">
                <div class="gift-btn" @click.stop="start" :style="'font-size: ' + ($i18n.locale === 'en'? '25px': '') + ';'" :class="{disabled: disabled === true}">{{ $t('open') }}</div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no3">
                <div class="cash red-packets" v-if="prize.items[3].type === 'cash'">
                  <span>${{ prize.items[3].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[3].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[3].product.images  && prize.items[3].product.images.length ? prize.items[3].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no6">
                <div class="cash red-packets" v-if="prize.items[6].type === 'cash'">
                  <span>${{ prize.items[6].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[6].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[6].product.images  && prize.items[6].product.images.length ? prize.items[6].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no5">
                <div class="cash red-packets" v-if="prize.items[5].type === 'cash'">
                  <span>${{ prize.items[5].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[5].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[5].product.images  && prize.items[5].product.images.length ? prize.items[5].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
              <div class="col-4 pa-1 py-2 pa-lg-2 pa-md-2 prize no4">
                <div class="cash red-packets" v-if="prize.items[4].type === 'cash'">
                  <span>${{ prize.items[4].amount }}</span>
                </div>
                <div class="item red-packets" v-if="prize.items[4].type === 'item'">
                      <span class="d-flex h100p w100p align-center justify-center">
                        <v-img class="w100p h100p" position="center center" contain :src="prize.items[4].product.images  && prize.items[4].product.images.length ? prize.items[4].product.images[0].small.path: ''"></v-img>
                      </span>
                </div>
              </div>
            </div>
          </div>
          <div class="machine-4"></div>
          <div class="machine-5 d-flex align-center justify-center flex-wrap" id="prize-message">
            <template v-if="message">
              <!--              <div>-->
              <!--                <v-img class="shake" cover width="40" height="40" contain :src="prize.images[0].small.path"></v-img>-->
              <!--              </div>-->
              <div>

                <div class="d-flex align-center justify-center mt-2">
                  <v-img v-if="myPrize && myPrize.item.type === 'cash'" max-width="30" class="br-10" :src="require('~/assets/images/fuk.png')" alt=""></v-img>
                  <div class="ml-1">{{ message }}</div>
                </div>
                <div class="col-12 pa-0 ma-0 text-12">({{ $t('discountUponPurchase') }})</div>
                <div class="col-12 text-12">
                  <v-btn color="indigo darken-4" dark @click="prizeDrawer = false">
                    <v-icon class="shake">{{ icons.mdiGestureTap }}</v-icon>
                    {{ $t('grabIt') }}
                  </v-btn>
                </div>
              </div>
            </template>
          </div>

          <div class="close cursor-pointer" @click.stop="prizeDrawer = false">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState}  from "vuex";
import {mdiClose, mdiGestureTap} from "@mdi/js"

export default {
  name     : "FloatingPrizeButton",
  computed : {
    ...mapState(['prize', 'cart', 'myPrize', 'user']),
    prizeDrawer : {
      ...mapState({ get : 'prizeDrawer' }),
      ...mapMutations({ set : 'togglePrizeDrawer' }),
    },
  },
  watch    : {
    async prizeDrawer (val) {
      if (val) {
        await this.openPrizeDrawer(true)
      }
    },
    async myPrize () {
      await this.openPrizeDrawer(false)
    },
  },
  methods  : {
    ...mapMutations(['togglePrizeDrawer', 'setMyPrize', 'pushSnackbarMessages', 'toggleLoginModal']),
    async openPrizeDrawer (showDrawer) {
      this.reset(0)
      const myPrize = _.cloneDeep(this.myPrize)
      const prize = this.prize
      const item = this.myPrize ? this.myPrize.item : null
      if (myPrize && item && prize) {
        if (myPrize.prizeRef === this.prize.id) {
          var searchValue = { _id : item.prizeItemId }
          var index = _.findIndex(this.prize.items, searchValue);
          if (index >= 0) {
            this.disabled = true
            const self = this
            setTimeout(function () {
              // self.addClass('.no' + index, 'showPrize')
            }, 250)
            const message = item.type === 'cash' ? '$' + item.amount + this.$t('1xredPacket') : item.product.name[this.$i18n.locale] + ' x' + item.amount + this.$t('pieces')
            this.message = `${ this.$t('receiving') } ${ message }`
          } else {
            this.disabled = false
          }
        } else {
          this.disabled = false
        }
      } else {
        this.disabled = false
      }
      if (showDrawer) {
        this.prizeDrawer = true
      }
    },

    async start () {
      if (!this.user.id) {
        this.toggleLoginModal(true)
        return false
      }
      if (!this.disabled) {
        this.disabled = true
        const draw = await this.submit()
        if (draw > -1) {
          this.reset(draw)
          const self = this
          // setTimeout(function () {
          //   self.removeClass('.prize', 'showPrize')
          // }, 245)
          this.interval = setInterval(this.play, 200);
        } else {
          this.disabled = false
        }
      }
    },

    reset (draw) {
      const self = this
      setTimeout(function () {
        self.removeClass('.prize', 'showPrize')
      }, 200)

      this.message = ''
      this.eqNum = -1;
      this.timesStop = draw + 24;
      clearInterval(this.interval);
    },

    removeClass (targetElm, className) {
      const sections = document.querySelectorAll(targetElm);
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove(className);
      }
    },

    addClass (targetElm, className) {
      const sections = document.querySelectorAll(targetElm);
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add(className);
      }
    },

    play () {
      const self = this
      self.eqNum++;
      if (self.eqNum > 7) {
        self.eqNum = 0;
      }
      let nextNo = ".no" + self.eqNum;
      self.timesRun++;
      if (self.timesRun > self.timesStop) {
        document.querySelector(nextNo).classList.add('showPrize')
        const message = self.prize.items[self.eqNum].type === 'cash' ? '$' + self.prize.items[self.eqNum].amount + self.$t('1xredPacket') : self.prize.items[self.eqNum].product.name[self.$i18n.locale] + ' x' + self.prize.items[self.eqNum].amount + self.$t('pieces')
        self.message = self.$t('receiving') + ` ${ message }`
        clearInterval(this.interval);
        self.timesRun = 0;
      }
      const activeElm = document.querySelector(nextNo)
      activeElm.classList.add('active')
      setTimeout(function () {
        activeElm.classList.remove('active')
      }, 200)
    },

    async submit () {
      try {
        const update = await this.$api.post('/v1/prizes/myPrize', {
          prizeId : this.prize.id
        })
        if (update && update.data) {
          this.setMyPrize(update.data)

          const searchValue = { _id : update.data.item.prizeItemId }
          return _.findIndex(this.prize.items, searchValue);
        }
        return -1
      } catch (error) {
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.pushSnackbarMessages(error.response.data.message)
        }
        console.log(error)
      }
    }
  },
  data     : () => ({
    show      : true,
    eqNum     : 0,
    timesRun  : 0,
    timesStop : null,
    interval  : null,
    disabled  : true,
    message   : '',
    icons     : {
      mdiClose,
      mdiGestureTap
    }
  })
}
</script>
