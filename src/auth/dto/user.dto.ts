export interface UserDto {
  id: number;
  username: string;
  password: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
}
