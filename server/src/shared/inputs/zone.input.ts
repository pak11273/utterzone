import { Field, InputType } from "type-graphql"

import { Length } from "class-validator"

// import { Language } from "../enums/Language.enums"


export enum Language {
  ENGLISH = "English",
  SPANISH = "Spanish",
  PORTUGUESE = "Portuguese",
  FRENCH = "French",
  ITALIAN = "Italian",
  DUTCH = "Dutch",
  FINNISH = "Finnish",
  DANISH = "Danish",
  GREEK = "Greek",
  NORWEGIAN = "Norwegian",
  SWEDISH = "Swedish",
  ALBANIAN = "Albanian",
  ARMENIAN = "Armenian",
  BASQUE = "Basque",
  BRETON = "Breton",
  CATALAN = "Catalan",
  CORNISH = "Cornish",
  ESTONIAN = "Estonian",
  FAROESE = "Faroese",
  FLEMISH = "Flemish",
  GEORGIAN = "Georgian",
  GOTHIC = "Gothic",
  HUNGARIAN = "Hungarian",
  ICELANDIC = "Icelandic",
  IRISH = "Irish",
  LADIN = "Ladin",
  LADINO = "Ladino",
  LATVIAN = "Latvian",
  LITHUANIAN = "Lithuanian",
  LUXEMBOURGISH = "Luxembourgish",
  MALTESE = "Maltese",
  MANX = "Manx",
  OCCITAN = "Occitan",
  ROMANIAN = "Romanian",
  SAMI = "Sami",
  UME = "Ume",
  SCOTS = "Scots",
  SCOTTISH = "Scottish",
  WELSH = "Welsh",
  GERMAN = "German",
  INDONESIAN = "Indonesian",
  KOREAN = "Korean",
  THAI = "Thai",
  VIETNAMESE = "Vietnamese",
  MONGOLIAN = "Mongolian",
  AZERBAIJANI = "Azerbaijani",
  HAWAIIAN = "Hawaiian",
  KAZAKH = "Kazakh",
  AINU = "Ainu",
  BURMESE = "Burmese",
  CEBUANO = "Cebuano",
  DZONGKHA = "Dzongkha",
  JAVANESE = "Javanese",
  KAREN = "Karen",
  KHMER = "Khmer",
  KYRGYZ = "Kyrgyz",
  LAZ = "Laz",
  LU = "Lu",
  MALAY = "Malay",
  MAORI = "Maori",
  MARSHALLESE = "Marshallese",
  NEPALI = "Nepali",
  TAGALOG = "Tagalog",
  TIBETAN = "Tibetan",
  MANDARIN = "Mandarin",
  CANTONESE = "Cantonese",
  TAISHANESE = "Taishanese",
  HAKKA = "Hakka",
  JAPANESE = "Japanese",
  KANJI = "Kanji",
  BENGALI = "Bengali",
  GUJARATI = "Gujarati",
  HINDI = "Hindi",
  TELUGU = "Telugu",
  URDU = "Urdu",
  MARATHI = "Marathi",
  KANNADA = "Kannada",
  MALAYALAM = "Malayalam",
  PALI = "Pali",
  PUNJABI = "Punjabi",
  SANSKRIT = "Sanskrit",
  TAMANG = "Tamang",
  TAMIL = "Tamil",
  ARABIC = "Arabic",
  HEBREW = "Hebrew",
  TURKISH = "Turkish",
  ARAMAIC = "Aramaic",
  KURDISH = "Kurdish",
  PERSIAN = "Persian",
  YIDDISH = "Yiddish",
  RUSSIAN = "Russian",
  BOSNIAN = "Bosnian",
  CROATIAN = "Croatian",
  CZECH = "Czech",
  POLISH = "Polish",
  SERBIAN = "Serbian",
  BULGARIAN = "Bulgarian",
  SLOVAK = "Slovak",
  SLOVENIAN = "Slovenian",
  UKRAINIAN = "Ukrainian",
  BELARUSIAN = "Belarusian",
  CIRCASSIAN = "Circassian ",
  MACEDONIAN = "Macedonian",
  OSSETIC = "Ossetic",
  COPTIC = "Coptic",
  SWAHILI = "Swahili",
  AFRIKAANS = "Afrikaans",
  AKAN = "Akan",
  AMHARIC = "Amharic",
  HAUSA = "Hausa",
  KAONDE = "Kaonde",
  KINYARWANDA = "Kinyarwanda",
  LUGANDA = "Luganda",
  MALAGASY = "Malagasy",
  MANDINKA = "Mandinka",
  NYANJA = "Nyanja",
  SOMALI = "Somali",
  SONINKE = "Soninke",
  WOLOF = "Wolof",
  ZULU = "Zulu",
  LATIN = "Latin",
  CHEROKEE = "Cherokee",
  ALGONQUIAN = "Algonquian",
  ALUTIIQ = "Alutiiq",
  CHOCTAW = "Choctaw",
  GREENLANDIC = "Greenlandic",
  GUARANI = "Guarani",
  INUKTITUT = "Inuktitut",
  LAKOTA = "Lakota",
  NAHUATL = "Nahuatl",
  QUECHUA = "Quechua",
  ESPERANTO = "Esperanto",
  INTERLINGUA = "Interlingua",
  KLINGON = "Klingon",
  LOJBAN = "Lojban",
}

@InputType()
export class ZoneInput {
  @Field()
  @Length(8, 30)
  name: string

  @Field({ nullable: true })
  @Length(2, 300)
  password: string

  @Field({ nullable: true })
  app: string

  @Field()
  learningLanguage: Language

  @Field()
  nativeLanguage: Language

  @Field()
  hostId: string

  @Field()
  maxParticipants?: number

  @Field({ nullable: true, defaultValue: "Practice with us!" })
  description: string

  @Field({ defaultValue: true })
  public: boolean

  @Field({ defaultValue: false })
  mature: boolean

  @Field({ defaultValue: false })
  premium: boolean
}
