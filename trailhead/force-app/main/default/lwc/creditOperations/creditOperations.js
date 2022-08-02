import { LightningElement,track,wire } from 'lwc';
import getJsonData from '@salesforce/apex/Controller.getAndParse';




const COLS = [
    { label: 'Creditor', fieldName: 'creditorName', type:'text' },
    { label: 'First Name', fieldName: 'firstName', type: 'text' },
    { label: 'Last Name', fieldName: 'lastName', type: 'text' },
    { label: 'Min Payment %', fieldName: 'minPaymentPercentage', type: 'percentage' },
    { label: 'Balance', fieldName: 'balance', type: 'currency'}
]; 
export default class CreditOperations extends LightningElement {
    cols=COLS;  
	@track openModal = false;
    sfsdata = [];
    totalRows;
    addBalance;
    selectedRow;
    selectedRowCount;
    cName;
    fName;
    lName;
    payment;
    balance;
    Idstack = [];
	error;

    
	@wire(getJsonData)
    wiredJson({ error, data }) {
        if (data) {
            this.sfsdata =  JSON.parse(data);
			for(let obj of this.sfsdata){
				this.Idstack.push(obj.id); 
			 }
		   this.totalRows = this.sfsdata.length;
			 console.log(this.sfsdata);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.sfsdata = undefined;
        }
    }

  
    balanceOFSelectedRows(event){
        let totalAmount = 0;
        for(let obj of event.detail.selectedRows){
            totalAmount += obj.balance;
        }
        this.addBalance =totalAmount;
        }

    selectedRows(event){
		let totalAmount = 0;
		this.selectedRow = event.detail.selectedRows;
		this.selectedRowCount = this.selectedRow.length;
		console.log('Count : ' +this.selectedRowCount);

			for(let obj of event.detail.selectedRows){
				totalAmount += obj.balance;
			}
			this.addBalance =totalAmount;
		}

    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }


    addRowInTable(){
        let objArray= [];
        let Object={creditorName:this.cName, firstName: this.fName, lastName: this.lName,
            minPaymentPercentage: this.payment, balance: this.balance, id:this.generateId(100, 1)}
        objArray.push(...this.sfsdata,Object);
        this.sfsdata=objArray;
        this.totalRows = this.sfsdata.length;
        this.openModal = false;
    }


    changeCreditor(event){
		this.cName = event.target.value;
    }

    changeFirstName(event){
        this.fName = event.target.value;
    }

    changeLastName(event){
        this.lName = event.target.value;
    }

    changePayment(event){
        this.payment = event.target.value;
    }

    changeBalance(event){
        this.balance = event.target.value;
		
    }

    generateId(max, min){
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (this.Idstack.includes(num)) ? this.generateId(min, max) : num;
    }


    deleteRowFromTable(){
		let result;
		for(let obj of this.selectedRow){
		result = this.sfsdata.filter(obj1 => {return obj1.id !== obj.id});
		console.log('result'+result);
		this.sfsdata = [].concat(...result);
		this.totalRows = this.sfsdata.length; 
		}
	}
}