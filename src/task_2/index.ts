/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency, CurrencyType} from "../task_1";

export class Dollar extends Currency{
    protected type = CurrencyType.material;
    constructor(value: number){
        super("Dollar", value, "USD")
    }
}

export class Ruble extends Currency{
    protected type = CurrencyType.material;
    constructor(value: number){
        super("Ruble", value, "RUB");
    }
}

export class XRP extends Currency{
    protected type = CurrencyType.cryptocurrency;
    constructor(value: number){
        super("XRP", value, "Ripple")
    }
}

export class Etherium extends Currency{
    protected type = CurrencyType.cryptocurrency;
    constructor(value: number){
        super("Etherium", value, "ETH")
    }
}

export class Gold extends Currency{
    protected type = CurrencyType.metalDeposit;
    constructor(value: number){
        super("Gold", value, "XAU")
    }
}