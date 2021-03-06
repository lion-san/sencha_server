/*

Siesta 3.0.2
Copyright(c) 2009-2015 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.ViewportController', {

    extend                    : 'Ext.app.ViewController',
    alias                     : 'controller.viewport',
    control                   : {
        testgrid : {
            selectionchange        : 'onTestGridSelectionChange',
            checkchange            : 'onTestGridCheckChange',
            itemcontextmenu        : 'onTestFileContextMenu',
            itemdblclick           : 'onTestFileDoubleClick',
            showcoverageinfo       : 'showCoverageReport',
            resize                 : 'onTestGridResize',
            optionchange           : 'onTestGridOptionChange',
            buttonclick            : 'onTestGridToolbarClick',
            framesizechange        : 'onFrameSizeChange'
        },

        'testgridcontextmenu #uncheckOthers' : { click : 'uncheckOthers' },
        'testgridcontextmenu #runThis'       : { click : 'runThisFile' },
        'testgridcontextmenu #uncheckAll'    : { click : 'uncheckAll' },
        'testgridcontextmenu #checkAll'      : { click : 'checkAll' },
        'testgridcontextmenu #expandAll'     : { click : 'expandAll' },
        'testgridcontextmenu #collapseAll'   : { click : 'collapseAll' },
        'testgridcontextmenu #filterToCurrentGroup'   : { click : 'filterToCurrentGroup' },
        'testgridcontextmenu #filterToFailed'   : { click : 'filterToFailed' },

        resultpanel : {
            viewdomchange : 'onDomPanelVisibilityChange',
            rerun         : 'rerunTest'
        },

        coveragereport : {
            backtomainui : 'onCoverageReportBackToMainUI'
        }
    },
    
    
    filterToFailed : function () {
        var viewport    = this.getView();
        
        var filter      = []

        viewport.forEachTestFile(function (testFileRecord) {
            var test = testFileRecord.get('test')

            if (test && test.isFailed()) filter.push(testFileRecord.get('title'))
        })
        
        if (filter.length) viewport.slots.filesTree.setFilterValue(filter.join(' | '))
    },
    
    
    filterToCurrentGroup : function () {
        var viewport    = this.getView();
        var desc        = viewport.currentFile.get('descriptor')
        
        if (desc.parent) viewport.slots.filesTree.setFilterValue(desc.parent.group + '>')
    },
    

    // Test Grid events
    onTestGridSelectionChange : function (selModel, selectedRecords) {

        if (selectedRecords.length) {
            var viewport = this.getView();
            var testFile = selectedRecords[0]
            var test = testFile.get('test')

            if (test) viewport.slots.resultPanel.showTest(test, testFile.get('assertionsStore'))

            viewport.selectedURL = testFile.getId()

            viewport.saveState()
        }
    },

    onTestGridCheckChange : function (testFile, checked) {
        var viewport = this.getView();

        viewport.setNodeChecked(testFile, checked)
    },

    onTestFileContextMenu : function (view, testFile, el, index, event) {
        var viewport = this.getView();

        viewport.currentFile = testFile

        if (!viewport.contextMenu) {
            viewport.contextMenu = new Siesta.Harness.Browser.UI.TestGridContextMenu();
        }

        viewport.contextMenu.showAt(event.getXY());

        event.preventDefault();
    },


    onTestFileDoubleClick : function (view, testFile) {
        var viewport    = this.getView();
        var testsStore  = viewport.testsStore

        if (testsStore.isTreeFiltered() && !testFile.isLeaf()) {
            var childDesc = []
            
            testFile.cascadeBy(function (node) {
                if (node != testFile && node.isLeaf() && testsStore.isNodeFilteredIn(node)) 
                    childDesc.push(node.get('descriptor'))
            })

            viewport.harness.launch(childDesc);
        } else
            viewport.launchTest(testFile);
    },

    showCoverageReport : function () {
        var viewport = this.getView();
        var resultPanel = viewport.slots.resultPanel;
        var cardCt = resultPanel.slots.cardContainer;
        var coverageReport = resultPanel.slots.coverageReport;

        coverageReport.loadHtmlReport(viewport.harness.generateCoverageHtmlReport(false));

        if (cardCt.getLayout().getActiveItem() !== coverageReport) {
            resultPanel.hideIFrame()
            resultPanel.slots.domContainer.collapse();

            cardCt.getLayout().setActiveItem(coverageReport)
        } else {
            this.onCoverageReportBackToMainUI();
        }
    },

    onTestGridResize : function () {
        // preserve min width of the assertion grid
        this.getView().slots.resultPanel.ensureLayout();
    },

    onTestGridOptionChange : function (component, optionName, optionValue) {
        var viewport = this.getView();

        viewport.setOption(optionName, optionValue)

        viewport.saveState()
    },


    onTestGridToolbarClick : function (hdr, button, action) {
        var viewport = this.getView();

        switch (action) {
            case 'run-checked':
                viewport.runChecked();
                break;
            case 'run-failed':
                viewport.runFailed();
                break;
            case 'run-all':
                viewport.runAll();
                break;
            case 'stop':
                viewport.stopSuite(button);
                break;
        }
    },

    onFrameSizeChange : function(slider, width, height, landscape) {
        var viewport = this.getView();

        if (!landscape) {
            var w = width;
            width = height;
            height = w;
        }

        $('.tr-iframe').width(width);
        $('.tr-iframe').height(height);

        viewport.harness.viewportHeight = height;
        viewport.harness.viewportWidth = width;
    },
    // EOF Test Grid events


    // Test Grid Context Menu events
    uncheckOthers    : function () {
        var viewport = this.getView();
        var currentFile = viewport.currentFile

        viewport.uncheckAllExcept(currentFile)

        viewport.setNodeChecked(currentFile, true)
    },

    runThisFile : function () {
        var viewport = this.getView();

        viewport.harness.launch([viewport.currentFile.get('descriptor')])
    },

    uncheckAll : function () {
        var viewport = this.getView();

        viewport.uncheckAllExcept()
    },

    checkAll : function () {
        var viewport = this.getView();

        viewport.testsStore.forEach(function (node) {
            viewport.setNodeChecked(node, true, true)
        })
    },
    
    expandAll : function () {
        var viewport = this.getView();

        viewport.slots.filesTree.expandAll()
    },
    
    collapseAll : function () {
        var viewport = this.getView();

        viewport.slots.filesTree.collapseAll()
    },
    // EOF Test Grid Context Menu events

    // Result Panel events
    onDomPanelVisibilityChange : function (g, value) {
        var viewport = this.getView();

        viewport.setOption('viewDOM', value);
        viewport.saveState();
    },

    rerunTest : function () {
        var viewport = this.getView();

        viewport.rerunTest();
    },
    // EOF Result Panel events


    // Coverage Panel events
    onCoverageReportBackToMainUI : function () {
        var viewport = this.getView();
        var resultPanel = viewport.slots.resultPanel;
        var cardCt = resultPanel.slots.cardContainer;

        cardCt.getLayout().setActiveItem(0)
        resultPanel.alignIFrame()
    }
    // EOF Coverage Panel events
})
