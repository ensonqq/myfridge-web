const _ = require('lodash')

const validations = {
  required      : v => (!!v || parseInt(v) > -1) || '此欄必需填寫',
  email         : v => /.+@.+\..+/.test(v) || 'Email不正確',
  passwordMatch : (v1, v2) => v1 === v2 || '新密碼不一致',
  phone         : v => (_.toNumber(v) && _.toNumber(v).toString().length === 8) || '8位數字電話不正確',
  id5Digits     : v => (_.toNumber(v) && _.toNumber(v).toString().length === 5) || '身份證頭5位數字不正確',
}

export default ({ app, store }, inject) => {
  inject('validations', validations)
}
