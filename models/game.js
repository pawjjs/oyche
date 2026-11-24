export default class Game{
  // constructor(id, user){
  //   this.id = id;
  //   this.round = 0;
  //   this.user = user;
  // }

  constructor(id, owner){
    this.id = id;
    this.round = 0;
    this.owner = owner
    this.players = [owner]
    this.logic = null;
  }

  wypisanie() {
    console.log("ID: " + this.id);
    console.log("Runda: " + this.round);
    // console.log("Właściciel: ");
    // this.user.wypisanie();
    console.log(`Wlasciciel: ${this.owner.username}`)
    console.log(`Gracze: ${this.players.map(p => p.username)}`)
  }
}