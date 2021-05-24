class User {
  constructor(
    name: string,
    email: string,
    password: string,
    method: 'GOOGLE' | 'FACEBOOK' | 'EMAIL',
    contact: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.signin_method = method;
    if (contact.length !== 0) {
      this.contact = contact;
    }
  }
}

export default User;
