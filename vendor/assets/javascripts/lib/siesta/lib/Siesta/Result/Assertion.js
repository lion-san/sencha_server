/*

Siesta 3.0.2
Copyright(c) 2009-2015 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Result.Assertion', {
    
    isa : Siesta.Result,

    has : {
        name            : null,
        
        passed          : null,
        
        annotation      : null,
        
        index           : null,
        // stored as string
        sourceLine      : null,
        
        isSkipped       : false,
        isTodo          : false,
        
        isException     : false,
        exceptionType   : null,
        
        isWaitFor       : false,
        completed       : false      // for waitFor assertions
    },
    
    
    methods : {

        isPassed : function (raw) {
            if (raw) return this.passed
            
            if (this.isTodo) return true
            
            if (this.isWaitFor && !this.completed) return true
            
            return this.passed
        },
        
        
        toString : function () {
            var R = Siesta.Resource('Siesta.Result.Assertion');
            var text = (this.isTodo ? R.get('todoText') : '') + (this.passed ? R.get('passText') : R.get('failText')) + ' ' + this.index + ' - ' + this.description
            
            if (this.annotation) text += '\n' + this.annotation
            
            return text
        },
        
        
        toJSON : function () {
            var me      = this
            
            var info    = {
                type            : this.meta.name,
                passed          : this.passed,
                description     : String(this.description) || 'No description',
                annotation      : String(this.annotation)
            }
            
            // copy if true
            Joose.A.each([ 'isTodo', 'isWaitFor', 'isException', 'sourceLine', 'name' ], function (name) {
                if (me[ name ]) info[ name ] = me[ name ]
            })
            
            if (this.isException)   {
                info.exceptionType  = this.exceptionType
            }
            
            return info
        }
    }
})

