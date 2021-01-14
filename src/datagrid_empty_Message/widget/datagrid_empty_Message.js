import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';

import registry from 'dijit/registry';
import aspect from 'dojo/aspect';
import lang from 'dojo/_base/lang';


export default defineWidget('datagrid_empty_Message', false, {

    _obj: null,
    

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
    },

    update(obj, callback) {

        const queryName = 'mx-name-' + this.key;
        const domList = document.getElementsByClassName(queryName);
        this.grid = registry.byNode(domList[domList.length - 1]);
        const table = this.grid.gridTable;
        const html = '<div class="hide" style="text-align: center;padding: 10px;margin: 10px;">' + this.message + '</div>'
        table.insertAdjacentHTML('afterend', html);
        
        aspect.after(this.grid, "fillGrid", lang.hitch(this, 
            function refresh() {
        
                console.log('datagrid refreshed');
                
                if (this.grid.getCurrentGridSize() === 0) {
                    console.log('datagrid empty');
                    this.grid.contentNode.lastElementChild.classList.remove("hide");
                    
                } else {
                    
                    console.log('datagrid not empty');
                    this.grid.contentNode.lastElementChild.classList.add("hide");
                    
                }
          }));
    
        if(callback) {callback();}
    },
});
