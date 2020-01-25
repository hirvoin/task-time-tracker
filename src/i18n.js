import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import moment from "moment"

i18n.use(initReactI18next).init({
  fallbackLng: "fi",
  debug: true,
  resources: {
    fi: {
      translation: {
        key: " {{date, D.M.YYYY, HH:mm:ss }}"
      }
    }
  },
  interpolation: {
    escapeValue: false,
    format: function(value, format) {
      if (value instanceof Date) return moment(value).format(format)
      return value
    }
  }
})
export default i18n
