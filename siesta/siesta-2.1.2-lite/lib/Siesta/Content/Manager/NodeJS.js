/*

Siesta 2.1.2
Copyright(c) 2009-2015 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Content.Manager.NodeJS', {
    
    isa     : Siesta.Content.Manager,
    
    methods : {
        
        load : function (url, callback, errback) {
            
            try {
                var content = require('fs').readFileSync(url, 'utf8')
                
            } catch (e) {
                errback(e)
                
                return
            }
            
            callback(content)
        }
    }
})

