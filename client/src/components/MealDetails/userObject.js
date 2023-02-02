
export default class userObj {
  name = ''
  _meal = 0
  _tip = 0

  static get mealAmount() {
    return _meal;
  }
  static get tipAmount() {
    return _tip;
  }
  static get mealStr() {
    return _meal === NaN ? '$0.00' : '$' + _meal.toFixed(2).toString();
  }
  static get tipStr() {
    return _tip === NaN ? '$0.00' : '$' + _tip.toFixed(2).toString();
  }
  static set meal(meal) {
    this._meal = Number(meal);
  }
  static set tip(tip) {
    this._tip = Number(tip);
  }

  constructor(name, meal, tip) {
    this.name = name || '';
    this._meal = meal || 0;
    this._tip = tip || 0;
  }

  leanCopy() {
    return Object.assign({}, {
      name: this.name,
      meal_amount: this.mealAmount,
      tip_amount: this.tipAmount
    });
  }
}