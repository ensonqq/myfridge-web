<template>
  <v-dialog v-model="show"
            persistent
            scrollable
            max-width="600px">
    <v-card class="pa-0">
      <v-card-title class="text-h5">
        <v-icon>{{ icons.mdiMapMarker }}</v-icon>
        <span v-if="editAddressIndex">{{ $t('editAddress') }}</span>
        <span v-else>{{ $t('newAddress2') }}</span>
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
              <v-col cols="6" lg="4" md="4" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('area') }}</p>
                <v-select :items="areas"
                          item-text="text"
                          item-value="value"
                          v-model="deliveryInfo.area"
                          :appendIcon="icons.mdiChevronDown"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          hide-details></v-select>
              </v-col>
              <v-col cols="6" lg="4" md="4" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('district') }}</p>
                <v-select :items="getDistricts"
                          item-text="name"
                          item-value="value"
                          v-model="deliveryInfo.district"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          :no-data-text="$t('pleaseSelectArea')"
                          :appendIcon="icons.mdiChevronDown"
                          hide-details></v-select>
              </v-col>
              <v-col cols="12" lg="4" md="4" class="pb-0">
                <p class="text-14 mb-1 black--text">{{ $t('subDistrict') }}</p>
                <v-select :items="getSubDistricts"
                          item-text="name"
                          item-value="value"
                          v-model="deliveryInfo.subDistrict"
                          :rules="[$validations.required]"
                          outlined
                          dense
                          :no-data-text="$t('pleaseSelectDistrict')"
                          :appendIcon="icons.mdiChevronDown"
                          hide-details></v-select>
              </v-col>
              <v-col cols="12">
                <p class="text-14 mb-1 black--text">{{ $t('fullAddress') }}</p>
                <v-textarea v-model="deliveryInfo.fullAddress" :rules="[$validations.required]"
                            name="recipient"
                            rows="2"
                            outlined
                            dense
                            hide-details
                            required></v-textarea>
              </v-col>
            </v-row>
            <small>*{{ $t('allFieldsAreRequired') }}</small>
          </v-container>
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
import {mapMutations, mapState}                  from "vuex";
import {mdiChevronDown, mdiDelete, mdiMapMarker} from "@mdi/js"

export default {
  name     : "Address",
  data     : () => ({
    icons            : {
      mdiMapMarker,
      mdiChevronDown
    },
    valid            : true,
    show             : false,
    resolve          : null,
    reject           : null,
    editAddressIndex : null,

    //user address data
    deliveryInfo : {
      recipient   : '',
      phone       : '',
      area        : '',
      district    : '',
      subDistrict : '',
    },
  }),
  computed : {
    ...mapState(['locations', 'user']),
    areas () {
      return [{ text : this.$t('hk'), value : 'hk' }, { text : this.$t('kln'), value : 'kln' },
        { text : this.$t('nt'), value : 'nt' }]
    },
    getDistricts () {
      const area = this.deliveryInfo.area
      const self = this
      if (this.locations && area) {
        return Object.keys(this.locations.locations[area]).map(item => ({
          name  : self.$t(item),
          value : item
        }))
      }
      return []
    },
    getSubDistricts () {
      const area = this.deliveryInfo.area
      const self = this
      const district = this.deliveryInfo.district
      if (this.locations && area && district) {
        return this.locations.locations[area][district].map(item => ({
          name  : self.$t(item),
          value : item
        }))
      }
      return []
    }
  },
  methods  : {
    ...mapMutations(['setUser', 'pushSnackbarMessages']),
    async removeAddress () {
      try {
        const confirm = await this.$refs.ConfirmDialog.open(this.$t('delete'), this.$t('deleteAddressPrompt'), mdiDelete)

        if (confirm) {
          const addresses = _.cloneDeep(this.user.addresses.map(item => {
            delete item._id
            return item
          }))

          addresses.splice(this.editAddressIndex, 1)

          const result = await this.$api.patch('/v1/users/me', { addresses })

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
    open (editAddressIndex) {
      this.show = true
      this.valid = true
      if (_.isNumber(editAddressIndex)) {
        this.editAddressIndex = editAddressIndex
        this.deliveryInfo = { ...this.user.addresses[editAddressIndex] }

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

        let addresses = []

        if (this.user.addresses) {
          //  clone address from user object
          addresses = _.cloneDeep(this.user.addresses.map(item => {
            delete item._id
            return item
          }))
        }

        let selectAddressIndex = this.editAddressIndex

        if (_.isNumber(selectAddressIndex)) {
          //edit address
          addresses[selectAddressIndex] = this.deliveryInfo
        } else {
          //new address
          selectAddressIndex = addresses.push(this.deliveryInfo) - 1
        }


        if (this.user.id) {
          const result = await this.$api.patch('/v1/users/me', { addresses })

          //update user info (including new address) and return new added address index: selectAddressIndex
          if (result && result.data) {
            this.setUser(result.data)
            this.resolve(selectAddressIndex)
            this.reset()
          }
        } else {
          this.setUser({ addresses })
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
      }
    }
  },
}
</script>
