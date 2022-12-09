export interface RegisterPayload {
  fullname: string
  username: string
  password: string
  password_confirmation?: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface CreateFamilyPayload {
  familyName: string
  familyBio: string
  image: File | undefined
}

export interface JoinFamilyPayload {
  familyCode: string
  userId: string
}

export interface NewPostPayload {
  postTitle: string
  postDescription: string
  image: string | null
  familyId: string
  userId: string
}