export interface Credentials {
  email: string;
  password: string;
}

export interface RegisteredUser {
  readonly userId: string;
  readonly email: string;
  /** Mock-only credential reference — not production security. */
  readonly passwordKey: string;
}
