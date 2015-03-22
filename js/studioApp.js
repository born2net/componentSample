/**
 MediaSignage Inc Digital Signage open source component
 This file serves as the HTML properties view for the Sample SignagePlayer component
 **/


var x2js = new X2JS();
var m_data = {};
var m_hRsources = {};
var hResource = 0;
var skipSave = 0;

/**
 Stop event, used when dropping resource
 @method preventDefault
 @param {Event} event
 **/
function preventDefault(event) {
    event.preventDefault();
}

/**
 Dropped (after dragged) resource onto target
 @method drop
 @param {Event} ev
 **/
function drop(ev) {
    ev.preventDefault();
    var dropID = $(ev.target).attr('name');
    var str = getDragData();
    var data = JSON.parse(str);
    var d0 = data[0];
    var resource = d0.Resource;
    var m_hRsource = parseInt(resource.hResource);
    var name = buildResourceName(dropID);
    m_hRsources[name] = m_hRsource;
    // alert(JSON.stringify(m_hRsources));
    getObjectValue(0, 'getResourcePath(' + m_hRsource + ')', function (b) {
        $(ev.target).attr('src', JSON.parse(b));
    });
}

/**
 SAVE: get settings from UI and save to local msdb
 @method getData
 @return {XML} json to xml data
 **/
function getData() {
    m_data = {Data: {}};

    // get background color
    m_data.Data._bgColor = document.getElementById('bgColor').value;

    try {
        m_data.Data._url = $('#remoteUrl').val();

        // saved dragged images
        if (_.size(m_hRsources) != 0) {
            var n = 0;
            m_data.Data.Resource = {};
            for (var i in m_hRsources) {
                n++;
                var name = buildResourceName(n);
                m_data.Data.Resource[name] = m_hRsources[i];
            }
        }
    } catch (e) {
        log('err 2 ' + e);
    }

    // alert(JSON.stringify(m_data));
    // return data as xml
    return x2js.json2xml_str(m_data);
}

/**
 Construct the resource name saved into the msdb
 @method buildResourceName
 @param {Number} i_number
 **/
function buildResourceName(i_number) {
    return '_hResource' + i_number;
}

/**
 LOAD: populate the UI with from local msdb onto UI
 we also must re-apply all data to m_data.Data so it gets
 saved bacl to the local msdb via getData()
 @method setData
 @param {XML} i_xmlData
 **/
function setData(i_xmlData) {
    if (skipSave)
        return;

    try {

        m_data = x2js.xml_str2json(i_xmlData);

        if (m_data.Data._url != null) {
            $('#remoteUrl').val(m_data.Data._url)
            $('#img4').attr('src', m_data.Data._url);
        }

        if (m_data.Data.Resource != null) {
            var res = m_data.Data.Resource;
            var n = 0;
            for (var i in res) {
                var m_hRsource = res[i];
                getObjectValue(0, 'getResourcePath(' + m_hRsource + ')', function (b) {
                    var el = $('#draggedImages').children().get(n);
                    $(el).attr('src', JSON.parse(b));
                    m_hRsources[i] = m_hRsource;

                });
                n++;
            }
        }
        // set background color
        if (m_data.Data._bgColor != null) {
            $('#bgColor').val(m_data.Data._bgColor);
        }
    } catch (e) {
        log('err 1 ' + e);
    }
}

/**
 Alert the data that would be saved to msdb at time of execution
 @method showSavedData
 **/
function showSavedData() {
    alert(JSON.stringify(m_data) + ' ' + window.log);
}

/**
 Pick a random image from the resources (we get back all videos, images, swf, svg)
 but we selected to just accept png or jpg for this example. Of course you can
 choose videos or any other resource you like.
 Note that we load all resources since we pass a regexp of (".*")
 We could for example filter just resources starting with letter 'x'
 executing a regexp of 'getResources("^x")'
 @method showSavedData
 **/
function pickRandom() {
    try {

        getObjectValue(0, 'getResources(".*")', function (resources) {
            var oResources = JSON.parse(resources);
            var images = [];
            for (var i in oResources) {
                if (oResources[i].type == 'png' || oResources[i].type == 'jpg')
                    images.push(oResources[i]);
            }
            var random = _.random(0, images.length - 1);
            var selected = images[random];
            getObjectValue(0, 'getResourcePath(' + selected.handle + ')', function (e) {
                $('#img3').attr('src', JSON.parse(e));
            });
        });

    } catch (e) {
        log('err 3 ' + e);
    }
}

/**
 Example pf creating a new event and adding command and parmams to it
 @method createEvent
 **/
function createEvent() {
    log('addOnEve');
    getObjectValue(0, 'addEvent("some_important_event","some_command","some_command_params")', function (e) {
    });
}

/**
 Example of deleting an event
 @method deleteEvent
 **/
function deleteEvent() {
    getObjectValue(0, 'removeEventAt(0)', function (e) {
    });
}

/**
 DOM Ready
 @method onReady
 **/
$(document).ready(function () {
    var self = this;

    $('#tab-container').easytabs();

    $('#pickRandom').on('click', function (e) {
        pickRandom();
    });

    $('#showSavedData').on('click', function (e) {
        showSavedData();
    });

    $('#remoteUrl').on('blur',function(){
        var url = $(this).val();
        $('#img4').attr('src',url);
    });
});

