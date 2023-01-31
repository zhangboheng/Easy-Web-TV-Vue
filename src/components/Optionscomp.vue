<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { computed } from "@vue/reactivity"
const emmits = defineEmits(['update:modelValue']);

let props = defineProps<{
  inputName: string,
  alg: string,
  bnm: string,
  modelValue: String
}>();

const propsMessage = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emmits('update:modelValue', val)
  }
})
//Set Options Selected Value
onMounted(()=>{
  propsMessage.value = "selectbox"
});

const options = ref([
  { text: '==Select==', value: 'selectbox' },
  { text: 'Afrikaans', value: 'af' },
  { text: 'Albanian - shqip', value: 'sq' },
  { text: 'Amharic - አማርኛ', value: 'am' },
  { text: 'Arabic - العربية', value: 'ar' },
  { text: 'Armenian - հայերեն', value: 'hy' },
  { text: 'Azerbaijani - azərbaycan dili', value: 'az' },
  { text: 'Basque - euskara', value: 'eu' },
  { text: 'Belarusian - беларуская', value: 'be' },
  { text: 'Bangla - বাংলা', value: 'bn' },
  { text: 'Bosnian - bosanski', value: 'bs' },
  { text: 'Bulgarian - български', value: 'bg' },
  { text: 'Catalan - català', value: 'ca' },
  { text: 'Chinese - 中文', value: 'zh' },
  { text: 'Chinese (Hong Kong) - 中文（香港）', value: 'zh-HK' },
  { text: 'Chinese (Simplified) - 中文（简体）', value: 'zh-CN' },
  { text: 'Chinese (Traditional) - 中文（繁體）', value: 'zh-TW' },
  { text: 'Corsican', value: 'co' },
  { text: 'Croatian - hrvatski', value: 'hr' },
  { text: 'Czech - čeština', value: 'cs' },
  { text: 'Danish - dansk', value: 'da' },
  { text: 'Dutch - Nederlands', value: 'nl' },
  { text: 'English', value: 'en' },
  { text: 'English (Australia)', value: 'en-AU' },
  { text: 'English (Canada)', value: 'en-CA' },
  { text: 'English (India)', value: 'en-IN' },
  { text: 'English (New Zealand)', value: 'en-NZ' },
  { text: 'English (South Africa)', value: 'en-NZ' },
  { text: 'English (United Kingdom)', value: 'en-GB' },
  { text: 'English (United States)', value: 'en-US' },
  { text: 'Esperanto - esperanto', value: 'eo' },
  { text: 'Estonian - eesti', value: 'et' },
  { text: 'Filipino', value: 'fil' },
  { text: 'Finnish - suomi', value: 'fi' },
  { text: 'French - français', value: 'fr' },
  { text: 'French (Canada) - français (Canada)', value: 'fr-CA' },
  { text: 'French (France) - français (France)', value: 'fr-FR' },
  { text: 'French (Switzerland) - français (Suisse)', value: 'fr-CH' },
  { text: 'Galician - galego', value: 'gl' },
  { text: 'Georgian - ქართული', value: 'ka' },
  { text: 'German - Deutsch', value: 'de' },
  { text: 'German (Austria) - Deutsch (Österreich)', value: 'de-AT' },
  { text: 'German (Germany) - Deutsch (Deutschland)', value: 'de-DE' },
  { text: 'German (Liechtenstein) - Deutsch (Liechtenstein)', value: 'de-LI' },
  { text: 'German (Switzerland) - Deutsch (Schweiz)', value: 'de-CH' },
  { text: 'Greek - Ελληνικά', value: 'el' },
  { text: 'Gujarati - ગુજરાતી', value: 'gu' },
  { text: 'Hausa', value: 'ha' },
  { text: 'Hawaiian - ʻŌlelo Hawaiʻi', value: 'ha' },
  { text: 'Hebrew - עברית', value: 'he' },
  { text: 'Hindi - हिन्दी', value: 'hi' },
  { text: 'Hungarian - magyar', value: 'hu' },
  { text: 'Icelandic - íslenska', value: 'is' },
  { text: 'Indonesian - Indonesia', value: 'id' },
  { text: 'Irish - Gaeilge', value: 'ga' },
  { text: 'Italian - italiano', value: 'it' },
  { text: 'Italian (Italy) - italiano (Italia)', value: 'it-IT' },
  { text: 'Italian (Switzerland) - italiano (Svizzera)', value: 'it-CH' },
  { text: 'Japanese - 日本語', value: 'ja' },
  { text: 'Kannada - ಕನ್ನಡ', value: 'kn' },
  { text: 'Kazakh - қазақ тілі', value: 'kk' },
  { text: 'Khmer - ខ្មែរ', value: 'km' },
  { text: 'Korean - 한국어', value: 'ko' },
  { text: 'Kurdish - Kurdî', value: 'ku' },
  { text: 'Kyrgyz - кыргызча', value: 'ky' },
  { text: 'Lao - ລາວ', value: 'lo' },
  { text: 'Latin', value: 'la' },
  { text: 'Latvian - latviešu', value: 'lv' },
  { text: 'Lithuanian - lietuvių', value: 'lt' },
  { text: 'Macedonian - македонски', value: 'mk' },
  { text: 'Malay - Bahasa Melayu', value: 'ms' },
  { text: 'Malayalam - മലയാളം', value: 'ml' },
  { text: 'Maltese - Malti', value: 'mt' },
  { text: 'Marathi - मराठी', value: 'mr' },
  { text: 'Mongolian - монгол', value: 'mn' },
  { text: 'Nepali - नेपाली', value: 'ne' },
  { text: 'Norwegian - norsk', value: 'no' },
  { text: 'Norwegian Bokmål - norsk bokmål', value: 'nb' },
  { text: 'Norwegian Nynorsk - nynorsk', value: 'nn' },
  { text: 'Odia', value: 'od' },
  { text: 'Pashto - پښتو', value: 'ps' },
  { text: 'Persian - فارسی', value: 'fa' },
  { text: 'Polish - polski', value: 'pl' },
  { text: 'Portuguese - português', value: 'pt' },
  { text: 'Portuguese (Brazil) - português (Brasil)', value: 'pt-BR' },
  { text: 'Portuguese (Portugal) - português (Portugal)', value: 'pt-PT' },
  { text: 'Punjabi - ਪੰਜਾਬੀ', value: 'pa' },
  { text: 'Romanian - română', value: 'ro' },
  { text: 'Romanian (Moldova) - română (Moldova)', value: 'mo' },
  { text: 'Romansh - rumantsch', value: 'rm' },
  { text: 'Russian - русский', value: 'ru' },
  { text: 'Scottish Gaelic', value: 'gd' },
  { text: 'Serbian - српски', value: 'sr' },
  { text: 'Shona - chiShona', value: 'sn' },
  { text: 'Sindhi', value: 'sd' },
  { text: 'Sinhala - සිංහල', value: 'si' },
  { text: 'Slovak - slovenčina', value: 'sk' },
  { text: 'Slovenian - slovenščina', value: 'sl' },
  { text: 'Somali - Soomaali', value: 'so' },
  { text: 'Southern Sotho', value: 'st' },
  { text: 'Spanish - español', value: 'es' },
  { text: 'Spanish (Argentina) - español (Argentina)', value: 'es-AR' },
  { text: 'Spanish (Latin America) - español (Latinoamérica)', value: 'es-419' },
  { text: 'Spanish (Mexico) - español (México)', value: 'es-MX' },
  { text: 'Spanish (Spain) - español (España)', value: 'es-ES' },
  { text: 'Spanish (United States) - español (Estados Unidos)', value: 'es-US' },
  { text: 'Sundanese', value: 'su' },
  { text: 'Swahili - Kiswahili', value: 'sw' },
  { text: 'Swedish - svenska', value: 'sv' },
  { text: 'Tajik - тоҷикӣ', value: 'tg' },
  { text: 'Tamil - தமிழ்', value: 'ta' },
  { text: 'Tatar', value: 'tt' },
  { text: 'Telugu - తెలుగు', value: 'te' },
  { text: 'Thai - ไทย', value: 'th' },
  { text: 'Turkish - Türkçe', value: 'tr' },
  { text: 'Turkmen', value: 'tk' },
  { text: 'Ukrainian - українська', value: 'uk' },
  { text: 'Urdu - اردو', value: 'ur' },
  { text: 'Uyghur', value: 'ug' },
  { text: 'Uzbek - o‘zbek', value: 'uz' },
  { text: 'Vietnamese - Tiếng Việt', value: 'vi' },
  { text: 'Welsh - Cymraeg', value: 'cy' },
  { text: 'Western Frisian', value: 'fy' },
  { text: 'Xhosa', value: 'xh' },
  { text: 'Yiddish', value: 'yi' },
  { text: 'Yoruba - Èdè Yorùbá', value: 'yo' },
  { text: 'Zulu - isiZulu', value: 'zu' }
]);

</script>

<template>
      <span>{{ inputName }}</span>
      <select :id="alg" :name="bnm" v-model="propsMessage" >
        <option v-for="option in options" :value="option.value">
            {{ option.text }}
        </option>
      </select>
</template>

<style scoped>

</style>
