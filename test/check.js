'use strict';
let broadlink = require('../../broadlinkjs-sm');
let fs = require('fs');

var brln = new broadlink();

brln.discover();

brln.on("deviceReady", (dev) => {
    dev.check_power();

    if(dev.type == "SP3S")
        dev.check_energy();
//    console.log(dev.name + ":  " + dev.host.address + " (" + dev.mactxt + ") - FOUND");

    dev.on("mp_power", (status_array) => {
        console.log(dev.name + ":  " + dev.host.address + " (" + dev.mactxt + ")  /  " + dev.type + "  [Status: " +  status_array[0] + " : " + status_array[1] + " : " + status_array[2] + " : " + status_array[3] + " ]");
    });

    dev.on("power", (pwr) => {
        console.log(dev.name + ":  " + dev.host.address + " (" + dev.mactxt + ")  /  " + dev.type + "  [Status: " + pwr + " ]");
    });

    dev.on("energy", (enrg) => {
        console.log(dev.name + ":  " + dev.host.address + " (" + dev.mactxt + ")  /  " + dev.type + "  [Power: " + enrg + " w ]");
    });

});

setTimeout(function() {
    brln.discover();
}, 1000);

setTimeout(function() {
    brln.discover();
}, 2000);


setTimeout(function() {
    console.log("testing:");
    for (var d in brln.devices)
    {
        if(brln.devices[d])
            console.log(d + " = " + brln.devices[d].name);
    }
}, 6500);

setTimeout(function() {
    console.log("exiting:");
    for (var d in brln.devices)
    {
        if(brln.devices[d])
        {
            console.log(d + " = " + brln.devices[d].name);
            brln.devices[d].exit();
        }
    }
}, 12000);
