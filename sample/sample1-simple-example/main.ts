import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {RADIO_GROUP_DIRECTIVES} from "../../src/index";

@Component({
    selector: "app",
    template: `
<div class="container">

    <h4>Is something enabled: (non-multiple checkbox)</h4>
    <input type="checkbox" [(ngModel)]="isSomethingEnabled"/>
    <i (click)="click()">isSomethingEnabled value:</i> <b>{{ isSomethingEnabled }}</b><br/><br/>

    <h4>Order by: (multiple check boxes)</h4>
    <input type="checkbox" [(ngModel)]="orderBy" value="rating"> Rating<br/>
    <input type="checkbox" [(ngModel)]="orderBy" value="date"> Date<br/>
    <input type="checkbox" [(ngModel)]="orderBy" value="watches"> Watch count<br/>
    <input type="checkbox" [(ngModel)]="orderBy" value="comments"> Comment count<br/>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    

    <h4>Sort by: (simple radio boxes)</h4>
    <input type="radio" [(ngModel)]="sortWithoutGroup" value="rating"> Rating<br/>
    <input type="radio" [(ngModel)]="sortWithoutGroup" value="date"> Date<br/>
    <input type="radio" [(ngModel)]="sortWithoutGroup" value="watches"> Watch count<br/>
    <input type="radio" [(ngModel)]="sortWithoutGroup" value="comments"> Comment count<br/>
    
    <i>selected item:</i> <b>{{ sortWithoutGroup }}</b><br/><br/>


    <h4>Sort by: (radio boxes wrapped in the group)</h4>
    <radio-group [(ngModel)]="sortBy">
        <input type="radio" value="rating"> Rating<br/>
        <input type="radio" value="date"> Date<br/>
        <input type="radio" value="watches"> Watch count<br/>
        <input type="radio" value="comments"> Comment count<br/>
    </radio-group>
    
    <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>


    <h4>Order by: (check boxes wrapped in the group)</h4>
    <checkbox-group [(ngModel)]="orderBy">
        <input type="checkbox" value="rating"> Rating<br/>
        <input type="checkbox" value="date"> Date<br/>
        <input type="checkbox" value="watches"> Watch count<br/>
        <input type="checkbox" value="comments"> Comment count<br/>
    </checkbox-group>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    
    
    <h4>Sort by: (check boxes in group, less flexible, but simpler and the whole component is clickable)</h4>
    <radio-group [(ngModel)]="sortBy">
        <radio-item value="rating">Rating</radio-item>
        <radio-item value="date">Date</radio-item>
        <radio-item value="watches">Watch count</radio-item>
        <radio-item value="comments">Comment count</radio-item>
    </radio-group>
    
    <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>


    <h4>Order by: (radio boxes in group, less flexible, but simpler and the whole component is clickable)</h4>
    <checkbox-group [(ngModel)]="orderBy">
        <checkbox-item value="rating">Rating</checkbox-item>
        <checkbox-item value="date">Date</checkbox-item>
        <checkbox-item value="watches">Watch count</checkbox-item>
        <checkbox-item value="comments">Comment count</checkbox-item>
    </checkbox-group>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>


    <h4>Example with form:</h4>

    <form>
        <radio-group ngControl="sortByControl" #sortByRadioGroup="ngForm" [(ngModel)]="sortBy" [required]="true">
            <input type="radio" value=""> Not selected<br/>
            <input type="radio" value="rating"> Rating<br/>
            <input type="radio" value="date"> Date<br/>
            <input type="radio" value="watches"> Watch count<br/>
            <input type="radio" value="comments"> Comment count<br/>
        </radio-group>
        <div [hidden]="sortByRadioGroup.valid || sortByRadioGroup.pristine" class="alert alert-danger">
            Sort by is required
        </div>
    
        <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>
        
        <checkbox-group ngControl="orderByControl" #orderByCheckboxGroup="ngForm" [(ngModel)]="orderBy" [required]="true">
            <checkbox-item value="rating">Rating</checkbox-item>
            <checkbox-item value="date">Date</checkbox-item>
            <checkbox-item value="watches">Watch count</checkbox-item>
            <checkbox-item value="comments">Comment count</checkbox-item>
        </checkbox-group>
        <div [hidden]="orderByCheckboxGroup.valid || orderByCheckboxGroup.pristine" class="alert alert-danger">
            Order by is required
        </div>
    
        <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    </form>
    
</div>
`,
    directives: [RADIO_GROUP_DIRECTIVES]
})
export class Sample1App {

    isSomethingEnabled: boolean = false;
    sortBy: string = "date";
    orderBy: string[] = ["rating", "comments"];

    click(a: any) {
        console.log(this.isSomethingEnabled);
    }

}

bootstrap(Sample1App);