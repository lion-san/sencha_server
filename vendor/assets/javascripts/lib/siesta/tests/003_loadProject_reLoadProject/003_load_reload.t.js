StartTest(function(t) {
  t.chain(
      {  waitFor :'componentVisible', args : '#naviView' },

      function(next){
        t.pass('Should load project');
        t.click(t.cq1('#load'), function(){
          t.diag('load button is tapped');
        });
        next();
      }

      );
});

