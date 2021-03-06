/*

Siesta 3.0.2
Copyright(c) 2009-2015 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Recorder.Editor.DragTarget', {
    extend          : 'Ext.form.field.Picker',
    alias           : 'widget.drageditor',

    editable        : false,
    hideTrigger     : true,
    pickerOffset    : [ 0, -20 ],
    
    sourceEditor    : null,
    targetEditor    : null,
    
    onTargetChange  : null,

    listeners       : {
        focus : function (fld, e, opts) {
            fld.expand();
        }
    },

    
    cancelEdit : function () {
        var me = this;
        
        me.fireEvent('blur');
        me.collapse();
    },

    
    applyValues : function () {
        var me          = this,
            form        = me.picker,
            values      = form.getForm().getValues()
            
        var rec         = me.up('gridpanel').editing.activeRecord;
            
        this.sourceEditor.applyChanges(rec)
        this.targetEditor.applyChanges(rec)
        
        var by          = values.by;
        
        rec.set('by', (by && rec.parseOffset(by)) || by)

        me.fireEvent('blur');
        me.collapse();
    },
    
    
    applyChanges : function () {
    },

    
    collapseIf : function (e) {
        if (!e.getTarget('.x-layer')) return this.callParent(arguments)
    },
    
    
    mimicBlur : function (e) {
        if (!e.getTarget('.x-layer')) return this.callParent(arguments)
    },
    
    
    createPicker : function () {
        var R               = Siesta.Resource('Siesta.Recorder.Editor.DragTarget');
        var me              = this;
        
        var targetListeners = {
            select  : this.onTargetChange,
            keyup   : this.onTargetChange,
            focus   : this.onTargetChange,
            buffer  : 50,
            scope   : this
        };

        return new Ext.form.Panel({
            ownerCt     : this,
            renderTo    : document.body,
            floating    : true,
            bodyPadding : 5,
            title       : R.get('dragVariantTitle'),
            items       : [
                this.sourceEditor = new Siesta.Recorder.Editor.Target({
                    fieldLabel  : R.get('targetLabel') + ':',
                    anchor      : '100%',
                    name        : 'target',
                    labelWidth  : 60,
                    listeners   : targetListeners
                }),
                this.targetEditor = new Siesta.Recorder.Editor.Target({
                    targetProperty   : 'toTarget',
                    
                    fieldLabel  : R.get('toLabel') + ':',
                    name        : 'toTarget',
                    anchor      : '100%',
                    labelWidth  : 60,

                    listeners   : targetListeners
                }),
                {
                    xtype       : 'textfield',
                    name        : 'by',
                    fieldLabel  : R.get('byLabel') + ':',
                    labelWidth  : 60,
                    width       : 200
                }
            ],
            listeners: {
                afterrender: function (panel, opts) {
                    var rec     = panel.up('gridpanel').editing.activeRecord;
                    
                    me.sourceEditor.populate(rec.get('target'))
                    me.targetEditor.populate(rec.get('toTarget'))
                    
                    panel.getForm().setValues(rec.data);
                }
            },
            buttons : [
                {
                    name    : 'cancel',
                    text    : R.get('cancelButtonText'),
                    handler : function (btn, e, opts) {
                        me.cancelEdit();
                    }
                },
                '->',
                {
                    name    : 'save',
                    text    : R.get('saveButtonText'),
                    handler : function (btn, e, opts) {
                        me.applyValues();
                    }
                }
            ]
        });
    }

});