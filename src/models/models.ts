export interface ILocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface IEpisode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface IDataInfo {
  count: number
  pages: number
  next: string
  prev: string
}

export interface ServerResponse<T> {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: T[]
}

export interface IRegister {
  email: string
  login: string
  firstName: string
  secondName: string
  password: string
  repeatPassword: string
}

export type ICharacterName = string
export type ICharacterRace = string
export type ICharacterStatus = string

export interface ICharacterFilter {
  name: ICharacterName
  race: ICharacterRace
  status: ICharacterStatus
}
