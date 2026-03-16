const validations = {
  required : v => (!!v || parseInt(v) > -1) || '輸入不正確',
  email    : v => /.+@.+\..+/.test(v) || 'Email不正確',
}

export default ({ app, store }, inject) => {
  inject('validations', validations)
}
