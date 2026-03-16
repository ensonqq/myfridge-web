<template>
  <v-dialog v-model="show"
            persistent
            scrollable
            max-width="600px">
    <v-card class="pa-0">
      <v-card-title class="text-h5">
        <v-icon class="mr-1">{{ icons.mdiSilverwareForkKnife }}</v-icon>
        <span>{{ $t('selectAddons') }}</span>
      </v-card-title>
      <v-card-text class="px-1">
        <v-form lazy-validation ref="addonsForm" @submit.prevent="save" v-model="valid">
          <v-container v-if="show">
            <v-radio-group v-model="selectedIndex" row :rules="[$validations.required]" hide-details class="mb-8">
              <v-row>
                <v-col cols="9" class="px-10 font-weight-bold">項目</v-col>
                <v-col cols="3" class="text-right pr-6 font-weight-bold">價錢</v-col>
                <v-col cols="12" :key="'addons'+index" v-for="(addon,index) in addons" class="py-0">
                  <v-radio :on-icon="icons.mdiRadioboxMarked"
                           :off-icon="icons.mdiRadioboxBlank"
                           color="secondary"
                           :value="index">
                    <template slot="label">
                      <v-row class="justify-space-between">
                        <v-col cols="9">{{ addon.name[$i18n.locale] }}</v-col>
                        <v-col cols="3" class="text-right" color="secondary">${{ addon.price }}</v-col>
                      </v-row>
                    </template>
                  </v-radio>
                  <hr class="my-2" v-if="index < addons.length-1">
                </v-col>
              </v-row>
            </v-radio-group>
            <small>*{{ $t('selectAddons') }}</small>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click.prevent.stop="save">{{ $t('confirm') }}</v-btn>
        <v-btn text @click.prevent.stop="close">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState}                                                      from "vuex";
import {mdiChevronDown, mdiRadioboxBlank, mdiRadioboxMarked, mdiSilverwareForkKnife} from "@mdi/js"

export default {
  name     : "Address",
  data     : () => ({
    icons         : {
      mdiChevronDown,
      mdiSilverwareForkKnife,
      mdiRadioboxMarked,
      mdiRadioboxBlank
    },
    valid         : true,
    show          : false,
    resolve       : null,
    reject        : null,
    selectedIndex : null,

    //addons array
    addons : null,
  }),
  computed : {},
  methods  : {
    ...mapMutations(['pushSnackbarMessages']),
    open (selectedIndex, addons) {
      this.show = true
      this.valid = true
      this.addons = addons
      this.selectedIndex = parseInt(selectedIndex) > -1 ? selectedIndex : null

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.reset()
      this.resolve(null)
    },
    async save () {
      try {
        if (!this.$refs.addonsForm.validate()) return
        this.resolve(this.selectedIndex)
        this.reset()
      } catch (e) {
        console.log(e)
      } finally {
      }
    },
    reset () {
      this.show = false
      this.valid = true
      this.addons = null
    }
  },
}
</script>
