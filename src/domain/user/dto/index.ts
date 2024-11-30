export type RegisterDTO = {
    id: number,
    username: string
}

export interface LoginDTO {
    user: {
      username: string
    }
    access_token: string
    refresh_token: string
}

  