
function openWindow()
{
    var newWindow = new Object();
    newWindow.url = "http://www.google.com";
    newWindow.type = "normal";

    chrome.windows.create(newWindow);
}

function plugintest()
{
    var plugin = document.getElementById("plugin0");
    console.log(plugin);
    return plugin.add(1, 5);  // call a method in your plugin
    // return plugin.echo("This plugin seems to be working!");  // call a method in your plugin
}

function dlltest()
{
    var plugin = document.getElementById("dll");
    console.log(plugin);
    return plugin.add(1, 5);  // call a method in your plugin
    // return plugin.echo("This plugin seems to be working!");  // call a method in your plugin
}
dlltest();
/*
function openTab(url, selected)
{
    var tab = new Object()
    tab.url = url;
	tab.selected = (typeof selected == "undefined")? false : selected;

	chrome.tabs.create(tab);
}
*/