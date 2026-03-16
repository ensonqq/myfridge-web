<template>
  <v-dialog v-model="show"
            persistent
            scrollable
            max-width="800px">
    <v-card>
      <v-card-title class="text-h5">
        <v-icon>{{ icons.mdiMapMarker }}</v-icon>
        <span v-if="editAddressIndex">{{ $t('editSelfPickUpAddress') }}</span>
        <span v-else>{{ $t('newSelfPickUpAddress') }}</span>
      </v-card-title>
      <v-card-text class="px-1">
        <v-form lazy-validation ref="addressForm" @submit.prevent="save" v-model="valid">
          <v-container v-if="show">
            <v-row>
              <v-col cols="12" md="6" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('recipientName') }}</p>
                <v-text-field v-model="deliveryInfo.recipient" :rules="[$validations.required]"
                              name="recipient"
                              outlined
                              dense
                              hide-details
                              required></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('contactNo8Digits') }}</p>
                <v-text-field v-model="deliveryInfo.phone" :rules="[$validations.required, $validations.phone]"
                              name="recipient"
                              type="tel"
                              counter="8"
                              prefix="+852"
                              outlined
                              dense
                              hide-details
                              required></v-text-field>
              </v-col>
              <v-col cols="6" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('area') }}</p>
                <v-select :items="areas"
                          item-text="text"
                          item-value="value"
                          :appendIcon="icons.mdiChevronDown"
                          v-model="deliveryInfo.area"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          hide-details></v-select>
              </v-col>
              <v-col cols="6" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('district') }}</p>
                <v-select :items="getDistricts"
                          item-text="text"
                          item-value="value"
                          :no-data-text="$t('pleaseSelectArea')"
                          :appendIcon="icons.mdiChevronDown"
                          v-model="deliveryInfo.district"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          hide-details></v-select>
              </v-col>
              <v-col cols="12" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('subDistrict') }}</p>
                <v-select :items="getSubDistricts"
                          item-text="text"
                          item-value="value"
                          :no-data-text="$t('pleaseSelectDistrict')"
                          :appendIcon="icons.mdiChevronDown"
                          v-model="deliveryInfo.subDistrict"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          hide-details></v-select>
              </v-col>
              <v-col cols="12" class="pa-1 d-flex flex-wrap">
                <v-col cols="12" class="py-0 pt-2 black--text">{{ $t('selectSelfPickUpPoint') }}</v-col>
                <!-- hidden values -->
                <v-col cols="12" class="pa-0" style="display: none">
                  <v-text-field class="text-field-show-error-only pa-0 pl-3" v-model="deliveryInfo.fullAddress" :rules="[$validations.required]"
                                name="fullAddress"
                                :label="$t('pickup')"
                                required></v-text-field>
                  <v-text-field class="hidden" v-model="deliveryInfo.code"
                                name="code"
                                :label="$t('code')"></v-text-field>
                  <v-text-field class="hidden" v-model="deliveryInfo.workingHour"
                                name="workingHour"
                                :label="$t('officeHour')"></v-text-field>
                </v-col>
                <!-- end hidden values -->
                <div class="col-12 pa-0 d-flex" v-if="deliveryInfo.subDistrict">
                  <v-col cols="12" md="5">
                    <v-card class="overflow-x-hidden pa-1 ma-0 pickup-address-list">
                      <v-row v-for="(point,index) in pickupPoints[deliveryInfo.subDistrict]"
                             :key="index" class="pb-1-eee pickup-address"
                             :class="{selected: index === selected}"
                             @click.prevent="selectPickupPoint(point, index)">
                        <v-col cols="12" class="pa-5">
                          <ul style="list-style: none" class="pa-0">
                            <template v-if="$i18n.locale === 'zh'">
                              <li>{{ index + 1 }}. {{ point.shortAddress }} {{ selected === index ? `(${ $t('selected') })` : '' }}</li>
                              <li class="text-12 d-flex align-start">
                                <v-icon size="18">{{ icons.mdiMapMarker }}</v-icon>
                                <div class="ml-1">{{ point.fullAddress }}</div>
                              </li>
                              <li class="text-12 d-flex align-start">
                                <v-icon size="18">{{ icons.mdiClockTimeFourOutline }}</v-icon>
                                <div class="ml-1" v-html="point.workingHour.split(' ').join('<br>')"></div>
                              </li>
                            </template>
                            <template v-else>
                              <li>{{ index + 1 }}. {{ point.shortAddressEn }} {{ selected === index ? `(${ $t('selected') })` : '' }}</li>
                              <li class="text-12 d-flex align-start">
                                <v-icon size="18">{{ icons.mdiMapMarker }}</v-icon>
                                <div class="ml-1">{{ point.fullAddressEn }}</div>
                              </li>
                              <li class="text-12 d-flex align-start">
                                <v-icon size="18">{{ icons.mdiClockTimeFourOutline }}</v-icon>
                                <div class="ml-1" v-html="point.workingHourEn.split(' Business hours').join('<br>Business hours')"></div>
                              </li>
                            </template>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="7" md="7" class="pa-0 pr-2 hide-on-mobile">
                    <div class="mb-1 black--text">
                      <v-icon size="18">{{ icons.mdiMapMarker }}</v-icon>
                      {{ parseInt(selected) > -1 ? deliveryInfo.fullAddress : $t('pleaseSelectPickupPoint') }}
                    </div>
                    <iframe width="100%" height="280" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://maps.google.it/maps?q=' + encodeURIComponent(parseInt(selected) > -1? deliveryInfo.fullAddress : '香港') +'=&output=embed'"></iframe>
                  </v-col>
                </div>
                <v-card v-else height="290" width="100%" color="#eee" class="d-flex justify-center align-center">
                  <span class="grey--text text--darken-2">{{ $t('pleaseSelectAreaDistrictSubDistrict') }}</span>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <small class="pa-2">*{{ $t('allFieldsAreRequired') }}</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="parseInt(editAddressIndex) > -1 && editAddressIndex > -1" text @click.prevent.stop="removeAddress" color="red darken-3">{{ $t('deleteAddress') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click.prevent.stop="save">{{ $t('save') }}</v-btn>
        <v-btn text @click.prevent.stop="close">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState}                                           from "vuex";
import {mdiMapMarker, mdiClockTimeFourOutline, mdiChevronDown, mdiDelete} from "@mdi/js"

export default {
  name     : "PickupAddress",
  data     : () => ({
    icons            : {
      mdiMapMarker,
      mdiClockTimeFourOutline,
      mdiChevronDown,
    },
    valid            : true,
    selected         : null,
    show             : false,
    resolve          : null,
    reject           : null,
    editAddressIndex : null,

    pickupPoints : null,

    //user address data
    deliveryInfo : {
      recipient   : '',
      phone       : '',
      area        : '',
      district    : '',
      subDistrict : '',
      fullAddress : '',
      code        : '',
      workingHour : ''
    },
  }),
  computed : {
    ...mapState(['locations', 'user']),
    areas () {
      return [{ text : this.$t('hk'), value : 'hk' }, { text : this.$t('kln'), value : 'kln' },
        { text : this.$t('nt'), value : 'nt' }]
    },
    getDistricts () {
      const self = this
      const area = this.deliveryInfo.area
      if (this.locations && area) {
        const locations = this.locations.locations
        const availableAreas = []
        for (let district in locations[area]) {
          const availableSubDistricts = Object.keys(this.pickupPoints)
          const subDistrictsInSelectedArea = locations[area][district]
          const presents = _.intersectionWith(availableSubDistricts, subDistrictsInSelectedArea, _.isEqual);
          if (presents.length) {
            availableAreas.push(district)
          }
        }
        return availableAreas.map(item => ({
          text  : self.$t(item),
          value : item
        }))
      }
      return []
    },
    getSubDistricts () {
      const self = this
      const area = this.deliveryInfo.area
      const district = this.deliveryInfo.district
      if (this.locations && area && district) {
        const availableSubDistricts = Object.keys(this.pickupPoints)
        return _.intersectionWith(availableSubDistricts, this.locations.locations[area][district], _.isEqual)
                .map(item => ({
                  text  : self.$t(item),
                  value : item
                }))
      }
      return []
    }
  },
  watch    : {
    'deliveryInfo.subDistrict' : function () {
      this.selected = null
    },
  },
  methods  : {
    ...mapMutations(['setUser', 'pushSnackbarMessages']),
    selectPickupPoint (point, index) {
      this.selected = index
      this.deliveryInfo.fullAddress = this.$i18n.locale === 'zh' ? point.fullAddress : point.fullAddressEn
      this.deliveryInfo.code = point.code
      this.deliveryInfo.workingHour = this.$i18n.locale === 'zh' ? point.workingHour : point.workingHourEn
    },
    async removeAddress () {
      try {
        const confirm = await this.$refs.ConfirmDialog.open(this.$t('delete'), this.$t('deleteAddressPrompt'), mdiDelete)
        if (confirm) {
          const pickupAddresses = _.cloneDeep(this.user.pickupAddresses.map(item => {
            delete item._id
            return item
          }))

          pickupAddresses.splice(this.editAddressIndex, 1)

          const result = await this.$api.patch('/v1/users/me', { pickupAddresses })

          //update user info (including new address) and return new added address index: selectAddressIndex
          if (result && result.data) {
            this.setUser(result.data)
            this.resolve(null)
            this.reset()
          }
        }
      } catch (e) {
      } finally {
      }
    },
    async open (editAddressIndex) {
      const pickupPoints = await this.$api.get('/v1/settings/pickupPoints')
      this.pickupPoints = pickupPoints.data
      this.show = true
      this.valid = true
      if (_.isNumber(editAddressIndex)) {
        this.editAddressIndex = editAddressIndex
        this.deliveryInfo = { ...this.user.pickupAddresses[editAddressIndex] }

        //remove id: db patch error
        delete this.deliveryInfo['_id']
      }

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.reset()
      this.resolve(false)
    },
    async save () {
      try {
        if (!this.$refs.addressForm.validate()) return

        let pickupAddresses = []

        if (this.user.pickupAddresses) {
          //  clone address from user object
          pickupAddresses = _.cloneDeep(this.user.pickupAddresses.map(item => {
            delete item._id
            return item
          }))
        }

        let selectAddressIndex = this.editAddressIndex

        if (_.isNumber(selectAddressIndex)) {
          //edit address
          pickupAddresses[selectAddressIndex] = this.deliveryInfo
        } else {
          //new address
          selectAddressIndex = pickupAddresses.push(this.deliveryInfo) - 1
        }


        if (this.user.id) {
          const result = await this.$api.patch('/v1/users/me', { pickupAddresses })

          //update user info (including new address) and return new added address index: selectAddressIndex
          if (result && result.data) {
            this.setUser(result.data)
            this.resolve(selectAddressIndex)
            this.reset()
          }
        } else {
          this.setUser({ pickupAddresses })
          this.resolve(selectAddressIndex)
          this.reset()
        }
      } catch (e) {
        console.log(e)
      } finally {
      }
    },
    reset () {
      this.show = false
      this.valid = true
      this.editAddressIndex = null
      this.deliveryInfo = {
        recipient   : '',
        phone       : '',
        area        : '',
        district    : '',
        subDistrict : '',
        fullAddress : '',
        code        : '',
        workingHour : ''
      }
    }
  },
}
</script>
