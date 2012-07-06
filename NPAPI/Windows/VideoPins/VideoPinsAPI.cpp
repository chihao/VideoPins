/**********************************************************\

  Auto-generated VideoPinsAPI.cpp

\**********************************************************/

#include "JSObject.h"
#include "variant_list.h"
#include "DOM/Document.h"
#include "global/config.h"

#include "VideoPinsAPI.h"

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::echo(const FB::variant& msg)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
FB::variant VideoPinsAPI::echo(const FB::variant& msg)
{
    static int n(0);
    fire_echo("So far, you clicked this many times: ", n++);

    // return "foobar";
    return msg;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::vFindWindow(const std::wstring class_name, const std::wstring title_name)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::vFindWindow(const std::wstring class_name, const std::wstring title_name)
{
	return (int) FindWindow(class_name.c_str(), title_name.c_str());
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::HookWindow(const int t_hWnd, const int x, const int y, const int width, const int height)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::HookWindow(const int t_hWnd, const int x, const int y, const int width, const int height)
{
	HWND hWnd = (HWND) t_hWnd;
	::SetWindowPos(
			hWnd,                                // handle to window
            HWND_TOPMOST,         // placement-order handle
            x,                                         // horizontal position
            y,                                         // vertical position
            width,                                // width
            height,                              // height
            SWP_SHOWWINDOW // window-positioning options
	);
	
	return (int) hWnd;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::ReHookWindow(const int t_hWnd)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::ReHookWindow(const int t_hWnd)
{	
	HWND hWnd = (HWND) t_hWnd;
	RECT rcWind;
	GetWindowRect(hWnd, &rcWind);
	::SetWindowPos(
			hWnd,                                              // handle to window
            HWND_TOPMOST,                       // placement-order handle
            rcWind.left,                                     // horizontal position
            rcWind.top,                                     // vertical position
            (rcWind.right - rcWind.left),       // width
            (rcWind.bottom - rcWind.top), // height
            SWP_SHOWWINDOW                // window-positioning options
	);
	
	return (int) hWnd;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::UnHookWindow(const int t_hWnd)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::UnHookWindow(const int t_hWnd)
{	
	HWND hWnd = (HWND) t_hWnd;
	RECT rcWind;
	GetWindowRect(hWnd, &rcWind);
	::SetWindowPos(
			hWnd,                                              // handle to window
            HWND_NOTOPMOST,                 // placement-order handle
            rcWind.left,                                     // horizontal position
            rcWind.top,                                     // vertical position
            (rcWind.right - rcWind.left),       // width
            (rcWind.bottom - rcWind.top), // height
            SWP_SHOWWINDOW                // window-positioning options
	);
	
	return (int) hWnd;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn VideoPinsPtr VideoPinsAPI::getPlugin()
///
/// @brief  Gets a reference to the plugin that was passed in when the object
///         was created.  If the plugin has already been released then this
///         will throw a FB::script_error that will be translated into a
///         javascript exception in the page.
///////////////////////////////////////////////////////////////////////////////
VideoPinsPtr VideoPinsAPI::getPlugin()
{
    VideoPinsPtr plugin(m_plugin.lock());
    if (!plugin) {
        throw FB::script_error("The plugin is invalid");
    }
    return plugin;
}

// Read/Write property testString
std::string VideoPinsAPI::get_testString()
{
    return m_testString;
}

void VideoPinsAPI::set_testString(const std::string& val)
{
    m_testString = val;
}

// Read-only property version
std::string VideoPinsAPI::get_version()
{
    return FBSTRING_PLUGIN_VERSION;
}

void VideoPinsAPI::testEvent()
{
    fire_test();
}
