/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке*******
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton******
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract, ContractState } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";

export class BankController{
    private static instance: BankController;
    public vaultStore: Array<Vault>;
    private constructor() { 
        this.vaultStore = new Array<Vault>();
    }

    public static getInstance(): BankController {
        if (!BankController.instance) {
            BankController.instance = new BankController();
        }

        return BankController.instance;
    }
   

    public registerVault(vault: Vault): ISecureVaultRequisites{
        this.vaultStore.push(vault);
        
        return {id: vault.id};
    }

    public proceedContract(contract: IContract) {
       if(!contract){
           throw Error;
       } else{
          if(contract.state === ContractState.pending){
            contract.signAndTransfer;
          } else{
              throw Error;
          }
       }
    }
}

