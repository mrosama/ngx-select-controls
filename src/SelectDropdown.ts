import "rxjs/Rx";
import {Component, Input, forwardRef, Provider, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
import {NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, ControlValueAccessor, Control} from "@angular/common";
import {SelectItems} from "./SelectItems";
import {DROPDOWN_DIRECTIVES, Dropdown} from "ng2-dropdown";
import {Observable} from "rxjs/Rx";

@Component({
    selector: "select-dropdown",
    template: `
<div class="select-dropdown">
    <div class="dropdown" dropdown>
        <div class="select-dropdown-box" tabindex="1" dropdown-open>
            <div *ngIf="isMultiple()">
                <span [hidden]="listSelectItems.getItems().length > 0">
                    <span class="no-selection" [class.readonly]="readonly" [class.disabled]="disabled">{{ readonly ? (readonlyLabel || label) : label }}</span>
                </span>
                <select-items #listSelectItems
                      [hideControls]="true"
                      [items]="model"
                      [labelBy]="valueBy ? listLabelBy : (listLabelBy || labelBy)"
                      [trackBy]="valueBy ? listTrackBy : (listTrackBy || trackBy)"
                      [disabled]="disabled"
                      [readonly]="true"></select-items>
            </div>
            <div *ngIf="!isMultiple()">
                <span [hidden]="model">
                    <span class="no-selection" [class.readonly]="readonly" [class.disabled]="disabled">{{ readonly ? (readonlyLabel || label) : label }}</span>
                </span>
                <span [hidden]="!model">
                    <span class="single-selected" [class.readonly]="readonly" [class.disabled]="disabled">{{ getItemLabel(model) }}</span>
                </span>
            </div>
            <div style="clear: left"></div>
        </div>
        <div dropdown-not-closable-zone>
            <div class="dropdown-menu"
                [class.hidden]="readonly || disabled || (!dropdownSelectItems.getItems().length && !searchBy)">
                <select-items #dropdownSelectItems
                    [(ngModel)]="model" 
                    (ngModelChange)="onModelChange()" 
                    [items]="items"
                    [multiple]="isMultiple()"
                    [limit]="limit"
                    [disabled]="disabled"
                    [labelBy]="labelBy"
                    [trackBy]="trackBy"
                    [valueBy]="valueBy"
                    [disableBy]="disableBy"
                    [searchBy]="searchBy"
                    [searchLabel]="searchLabel"
                    [orderBy]="orderBy"
                    [orderDirection]="orderDirection"
                    [selectAllLabel]="selectAllLabel"
                    [noSelectionLabel]="noSelectionLabel"
                    [hideControls]="hideControls"
                    [maxModelSize]="maxModelSize"
                    [minModelSize]="minModelSize"
                    [filter]="filter"></select-items>
            </div>
        </div>
    </div>
</div>`,
    styles: [`
.select-dropdown .hidden {
    display: none;
}
.select-dropdown .select-dropdown-box {
    outline: none;
}
.select-dropdown .select-dropdown-box .select-items-item {
    display: inline-block;
}
.select-dropdown .btn-plus {
    border-left: none;
}
.select-dropdown .dropdown.open .dropdown-menu {
    display: block;
}
.select-dropdown .select-dropdown-box .single-selected, 
.select-dropdown .select-dropdown-box .select-items .select-items-item .select-items-label, 
.select-dropdown .select-dropdown-box .no-selection {
    color: #337ab7;
    border-bottom: 1px dashed #337ab7;
    cursor: pointer;
}
.select-dropdown .dropdown-menu .select-items .select-items-item.selected {
    text-decoration: none;
    color: #fff;
    background-color: #0095cc;
}
.select-dropdown .select-dropdown-box .single-selected.disabled, 
.select-dropdown .select-dropdown-box .no-selection.disabled {
    color: #CCC;
    border-bottom: 1px dashed #CCC;
}
.select-dropdown .select-dropdown-box .single-selected.readonly, 
.select-dropdown .select-dropdown-box .no-selection.readonly {
    color: #333;
    border: none;
    cursor: default;
}
.select-dropdown .select-dropdown-box .select-items .select-items-item .separator {
    padding-right: 2px;
}
.select-dropdown .select-dropdown-box .select-items .select-items-item .separator:before {
    content: ",";
}
.select-dropdown .dropdown-menu .select-items .no-selection,
.select-dropdown .dropdown-menu .select-items .select-all,
.select-dropdown .dropdown-menu .select-items .checkbox-item,
.select-dropdown .dropdown-menu .select-items .radio-item {
    padding: 3px 15px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857;
    white-space: nowrap;
    display: block;
}
.select-dropdown .dropdown-menu .select-items .no-selection:hover,
.select-dropdown .dropdown-menu .select-items .select-all:hover,
.select-dropdown .dropdown-menu .select-items .checkbox-item:hover,
.select-dropdown .dropdown-menu .select-items .radio-item:hover {
    text-decoration: none;
    color: #fff;
    background-color: #0095cc;
    cursor: pointer;
}
.select-dropdown .dropdown-menu .select-items .checkbox-item.disabled:hover,
.select-dropdown .dropdown-menu .select-items .radio-item.disabled:hover {
    color: #333;
    background-color: #eeeeee;
    cursor: not-allowed;
}
.select-dropdown .dropdown-menu .select-items .select-items-search {
    margin: 0 5px 5px 5px;
}
`],
    encapsulation: ViewEncapsulation.None,
    directives: [
        SelectItems,
        DROPDOWN_DIRECTIVES
    ],
    providers: [
        new Provider(NG_VALUE_ACCESSOR, {
            useExisting: forwardRef(() => SelectDropdown),
            multi: true
        }),
        new Provider(NG_VALIDATORS, {
            useExisting: forwardRef(() => SelectDropdown),
            multi: true
        })
    ]
})
export class SelectDropdown implements ControlValueAccessor, Validator {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

    @Input()
    items: any[];

    @Input()
    label: string = "click to select";

    @Input()
    readonly: boolean = false;

    @Input()
    readonlyLabel: string;

    @Input()
    multiple: boolean;

    @Input()
    listTrackBy: string|((item: any) => string);

    @Input()
    listLabelBy: string|((item: any) => string);

    @Input()
    trackBy: string|((item: any) => string);

    @Input()
    labelBy: string|((item: any) => string);

    @Input()
    valueBy: string|((item: any) => any);

    @Input()
    disableBy: string|((item: any) => string);

    @Input()
    searchBy: string|((item: any, keyword: string) => boolean);

    @Input()
    orderBy: string|((item1: any, item2: any) => number);

    @Input()
    orderDirection: "asc"|"desc";

    @Input()
    disabled: boolean = false;

    @Input()
    limit: number;

    @Input()
    noSelectionLabel: string;

    @Input()
    searchLabel: string;

    @Input()
    selectAllLabel: string;

    @Input()
    hideControls: boolean;

    @Input()
    maxModelSize: number;

    @Input()
    minModelSize: number;

    @Input()
    filter: (items: any[]) => any[];

    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------

    @ViewChild(Dropdown)
    dropdown: Dropdown;

    onChange: (m: any) => void;
    private onTouched: (m: any) => void;
    private model: any;

    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------

    writeValue(value: any): void {
        this.model = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // -------------------------------------------------------------------------
    // Implemented from Validator
    // -------------------------------------------------------------------------

    validate(c: Control): any {
      /*  if (this.required && (!c.value || (c.value instanceof Array) && c.value.length === 0)) {
            return {
                required: true
            };
        }*/
        return null;
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    isMultiple() {
        if (this.multiple !== undefined)
            return this.multiple;

        return this.model instanceof Array;
    }

    getItemLabel(item: any) { // todo: duplication
        if (!item) return;
        
        if (this.labelBy) {
            if (typeof this.labelBy === "string") {
                return item[this.labelBy as string];

            } else if (typeof this.labelBy === "function") {
                return (this.labelBy as any)(item);
            }
        }

        return item;
    }

    onModelChange() {
        if (!this.isMultiple()) {
            this.dropdown.close();
        }
    }


}