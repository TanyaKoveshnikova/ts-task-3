/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency, CurrencyType } from "../task_1";
import { ISecureVaultRequisites, Vault } from "../task_3";
import { BankController } from "../task_5";

abstract class IContractStart implements IContract{
    id: number;
    state: ContractState;
    value: Currency;
    sender: ISecureVaultRequisites;
    receiver: ISecureVaultRequisites;
    public static counterForIdContract = 0;
    constructor(){
        this.state = ContractState.pending;
        this.id = IContractStart.counterForIdContract;
        IContractStart.counterForIdContract++;
    }
    signAndTransfer(): void{
        const sender: Vault = BankController.getInstance().vaultStore.find(x => x.id === this.sender.id);
        const receiver: Vault = BankController.getInstance().vaultStore.find(x => x.id === this.receiver.id);
        if(!this.receiver || !this.sender || !this.id || !this.state ){
            this.rejectTransfer();
            throw Error;
        } else{
            try{
                (sender).withdraw(this.value);
                (receiver).deposit(this.value);

                this.closeTransfer();
            }catch{
                this.rejectTransfer();
                
            this.state = ContractState.transfer;
            }
        }
    }
    closeTransfer(): void{
        this.state = ContractState.close;
    }
    rejectTransfer() : void{
        this.state = ContractState.rejected;
    }
    
}

export class SmartContract extends IContractStart{  
    signAndTransfer(): void {
        if(this.value.CurrencyType === CurrencyType.cryptocurrency ){
            setTimeout(() => {
                super.signAndTransfer();
            }, 3000)
        } else{
            throw Error('Выбран не тот тип контракта')
        }
    }
}

export class BankingContract extends IContractStart{
    signAndTransfer(): void {
        if(this.value.CurrencyType === CurrencyType.material ){
            super.signAndTransfer();
        } else{
            throw Error('Выбран не тот тип контракта')
        }
    }
}

export class LogisticContract extends IContractStart{
    signAndTransfer(): void {
        if(this.value.CurrencyType === CurrencyType.metalDeposit ){
            setTimeout(() => {
                super.signAndTransfer();
            }, 6000)
        } else{
            throw Error('Выбран не тот тип контракта')
        }
    }
}


export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number,
    /**
     * Текущее состояние контракта
     */
    state: ContractState,
    /**
     * Предмет контракта
     */
    value: Currency,
    /**
     * Реквизиты отправителя
     */
    sender: ISecureVaultRequisites,
    /**
     * Реквизиты получателя
     */
    receiver: ISecureVaultRequisites,
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: (value: CurrencyType) => void,
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void,
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void

}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}
