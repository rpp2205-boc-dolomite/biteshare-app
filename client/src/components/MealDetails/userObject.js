
export default class userObj {
  // name = ''
  // _meal = 0
  // _tip = 0

  constructor(name, meal, tip) {
    this.name = name || '';
    this._meal = meal || 0;
    this._tip = tip || 0;
  }

  get mealAmount() {
    return _meal;
  }
  get tipAmount() {
    return _tip;
  }
  get mealStr() {
    return _meal === NaN ? '$0.00' : '$' + _meal.toFixed(2).toString();
  }
  get tipStr() {
    return _tip === NaN ? '$0.00' : '$' + _tip.toFixed(2).toString();
  }
  set setMeal(meal) {
    this._meal = Number(meal);
  }
  set setTip(tip) {
    this._tip = Number(tip);
  }

  leanCopy() {
    return Object.assign({}, {
      name: this.name,
      meal_amount: this.mealAmount,
      tip_amount: this.tipAmount
    });
  }
}


//////////////////////////////////////

var a = new userObj()