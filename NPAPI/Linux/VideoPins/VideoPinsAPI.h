/**********************************************************\

  Auto-generated VideoPinsAPI.h

\**********************************************************/

#include <string>
#include <sstream>
#include <boost/weak_ptr.hpp>
#include "JSAPIAuto.h"
#include "BrowserHost.h"
#include "VideoPins.h"

#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <locale.h>
#include <X11/Xlib.h>
#include <X11/Xatom.h>
#include <glib.h>

#define NIL (0)       // A name for the void pointer

#define _NET_WM_STATE_REMOVE        0    /* remove/unset property */
#define _NET_WM_STATE_ADD           1    /* add/set property */
#define _NET_WM_STATE_TOGGLE        2    /* toggle property  */

#define MAX_PROPERTY_VALUE_LEN 4096
#define p_verbose(...) if (options.verbose) { \
    fprintf(stderr, __VA_ARGS__); \
}

static struct {
    int verbose;
    int force_utf8;
    int show_class;
    int show_pid;
    int show_geometry;
    int match_by_id;
    int match_by_cls;
    int full_window_title_match;
    int wa_desktop_titles_invalid_utf8;
    char *param_window;
    char *param;
} options;

static gboolean envir_utf8;


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
        registerMethod("HookWindow", make_method(this, &VideoPinsAPI::HookWindow));
        registerMethod("ReHookWindow", make_method(this, &VideoPinsAPI::ReHookWindow));
        registerMethod("UnHookWindow", make_method(this, &VideoPinsAPI::UnHookWindow));
        registerMethod("Xtest", make_method(this, &VideoPinsAPI::Xtest));
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
    FB::variant HookWindow(const std::string classN, const std::string title, const int x, const int y, const int width, const int height);
    int ReHookWindow(const int windowId);
    int UnHookWindow(const int windowId);
    
    // Method Xtest
    FB::variant Xtest(const std::string classN, const std::string title);
    
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

static Window *get_client_list (Display *disp, unsigned long *size);
static Window action_window_str (Display *disp, gchar *class_name, gchar *title_name);
static gchar *get_window_class (Display *disp, Window win);
static gchar *get_window_title (Display *disp, Window win);
static gchar *get_property (Display *disp, Window win, Atom xa_prop_type, gchar *prop_name, unsigned long *size);
static int window_state (Display *disp, Window win, char *arg);
static int client_msg(Display *disp, Window win, char *msg, 
        unsigned long data0, unsigned long data1, 
        unsigned long data2, unsigned long data3,
        unsigned long data4);

#endif // H_VideoPinsAPI

