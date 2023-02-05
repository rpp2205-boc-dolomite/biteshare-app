
export default class userObj {

  constructor(name, id, phone_num, meal, tip) {
    this.name = name || '';
    this.id = id || '';
    this.phone_num = phone_num || '';
    this._meal = meal || 0;
    this._tip = tip || 0;
  }

  get meal() {
    return this._meal;
  }
  get tip() {
    return this._tip;
  }
  get mealStr() {
    return this._meal === NaN ? '$0.00' : '$' + this._meal.toFixed(2).toLocaleString();
  }
  get tipStr() {
    return this._tip === NaN ? '$0.00' : '$' + this._tip.toFixed(2).toLocaleString();
  }
  set meal(meal) {
    this._meal = Number(meal.replace(/[^0-9.-]+/g,""));
  }
  set tip(tip) {
    this._tip = Number(tip.replace(/[^0-9.-]+/g,""));
  }

  getCopy() {
    return Object.assign({}, {
      name: this.name,
      id: this.id,
      phone_num: this.phone_num,
      meal_amount: this._meal.toFixed(2),
      tip_amount: this._tip.toFixed(2)
    });
  }
}


//////////////////////////////////////
//    TESTING
//////////////////////////////////////
// var a = new userObj('Gregory', 12.95, 2.50);

// console.log('Name:', a.name);
// console.log('Meal:', a.meal);
// console.log('Tip:', a.tip);

// a.meal = 44.55;
// a.tip = 7.77;

// console.log('Name:', a.name);
// console.log('Meal:', a.meal);
// console.log('Tip:', a.tip);