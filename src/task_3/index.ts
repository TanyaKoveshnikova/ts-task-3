/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>();
	public static counterForId = 0;

	constructor(){
		this.id = Vault.counterForId;
		Vault.counterForId++;
	}

	public deposit(currency: Currency){
	let checkStore = false;
		this.store.forEach(cur => {
			if(cur.name === currency.name){
				cur.value += currency.value;
				checkStore = true;
			}
		});
	
		if(!checkStore){
			this.store.add(currency);
		}
	}

	public withdraw(currency: Currency){
		let checkStore = false;
		this.store.forEach(cur => {
			if(cur.name === currency.name){
				if(cur.value < currency.value){
					throw Error("Нет столько денег, чтобы снимать столько");
				} else{
					cur.value -= currency.value;
					checkStore = true;
				}
			}
		});

		if(!checkStore){
			throw Error("Нет снимаемой валюты");
		}
	}

	public transfer(currency: Currency, vault: Vault){
		let checkStore = false;
		this.store.forEach(cur => {
			if(cur.name === currency.name){
				if(cur.value < currency.value){
					throw Error("Мало денег для перевода");
				} else{
					vault.deposit(currency);
					cur.value -= currency.value;
					checkStore = true;
				}
			}
		});

		if(!checkStore){
			throw Error("Нет такой валюты");
		}
	}
}


export interface ISecureVaultRequisites{
	id: number;
}
