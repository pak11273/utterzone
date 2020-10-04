import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ID, ObjectType, registerEnumType } from "type-graphql"

import { Course } from "./Course"
import { Message } from "./Message"
import { User } from "./User"

// import { Language } from "../shared/enums/Language.enums"


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

registerEnumType(Language, {
  name: "Language",
})

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ nullable: true, default: "A Random Zone" })
  name: string

  @Field()
  @Column({ nullable: true, default: "chat" })
  app: string

  @Field(() => Course)
  @OneToOne(_type => Course, course => course.zone)
  course: Course

  @Field(() => [User])
  @OneToMany(() => User, user => user, { nullable: true })
  banned: User[]

  @Field()
  @Column({ nullable: true })
  hostId: string

  @OneToOne(() => User, user => user.zone)
  host: User

  @Field()
  @PrimaryGeneratedColumn("uuid")
  token: string

  @Field(() => [User])
  @OneToMany(() => User, user => user, { nullable: true })
  participants: User[]

  @Field(_type => Language)
  @Column()
  learningLanguage: Language

  @Field(_type => Language)
  @Column()
  nativeLanguage: Language

  @Field()
  @Column({ nullable: true })
  maxParticipants: number

  @Field({ nullable: true })
  @Column()
  description: string

  @Field(_type => Message)
  lastMessage: Message

  @Field()
  password!: string

  @Field()
  @Column()
  public: boolean

  @Field()
  @Column()
  mature: boolean

  @Field()
  @Column()
  premium: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date
}

@ObjectType()
export class ZoneEvent {
  @Field(_type => ID)
  id: number

  @Field({ nullable: true })
  message?: string

  @Field(_type => Date)
  date: Date
}
export interface ZonePayload {
  id: number
  message?: string
}
