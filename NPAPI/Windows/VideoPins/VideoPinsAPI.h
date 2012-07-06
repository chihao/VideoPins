/**********************************************************\

  Auto-generated VideoPinsAPI.h

\**********************************************************/

#include <string>
#include <sstream>
#include <boost/weak_ptr.hpp>
#include "JSAPIAuto.h"
#include "BrowserHost.h"
#include "VideoPins.h"

#include <windows.h>
#include <windowsx.h>

#ifndef H_VideoPinsAPI
#define H_VideoPinsAPI

class VideoPinsAPI : public FB::JSAPIAuto
{
public:
    ////////////////////////////////////////////////////////////////////////////
    /// @fn VideoPinsAPI::VideoPinsAPI(const VideoPinsPtr& plugin, const FB::BrowserHostPtr host)
    ///
    /// @brief  Constructor for your JSAPI object.
    ///         You should register your methods, properties, and events
    ///         that should be accessible to Javascript from here.
    ///
    /// @see FB::JSAPIAuto::registerMethod
    /// @see FB::JSAPIAuto::registerProperty
    /// @see FB::JSAPIAuto::registerEvent
    ////////////////////////////////////////////////////////////////////////////
    VideoPinsAPI(const VideoPinsPtr& plugin, const FB::BrowserHostPtr& host) :
        m_plugin(plugin), m_host(host)
    {
        registerMethod("echo",      make_method(this, &VideoPinsAPI::echo));
        registerMethod("vFindWindow", make_method(this, &VideoPinsAPI::vFindWindow));
        registerMethod("HookWindow", make_method(this, &VideoPinsAPI::HookWindow));
        registerMethod("ReHookWindow", make_method(this, &VideoPinsAPI::ReHookWindow));
        registerMethod("UnHookWindow", make_method(this, &VideoPinsAPI::UnHookWindow));

        registerMethod("testEvent", make_method(this, &VideoPinsAPI::testEvent));
        
        // Read-write property
        registerProperty("testString",
                         make_property(this,
                                       &VideoPinsAPI::get_testString,
                                       &VideoPinsAPI::set_testString));
        
        // Read-only property
        registerProperty("version",
                         make_property(this,
                                       &VideoPinsAPI::get_version));
    }

    ///////////////////////////////////////////////////////////////////////////////
    /// @fn VideoPinsAPI::~VideoPinsAPI()
    ///
    /// @brief  Destructor.  Remember that this object will not be released until
    ///         the browser is done with it; this will almost definitely be after
    ///         the plugin is released.
    ///////////////////////////////////////////////////////////////////////////////
    virtual ~VideoPinsAPI() {};

    VideoPinsPtr getPlugin();

    // Read/Write property ${PROPERTY.ident}
    std::string get_testString();
    void set_testString(const std::string& val);

    // Read-only property ${PROPERTY.ident}
    std::string get_version();

    // Method echo
    FB::variant echo(const FB::variant& msg);

	// Method HookWindow
	int vFindWindow(const std::wstring class_name, const std::wstring title_name);
	int HookWindow(const int t_hWnd, const int x, const int y, const int width, const int height);
	int ReHookWindow(const int t_hWnd);
	int UnHookWindow(const int t_hWnd);
    
    // Event helpers
    FB_JSAPI_EVENT(test, 0, ());
    FB_JSAPI_EVENT(echo, 2, (const FB::variant&, const int));

    // Method test-event
    void testEvent();

private:
    VideoPinsWeakPtr m_plugin;
    FB::BrowserHostPtr m_host;

    std::string m_testString;
};

#endif // H_VideoPinsAPI

