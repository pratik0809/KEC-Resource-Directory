var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject("https://docs.google.com/spreadsheets/d/1yqrp2qgL2pRMuR_pTuZjsUBMg_Iw48Qu4sOJApdF9k8/pubhtml");

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
		{"mDataProp": "companyname", "sTitle": "Company Name", "sClass": "center"},
        {"mDataProp": "contactname", "sTitle": "Contact Name", "sClass": "center"},
        {"mDataProp": "contactemail", "sTitle": "Contact Email", "sClass": "center"},
		{"mDataProp": "category", "sTitle": "Category", "sClass": "center"},
		{"mDataProp": "address", "sTitle": "Address", "sClass": "center"},
		{"mDataProp": "website", "sTitle": "Website", "sClass": "center"},
        {"mDataProp": "emailcontactinfo", "sTitle": "Email Contact Info", "sClass": "center"}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict("#demo").html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");

    var oTable = jqueryNoConflict("#data-table-container").dataTable({
        "sPaginationType": "bootstrap",
        "iDisplayLength": 25,
        "aaData": dataSource,
        "aoColumns": createTableColumns(),
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            console.log(aData);
            $("td:eq(5)", nRow).html("<a href='http://" + aData.website + " target='_blank''>http://" + aData.website + "</a>");
            $("td:eq(2)", nRow).html("<a href='mailto:" + aData.contactemail + "'>"+ aData.contactemail +"</a>");
            $("td:eq(6)", nRow).html("<a href='mailto:?subject=Contact%20Info%20for%20"+ aData.companyname +"&body=Company%20Name:%20"+ aData.companyname + "%0D%0AContact%20Name:%20"+ aData.contactname +"%0D%0AContact%20Email:%20"+ aData.contactemail +"%0D%0AAddress:%20"+ aData.address +"%0D%0AWebsite:%20"+ aData.website +"'>Email Contact Info</a>");
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });

};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort["string-case-asc"]  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};