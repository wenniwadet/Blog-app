// Article type

export type Author = {
  image: string
  username: string
}

export type Article = {
  author: Author
  body: string
  createdAt: string
  updatedAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
}

export type ArticlesResponse = {
  articles: Article[]
  articlesCount: number
}

export type SingleArticleResponse = {
  article: Article
}

export type NewArticle = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type UpdateArticle = NewArticle

// User type

export type User = {
  username: string
  email: string
  token: string
  image?: string
}

export type UserResponse = {
  user: {
    username: string
    email: string
    token: string
    image?: string
  }
}

export type ProfileResponse = {
  profile: {
    username: string
    image: string
  }
}

export type UpdatedProfile = {
  username?: string
  email?: string
  password?: string
  image?: string
}

export type UpdatedProfileResponse = {
  user: {
    username: string
    email: string
    token: string
    image: string
  }
}

// Auth Type

export type DataRegistration = {
  username: string
  email: string
  password: string
}

export type DataLogin = {
  email: string
  password: string
}

export type LoginUserResponse = {
  user: {
    username: string
    email: string
    token: string
    image: string
  }
}
