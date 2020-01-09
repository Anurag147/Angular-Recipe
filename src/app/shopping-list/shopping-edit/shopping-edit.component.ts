import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  //@ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  //@ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('form',{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode:boolean=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {

    //Subscribe to subject change when item is clicked for editing in shopping list
    this.subscription = this.slService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });
    });
  }

  onAddItem() {
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    const formValue=this.slForm.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
