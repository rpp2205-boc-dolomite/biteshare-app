
export default class userObj {

  constructor(name, id, phone_num, meal, tip) {
    this.name = name || '';
    this.id = id || '';
    this.phone_num = phone_num || '';
    this._meal = Number(meal) || 0;
    this._tip = Number(tip) || 0;
  }

  get meal() {
    return this._meal;
  }
  get tip() {
    return this._tip;
  }
  get mealStr() {
    return this.meal === NaN ? '$0.00' : '$' + this.meal.toFixed(2).toLocaleString();
  }
  get tipStr() {
    return this.tip === NaN ? '$0.00' : '$' + this.tip.toFixed(2).toLocaleString();
  }
  set meal(meal) {
    this._meal = Math.abs(Number(meal.replace(/[^0-9.-]+/g,"")).toFixed(2));
  }
  set tip(tip) {
    this._tip = Math.abs(Number(tip.replace(/[^0-9.-]+/g,"")).toFixed(2));
  }

  getCopy() {
    return Object.assign({}, {
      name: this.name,
      id: this.id,
      phone_num: this.phone_num,
      meal_amount: this.meal,
      tip_amount: this.tip
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