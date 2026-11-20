export default class User{
  constructor(id, username, email, password_hash){
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
  }

  wypisanie() {
    console.log("ID: " + this.id);
    console.log("Username: " + this.username);
    console.log("Email: " + this.email);
  }
}