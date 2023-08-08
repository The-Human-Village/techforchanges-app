export interface TokenObserver {
  setToken(JWTtoken: string): void
  removeToken(): void
}
