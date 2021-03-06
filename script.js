var dflt = {
    counter: true,
    hideInnerShadow: true,
}

var gg1 = new JustGage({
    id: 'gage1',
    value: 0,
    defaults: dflt,
    min: 0,
    max: 35,
    title: 'temperature',
    levelColors: [
                '#1200ff',
                '#FFFF00',
                'ff0000'
            ],
    customSelctors: [{
        color: '#1200ff',
        lo: 0,
        hi: 20
            }, {
        color: '#FFFF00',
        lo: 21,
        hi: 30
            }, {
        color: 'ff0000',
        lo: 31,
        hi: 35
            }],
});

var gg2 = new JustGage({
    id: 'gage2',
    title: 'humidity',
    min: 0,
    max: 100,
    defaults: dflt,
    value: 0,
    levelColors: [
                '#FFFF00',
                '#00ff00',
                '#1200ff'
            ],
    customSelctors: [{
        color: '#FFFF00',
        lo: 0,
        hi: 20
            }, {
        color: '#00ff00',
        lo: 21,
        hi: 60
            }, {
        color: '#1200ff',
        lo: 61,
        hi: 100
            }]
});

function update() {
    console.log('se actualizeaza...');
    $('#temp_s').removeClass('alert-danger');  
    $('#temp_s').removeClass('alert-success');   
    $('#temp_s').addClass('alert-warning');       
    $('#temp_s').text('Actualizare...');
    $('#umid_s').removeClass('alert-danger'); 
    $('#umid_s').removeClass('alert-success');
    $('#umid_s').addClass('alert-warning');   
    $('#umid_s').text('Actualizare...');

    $.get(location.protocol+'//'+location.host+'/temp', function (data) {
        gg1.refresh(data);
    }).done(function () {
        $('#temp_s').removeClass('alert-warning');
        $('#temp_s').removeClass('alert-danger');
        $('#temp_s').addClass('alert-success');
        $('#temp_s').text('Actualizat cu succes');
        console.log('OK 4 temp');
    }).fail(function () {
        $('#temp_s').removeClass('alert-success');
        $('#temp_s').removeClass('alert-warning');
        $('#temp_s').addClass('alert-danger');
        $('#temp_s').text('Eroare');
        console.log('ERROR 4 temp');
    }).always(function () {});

    $.get(location.protocol+'//'+location.host+'/umid', function (data) {
        console.log('OK 4 umid');
        gg2.refresh(data);
    }).done(function () {
        $('#umid_s').removeClass('alert-danger');
        $('#umid_s').removeClass('alert-warning');
        $('#umid_s').addClass('alert-success');
        $('#umid_s').text('Actualizat cu succes');
        console.log('OK 4 umid');
    }).fail(function () {
        $('#umid_s').removeClass('alert-success');
        $('#umid_s').removeClass('alert-warning');
        $('#umid_s').addClass('alert-danger');
        $('#umid_s').text('Eroare');
        console.log('ERROR 4 umid');
    }).always(function () {});
};
update();
setInterval(function () {
    update();
}, 20000);
