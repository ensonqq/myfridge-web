<template>
  <v-dialog width="500" v-model="dialog" persistent>
    <v-card class="position-relative">
      <div class="px-3 px-md-10 py-8 ">
        <v-form @submit.prevent="resubmitIdentity" ref="registrationForm" lazy-validation>
          <div class="text-center weblogo"><img src="~/assets/images/logo.png" alt="" width="100" height="100"/></div>
          <h2 class="mb-2 text-center">{{ $t('resubmitStudentId') }}</h2>
          <ImageUpload @image="setImage" :error="imageError"></ImageUpload>
          <v-btn type="submit" block color="secondary white--text" class="text-capitalize font-600 mt-6" :loading="loadingUploadImage">{{ $t('submit') }}</v-btn>
          <v-col cols="12" class="error--text text-center">{{ message }}</v-col>
        </v-form>
      </div>
      <v-btn icon
             tile
             class="closeBtn"
             @click="close">
        <v-icon>{{ icons.mdiClose }}</v-icon>
      </v-btn>
    </v-card>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </v-dialog>
</template>
<script>
import {mapMutations} from "vuex";
import {
  mdiClose,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiBell
}                     from '@mdi/js'
import ConfirmDialog
                      from "@/components/ConfirmDialog";

export default {
  watch      : {
    message (val) {
      if (val) {
        let t = this
        setTimeout(function () {
          t.message = ''
        }, 5000)
      }
    },
  },
  components : {
    ConfirmDialog
  },
  data       : () => ({
    dialog                : false,
    image                 : null,
    loadingLogin          : false,
    loadingUploadImage    : false,
    loadingForgotPassword : false,
    resubmissionData      : {
      student : {
        image : null
      }
    },
    message               : '',
    resolve               : null,
    reject                : null,
    imageError            : false,
    icons                 : {
      mdiClose, mdiRadioboxBlank, mdiRadioboxMarked, mdiCheckboxBlankOutline, mdiCheckboxMarked
    },
  }),
  created () {
    const hostname = window.location.hostname
    if (['localhost', 'dev.myfridgehk.com', 'student.myfridgehk.com'].includes(hostname)) {
      this.enableStudentRegistration = true
    }
  },
  methods : {
    ...mapMutations(['setUser', 'setTokens', 'toggleLoginModal', 'pushSnackbarMessages']),
    setImage (image) {
      this.image = image
      this.imageError = false
    },

    open () {
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.dialog = false
      if (this.resolve) {
        this.resolve(false)
      }
    },
    async resubmitIdentity () {
      try {
        this.loadingUploadImage = true
        if (!this.image) {
          this.message = '請上傳圖片'
          return
        }


        const confirm = await this.$refs.ConfirmDialog.open('重新提交', '資料一經上傳就不可更改，您確定提交嗎？', mdiBell)
        if (!confirm) return

        let bodyFormData = new FormData()
        bodyFormData.append('file', this.image)
        const image = await this.$api.post('/v1/uploads/studentImage', bodyFormData)

        if (image.data) {
          this.resubmissionData.student.image = image.data.id
        } else {
          this.message = '圖片上載失敗，請重新嘗試。'
        }

        const response = await this.$api.patch('/v1/users/me/resubmitStudentIdentity', this.resubmissionData)
        if (response.data) {
          this.pushSnackbarMessages('已重新提交')
          await this.$api.myProfile()
          this.close()
        }

        if (this.resolve) {
          this.resolve(true)
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.message = error.response.data.message
        }
      } finally {
        this.loadingUploadImage = false
      }
    }
  }
}
</script>

